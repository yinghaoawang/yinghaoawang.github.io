class FireGeomap {
  constructor(svg, geo_data, fire_data) {
    this.svg = svg;

    this.tooltip = d3
      .select("body")
      .append("div")
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
    // HARDCODE
    this.selected_type = "Total";
    this.selected_category = "Count";
    this.selected_year = "2008";
    this.selected_scale = "Selected Type";

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
    if (this.selected_scale == "Total")
      this.scale_max = this.get_max_data("Total");
    else this.scale_max = this.get_max_data();

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
        this.color_scale.range().map(d => {
          d = this.color_scale.invertExtent(d);
          if (d[0] == null) d[0] = this.legend_x.domain()[0];
          if (d[1] == null) d[1] = this.legend_x.domain()[1];
          return d;
        })
      )
      .enter()
      .append("rect")
      .attr("height", 8)
      .attr("x", d => {
        return this.legend_x(d[0]);
      })
      .attr("width", d => {
        return this.legend_x(d[1]) - this.legend_x(d[0]);
      })
      .attr("fill", d => {
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
    if (name === "scale") return this.selected_scale;
    console.error("Cannot get unrecognized selected key name: " + name);
    return undefined;
  }

  set_selected_by_name(name, value) {
    if (name === "type") this.selected_type = value;
    else if (name === "category") this.selected_category = value;
    else if (name === "year") this.selected_year = value;
    else if (name === "scale") this.selected_scale = value;
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
            let value = +parseFloat(d[key_name]);
            if (isNaN(value))
              //console.log("NAN: " + county_name);
              value = -1;
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
      .on("mouseover", d => {
        this.tooltip
          .transition()
          .duration(200)
          .style("opacity", 0.9);

        if (
          this.fire_map[d.county] === undefined ||
          (this.fire_map[d.county][this.selected_category] === undefined ||
            this.fire_map[d.county][this.selected_category][
              this.selected_year
            ] === undefined ||
            this.fire_map[d.county][this.selected_category][this.selected_year][
              this.selected_type
            ] < 0)
        ) {
          this.tooltip
            .html(
              `
              <b>${d.county} County</b><br/>
              N/A Total Fires<br/>
              N/A Acres Burned<br/>
              N/A Damages in Dollars<br/>
              `
            )
            .style("left", d3.event.pageX + "px")
            .style("top", d3.event.pageY - 28 + "px");
        } else
          this.tooltip
            .html(
              `
            <b>${d.county} County</b><br/>
            ${
              this.fire_map[d.county]["Count"][this.selected_year][
                this.selected_type
              ]
            } Total Fires<br/>
            ${
              this.fire_map[d.county]["Acres"][this.selected_year][
                this.selected_type
              ]
            } Acres Burned<br/>
            ${
              this.fire_map[d.county]["Dollars"][this.selected_year][
                this.selected_type
              ]
            } Damages in Dollars<br/>
            `
            )
            .style("left", d3.event.pageX + "px")
            .style("top", d3.event.pageY - 28 + "px");
      })
      .on("mouseout", d => {
        this.tooltip
          .transition()
          .duration(500)
          .style("opacity", 0);
      })
      .append("title");

    this.update_geomap();
  }

  get_selected_data(county, type, year) {
    let chosen_type = this.selected_type;
    let chosen_year = this.selected_year;
    if (FIRE_TYPES.includes(type)) chosen_type = type;
    if (FIRE_YEARS.includes(year)) chosen_year = year;

    if (this.fire_map[county] === undefined) {
      // console.error("County does not exist in fire map: " + county);
      return -1;
    }
    if (this.fire_map[county][this.selected_category] === undefined) {
      /*
        console.error(
          "Category does not exist for " +
            county +
            " county : " +
            this.selected_category
        );
        */
      return -1;
    }
    if (
      this.fire_map[county][this.selected_category][chosen_year] === undefined
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
    return this.fire_map[county][this.selected_category][chosen_year][
      chosen_type
    ];
  }

  // LAZY & SLOW
  get_max_data(category, year) {
    let counties = [];
    let arr = this.data.features;
    for (var i = 0; i < arr.length; ++i) {
      counties.push(arr[i].county);
    }
    let max = 0;
    for (var i = 0; i < counties.length; ++i) {
      let county = counties[i];
      let selected_data = +this.get_selected_data(county, category, year);

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