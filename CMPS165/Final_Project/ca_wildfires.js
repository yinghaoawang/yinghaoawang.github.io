const FIRE_TYPES = [
  "Arson",
  "Campfire",
  "Debris Burning",
  "Electrical Power",
  "Equipment Usage",
  "Lightning",
  "Misc.",
  "Play With Fire",
  "Railroad",
  "Smoking",
  "Undetermined",
  "Vehicle",
  "Total" // not sure if to keep this or to calculate on own
];
const FIRE_CATEGORIES = [
  "Count", // number of fires
  "Acres", // acres burned
  "Dollars" // damage in dollars
];
const FIRE_YEARS = [
  "2008",
  "2009",
  "2010",
  "2011",
  "2012",
  "2013",
  "2014",
  "2015",
  "2016"
];
const COUNTY_KEY = "COUNTY";
const CONTRACT_COLOR = d3.rgb(210, 210, 210);
const ZERO_COLOR = d3.rgb(190, 190, 190);

class FireGeomap {
  constructor(svg, geo_data, fire_data) {
    this.svg = svg;
    
    this.tooltip = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);


    // data file to be stored in this
    this.data = geo_data;

    // stores information about each county (map refers to the data structure, not visual)
    // sample usage: fire_map['Santa Cruz']['Arson']
    this.fire_map = d3.map();
    this.update_fire_map_year(fire_data);

    this.projection = d3.geoMercator();
    this.path = d3.geoPath(this.projection);

    // identifies current selected key (arson, etc.)
    this.selected_type = "Total";
    this.selected_category = "Count";
    this.selected_year = "2008";

    // color scale variables
    this.scale_max = 0;
    this.color_scale = d3.scaleThreshold();

    // init legend
    this.legend_x = d3.scaleLinear().rangeRound([500, 950]);
    this.legend_g = svg
      .append("g")
      .attr("class", "legend")
      .attr("transform", "translate(0, 40)");

    this.legend_g
      .append("text")
      .attr("class", "caption")
      .attr("x", this.legend_x.range()[0])
      .attr("y", -6)
      .attr("fill", "#000")
      .attr("text-anchor", "start")
      .attr("font-weight", "bold");

