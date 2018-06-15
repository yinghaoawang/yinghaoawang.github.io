class GeomapSelect extends GeomapInput {
  constructor(geomap, list_data, selected_key_name, label_text) {
    super(geomap, selected_key_name);
    this.list_data = list_data;
    this.label_text = label_text;
    this.input = this.create_input();
  }

  create_input() {
    // Create select dropdown
    let select_lb = d3
      .select(".container-select")
      .append("label")
      .attr("class", "dropdown")
      .text(this.label_text + ": ")
      .style("font-weight", "bold")
      .style("float", "left");

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
