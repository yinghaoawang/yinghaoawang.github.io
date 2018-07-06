// Abstract class
class GeomapInput {
  constructor(geomap, selected_key_name, container_name) {
    this.geomap = geomap;
    this.selected_key_name = selected_key_name;
    this.container_name = container_name;

    if (this.constructor === GeomapInput) {
      throw new TypeError(
        'Abstract class "Widget" cannot be instantiated directly.'
      );
    }

    if (this.create_input === undefined || this.get_input === undefined) {
      throw new TypeError("Classes extending the widget abstract class");
    }
  }
  set_pos(left, top) {
    this.input
      .style("left", left + "px")
      .style("top", top + "px");
  }
  set_attr(attr, value) {
    this.input.attr(attr, value);
  }
}
