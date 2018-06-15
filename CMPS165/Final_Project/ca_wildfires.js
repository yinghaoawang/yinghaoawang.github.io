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
const FIRE_SCALES = ["Selected Type", "Total"];
const COUNTY_KEY = "COUNTY";
const CONTRACT_COLOR = d3.rgb(210, 210, 210);

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

  scale_select = new GeomapSelect(fire_geomap, FIRE_SCALES, "scale", "Scale By")
  type_select = new GeomapSelect(fire_geomap, FIRE_TYPES, "type", "Fire Type");

  scale_select.set_pos(705, -870);
  type_select.set_pos(470, -815);

  

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
  acres_btn.set_attr("class", "button red");

  dollars_btn = new GeomapButton(
    fire_geomap,
    "Dollars",
    "category",
    "Dollar Damage"
  );

  dollars_btn.set_attr("class", "button green");
  year_slider = new GeomapSlider(fire_geomap, FIRE_YEARS, "year");
}
