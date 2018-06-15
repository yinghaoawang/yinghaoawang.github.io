class GeomapSlider extends GeomapInput {
  constructor(geomap, list_data, selected_key_name) {
    super(geomap, selected_key_name);
    this.list_data = list_data;
    this.input = this.create_input();
  }
  create_input() {
    // Create select dropdown
    let max = d3.max(this.list_data);
    let min = d3.min(this.list_data);
    let avg_step = (max - min + 1) / this.list_data.length;
    let slider = d3
      .sliderHorizontal()
      .step(avg_step)
      .tickFormat(d3.format(""))
      .width(800)
      .tickValues(this.list_data)
      .min(min)
      .max(max)
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