    this.init_geomap();
  }

  update_color_scale() {
    this.scale_max = this.get_max_data();
    this.color_scale.domain(schemize_nums(this.scale_max, 5));

    if (this.scale_max == 0) this.color_scale.domain([0, 1]);

    let rng = undefined;
    if (this.selected_category === "Count") rng = d3.schemeOrRd[6];
    else if (this.selected_category === "Acres") rng = d3.schemeReds[6];
    else if (this.selected_category === "Dollars") rng = d3.schemeGreens[6];

    this.color_scale.range(rng);
    
    if (this.scale_max == 0) this.legend_x.domain([0, 1]);
    else this.legend_x.domain([0, this.scale_max]);

    this.legend_g.selectAll("rect").remove();
    this.legend_g
      .selectAll("rect")
      .data(
        this.color_scale.range().map((d) => {
          d = this.color_scale.invertExtent(d);
          if (d[0] == null) d[0] = this.legend_x.domain()[0];
          if (d[1] == null) d[1] = this.legend_x.domain()[1];
          return d;
        })
      )
      .enter()
      .append("rect")
      .attr("height", 8)
      .attr("x", (d) => {
        return this.legend_x(d[0]);
      })
      .attr("width", (d) => {
        return this.legend_x(d[1]) - this.legend_x(d[0]);
      })
      .attr("fill", (d) => {
        return this.color_scale(d[0]);
      });

    this.legend_g.select("g").remove();
    this.legend_g.append("g").call(
      d3
        .axisBottom(this.legend_x)
        .tickSize(13)
        .tickValues(this.color_scale.domain())
    );

    let text = "";
    if (this.selected_category === "Count") text = "Number of Fires";
    if (this.selected_category === "Acres") text = "Acres Burned";
    if (this.selected_category === "Dollars")
      text = "Damage in Dollars (thousands)";

    this.legend_g.select("text").text(text);
  }

  get_selected_by_name(name) {
    if (name === "type") return this.selected_type;
    if (name === "category") return this.selected_category;
    if (name === "year") return this.selected_year;
    console.error("Cannot get unrecognized selected key name: " + name);
    return undefined;
  }

  set_selected_by_name(name, value) {
    if (name === "type") this.selected_type = value;
    else if (name === "category") this.selected_category = value;
    else if (name === "year") this.selected_year = value;
    else console.error("Cannot set unrecognized selected key name: " + name);
  }

  // updates fire map
  update_fire_map_year(fire_data) {
    Object.keys(fire_data).forEach(year => {
      this.update_fire_map(fire_data[year], year);
    });
  }

  // updates fire map that includes fire_data with year
  update_fire_map(fire_data, year) {
    fire_data.forEach(d => {
      if (d[COUNTY_KEY] === undefined) {
        console.error("Invalid county key: " + COUNTY_KEY);
        return;
      }

      // create county index if it doesnt exist
      // SLOPPY
      let county_name = d[COUNTY_KEY];
      if (this.fire_map[county_name] === undefined) {
        this.fire_map[county_name] = {};
        FIRE_CATEGORIES.forEach(category => {
          this.fire_map[county_name][category] = {};
        });
      }
      FIRE_CATEGORIES.forEach(category => {
        this.fire_map[county_name][category][year] = {};
      });

      // set values for each fire type for the current county
      FIRE_TYPES.forEach(key => {
        FIRE_CATEGORIES.forEach(category => {
          let key_name = key + " " + category;
          if (d[key_name] === undefined) {
            console.error(year + " Invalid fire type key: " + key_name);
            // -1 refers to missing data
            this.fire_map[county_name][category][year][key] = -1;
          } else {
            let value =+parseFloat(d[key_name]);
            this.fire_map[county_name][category][year][key] = value;
          }
        });
      });
    });
  }

  // creates the geomap skeleton
  init_geomap() {
    this.projection.fitExtent([[20, 20], [width, height]], this.data);

    // sets county variable for each piece of data
    this.data.features.forEach(d => {
      d.county = d.properties.NAME_2;
    });

    // creates barebones geomap
    this.svg
      .append("g")
      .attr("class", "counties")
      .selectAll("path")

      .data(this.data.features)
      .enter()
      .append("path")
      .attr("d", this.path)
      .attr("stroke", "#000")
      .attr("stroke-opacity", 0.3)
      .on("mouseover", (d) => {
        this.tooltip
          .transition()
          .duration(200)
          .style("opacity", 0.9);

          if (this.fire_map[d.county] === undefined || (this.fire_map[d.county][this.selected_category] === undefined || this.fire_map[d.county][this.selected_category][this.selected_year] === undefined || this.fire_map[d.county][this.selected_category][this.selected_year][this.selected_type] < 0)) {
            this.tooltip
            .html(`
            <b>${d.county} County</b><br/>
            N/A Total Fires<br/>
            N/A Acres Burned<br/>
            N/A Damages in Dollars<br/>
            `)
            .style("left", d3.event.pageX + "px")
            .style("top", d3.event.pageY - 28 + "px");
          } else
        this.tooltip
          .html(`
          <b>${d.county} County</b><br/>
          ${this.fire_map[d.county]["Count"][this.selected_year][this.selected_type]} Total Fires<br/>
          ${this.fire_map[d.county]["Acres"][this.selected_year][this.selected_type]} Acres Burned<br/>
          ${this.fire_map[d.county]["Dollars"][this.selected_year][this.selected_type]} Damages in Dollars<br/>
          `)
          .style("left", d3.event.pageX + "px")
          .style("top", d3.event.pageY - 28 + "px");
      })
      .on("mouseout", (d) => {
        this.tooltip
          .transition()
          .duration(500)
          .style("opacity", 0);
      })
      .append("title");

    this.update_geomap();
  }

  get_selected_data(county) {
    if (this.fire_map[county] === undefined) {
      //console.error("County does not exist in fire map: " + county);
      return -1;
    }
    if (this.fire_map[county][this.selected_category] === undefined) {
      /*console.error(
        "Category does not exist for " +
          county +
          " county : " +
          this.selected_category
      );
      */
      return -1;
    }
    if (
      this.fire_map[county][this.selected_category][this.selected_year] ===
      undefined
    ) {
      /*
      console.error(
        "Year does not exist for " +
          county +
          " county " +
          this.selected_category +
          ": " +
          this.selected_year
      );
      */
      return -1;
    }
    return this.fire_map[county][this.selected_category][this.selected_year][
      this.selected_type
    ];
  }

  // LAZY & SLOW
  get_max_data() {
    let counties = [];
    let arr = this.data.features;
    for (var i = 0; i < arr.length; ++i) {
      counties.push(arr[i].county);
    }
    let max = 0;
    for (var i = 0; i < counties.length; ++i) {
      let county = counties[i];
      let selected_data = +this.get_selected_data(county);

      if (i == 0 || selected_data > max) {
        max = selected_data;
      }
    }
    return max;
  }

  // updates the geomap based on the current selected key(s)
  update_geomap() {
    this.update_color_scale();
    svg
      .select(".counties")
      .selectAll("path")
      .attr("fill", (d, id) => {
        if (this.fire_map[d.county] === undefined) {
          // SLOPPY LAZY
          d.contract_county = true;
          return CONTRACT_COLOR;
        } else {
          //SLOPPY LAZY
          d.contract_county = false;
          let val = this.get_selected_data(d.county);
          if (val < 0) return CONTRACT_COLOR;
          return this.color_scale(val);
        }
      })
      .select("title");
  }
}

// Abstract class
class GeomapInput {
  constructor(geomap, selected_key_name) {
    this.geomap = geomap;
    this.selected_key_name = selected_key_name;

    if (this.constructor === GeomapInput) {
      throw new TypeError(
        'Abstract class "Widget" cannot be instantiated directly.'
      );
    }

    if (this.create_input === undefined || this.get_input === undefined) {
      throw new TypeError("Classes extending the widget abstract class");
    }
  }
}

