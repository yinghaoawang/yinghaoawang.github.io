class GeomapButton extends GeomapInput {
  constructor(geomap, button_value, selected_key_name, button_text) {
    super(geomap, selected_key_name);
    this.button_value = button_value;
    if (button_text === undefined) this.button_text = this.button_value;
    else this.button_text = button_text;
    this.input = this.create_input();
  }
  create_input() {
    let button = d3
      .select(".container-btn")
      .append("input")
      .attr("type", "button")
      .attr("class", "button");

    button.property("value", this.button_text);

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
