class BirdInfoTable extends PIXI.Container {
  constructor(width, height, set_colors) {
    super();
    this.max_width = width;
    this.max_height = height;
    this.set_colors = set_colors;
    this.row_header = [];
    this.col_header = [];
    this.cells = [];
    this.cell_width = 70;
    this.cell_height = 50;
    this.rows = INFOMAXGEN;
    this.cols = BIRDCOUNT;
    this.low_gen = 1;
    this.init_row_header();
    this.init_col_header();
    this.init_cells();
  }

  init_row_header() {
    let cell_width = this.cell_width;
    let cell_height = this.cell_height;
    for (let i = 0; i < this.rows; ++i) {
      let cell = new PIXI.Container();
      cell.x = 0;
      cell.y = (i + 1) * cell_height;
      let text_value = i + 1;
      let gen_text_font = {
        fontFamily: "Times New Roman",
        fontSize: 20,
        align: "right"
      };
      let text_obj = new PIXI.Text(text_value, gen_text_font);
      text_obj.x = cell_width / 2;
      text_obj.y = 0;
      cell.addChild(text_obj);
      this.row_header.push(cell);
      this.addChild(cell);
    }
  }

  init_col_header() {
    let cell_width = this.cell_width;
    let cell_height = this.cell_height;
    for (let i = 0; i < this.cols; ++i) {
      let cell = new PIXI.Container();
      cell.x = (i + 1) * cell_width;
      cell.y = 0;
      // preview bird with rect
      let rect = new PIXI.Graphics();
      let bird_color = hash_to_hex(this.set_colors[i]);
      rect.beginFill(bird_color);
      rect.drawRect(0, 0, BIRDWIDTH, BIRDHEIGHT);
      rect.x = cell_width / 4;
      rect.y = cell_height / 4;
      cell.addChild(rect);
      this.col_header.push(cell);
      this.addChild(cell);
    }
  }

  init_cells() {
    let cell_width = this.cell_width;
    let cell_height = this.cell_height;
    for (let i = 0; i < this.rows; ++i) {
      this.cells[i] = [];
      for (let j = 0; j < this.cols; ++j) {
        let cell = new PIXI.Container();
        cell.y = (i + 1) * cell_height;
        cell.x = (j + 1) * cell_width;
        let cell_text_font = {
          fontFamily: "serif",
          fontSize: 10,
          align: "left"
        };
        let text = new PIXI.Text("blank", cell_text_font);
        text.alpha = 0;
        cell.addChild(text);
        this.cells[i][j] = cell;
        this.addChild(cell);
      }
    }
  }

  move_rows() {
    // move row headers
    for (let i = 0; i < this.rows; ++i) {
        ++this.row_header[i].children[0].text;
    }

    // move cells
    let prev = null;
    let curr = null;
    for (let i = 0; i < this.rows; ++i) {
      if (i == 0) {
        prev = this.cells[i];
        continue;
      }
      curr = this.cells[i];
      for (let j = 0; j < this.cols; ++j) {
        let curr_cell = curr[j].children[0];
        let prev_cell = prev[j].children[0];
        prev_cell.text = curr_cell.text;
      }

      prev = this.cells[i];
    }
  }

  update_gen(gen, data) {
    if (gen - 1 < this.rows) {
      this.update_row(gen - 1, data);
    } else {
      if (gen + 1 - this.rows > this.low_gen) {
          this.move_rows();
          ++this.low_gen;
      }
      this.update_row(this.rows - 1, data);
    }
  }

  update_row(row, info) {
    if (info.length != this.cols) {
      console.error(
        "Cannot update rows, nonmatching data length: " + info.length
      );
    }
    for (let i = 0; i < this.cols; ++i) {
      let cell = this.cells[row][i];
      let text = cell.children[0];
      text.alpha = 1;
      let formatted_fitness = parseFloat(info[i].fitness).toFixed(2);
      text.text =
        "Fitness: " + formatted_fitness + "\n" + "Score: " + info[i].score;
    }
  }
}