class GeomapSlider extends GeomapInput {
  constructor(geomap, list_data, selected_key_name) {
    super(geomap, selected_key_name);
    this.list_data = list_data;
    this.input = this.create_input();
  }
  create_input() {
    // Create select dropdown

    let slider = d3
      .sliderHorizontal()
      .step(1)
      .tickFormat(d3.format(""))
      .width(800)
      .min(d3.min(this.list_data))
      .max(d3.max(this.list_data))
      .default(this.geomap.get_selected_by_name(this.selected_key_name));

    let slider_g = d3
      .select(".container-slider")
      .append("div")
      .attr("class", "slider")
      .append("svg")
      .attr("width", 1000)
      .attr("height", 100)
      .append("g")
      .attr("transform", "translate(150,30)");

    slider_g.call(slider);

    // add listener for dropdown change
    slider.on("onchange", value => {
      this.geomap.set_selected_by_name(this.selected_key_name, value);
      this.geomap.update_geomap();
    });

    return slider_g;
  }

  get_input() {
    return this.input;
  }
}

class GeomapSelect extends GeomapInput {
  constructor(geomap, list_data, selected_key_name) {
    super(geomap, selected_key_name);
    this.list_data = list_data;
    this.input = this.create_input();
  }
  create_input() {
    // Create select dropdown
    let select_lb = d3
      .select(".select-holder")
      .append("label")
      .attr("class", "dropdown")
      .text("Fire Type: ")
      .style("font-weight", "bold")
      .style("left", "280px")
      .style("top", "-710px");

    let select_dd = select_lb.append("select");

    select_dd
      .selectAll("option")
      .data(this.list_data)
      .enter()
      .append("option")
      .text(d => {
        return d;
      });

    select_dd.property(
      "value",
      this.geomap.get_selected_by_name(this.selected_key_name)
    );

    // add listener for dropdown change
    select_dd.on("change", () => {
      let select_value = select_dd.property("value");
      this.geomap.set_selected_by_name(this.selected_key_name, select_value);
      this.geomap.update_geomap();
    });

    return select_lb;
  }

  get_input() {
    return this.input;
  }
}

class GeomapButton extends GeomapInput {
  constructor(geomap, button_value, selected_key_name, button_text) {
    super(geomap, selected_key_name);
    this.button_value = button_value;
    if (button_text === undefined) this.button_text = this.button_value;
    else this.button_text = button_text;
    this.input = this.create_input();
  }
  create_input() {
    // Create select dropdown
    let button = d3
      .select(".container-btn")
      .append("input")
      .attr("type", "button")
      .attr("class", "button");

    button.property("value", this.button_text);

    // add listener for dropdown change
    button.on("click", () => {
      let select_value = this.button_value;
      this.geomap.set_selected_by_name(this.selected_key_name, select_value);
      this.geomap.update_geomap();
    });

    return button;
  }

  get_input() {
    return this.input;
  }
}

let svg = d3.select("svg"),
  width = +svg.attr("width"),
  height = +svg.attr("height");

// load the data, runs ready when it's ready
d3.queue()
  .defer(d3.json, "ca2.json")
  // perhaps less hardcodey if i find a better alternative
  .defer(d3.csv, "2016_fires.csv")
  .defer(d3.csv, "2015_fires.csv")
  .defer(d3.csv, "2014_fires.csv")
  .defer(d3.csv, "2013_fires.csv")
  .defer(d3.csv, "2012_fires.csv")
  .defer(d3.csv, "2011_fires.csv")
  .defer(d3.csv, "2010_fires.csv")
  .defer(d3.csv, "2009_fires.csv")
  .defer(d3.csv, "2008_fires.csv")
  .await(ready);

// To be done after data is all loaded
function ready(
  error,
  geo_data,
  // see above
  fd16,
  fd15,
  fd14,
  fd13,
  fd12,
  fd11,
  fd10,
  fd9,
  fd8
) {
  if (error) throw error;
  let fire_data = {
    // see above
    "2008": fd8,
    "2009": fd9,
    "2010": fd10,
    "2011": fd11,
    "2012": fd12,
    "2013": fd13,
    "2014": fd14,
    "2015": fd15,
    "2016": fd16
  };

  fire_geomap = new FireGeomap(svg, geo_data, fire_data);
  type_select = new GeomapSelect(fire_geomap, FIRE_TYPES, "type");

  count_btn = new GeomapButton(
    fire_geomap,
    "Count",
    "category",
    "Number of Fires"
  );
  acres_btn = new GeomapButton(
    fire_geomap,
    "Acres",
    "category",
    "Acres Burned"
  );
  acres_btn.get_input().attr("class", "button red");

  dollars_btn = new GeomapButton(
    fire_geomap,
    "Dollars",
    "category",
    "Dollar Damage"
  );

  dollars_btn.get_input().attr("class", "button green");
  year_slider = new GeomapSlider(fire_geomap, FIRE_YEARS, "year");
}
