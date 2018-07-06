class MainMenuState extends State {
  constructor() {
    super();
    this.start_function = undefined;
  }
  on_enter() {
    this.main_container = new PIXI.Container();
    this.title_label = new PIXI.Text("Flappy Bot", {
      fontFamily: "Times New Roman",
      fontSize: 50
    });
    this.title_label.x = APPWIDTH * 0.5;
    this.title_label.y = APPHEIGHT * 0.1;
    this.title_label.anchor.set(0.5);

    this.main_container.addChild(this.title_label);

    this.start_button = new MenuButton(
      APPWIDTH * 0.5,
      APPHEIGHT * 0.25,
      APPWIDTH * 0.6,
      APPWIDTH * 0.15,
      "Start"
    );
    this.main_container.addChild(this.start_button);
    if (this.start_function != undefined) {
        this.start_button.pointerdown = this.start_function;
    }
    app.stage.addChild(this.main_container);

    this.description = new PIXI.Text("", {
      fontFamily: "Times New Roman",
      fontSize: 16,
      align: 'left'
    })
    this.description.x = APPWIDTH * .5;
    this.description.y = APPHEIGHT * .56;
    this.description.anchor.set(.5);
    this.description.text = "Description:\nThis is a simulation that simulates evolution by using neural networks\n" +
      "and genetic algorithms to play the game Flappy Bird.\n\n" +
      "Each generation, a population of birds try to survive. Their actions are determined by their\n " +
      "brain which is simulated using a randomly generated neural network. At the end of a\n" +
      "generation (when they all die), the birds each mate with each other. Mating is\n" +
      "simulated by randomly selecting weights in each neural network.\n\n" + 
      "Like real evolution, the higher performing birds have a higher chance of mating.\n" +
      "Performance or fitness is measured by how far they travel, their score, and how close they are\n" +
      "to the next wall.\n\n" +
      "There is a low chance for each bird to mutate, their input/output weights are slightly added\n" +
      "or subtracted.\n\n" +
      "In the later generations, most birds will be high performing because their neural nets will be\n" +
      "optimized.";

    this.main_container.addChild(this.description);

    this.instructions = new PIXI.Text("", {
      fontFamily: "Times New Roman",
      fontSize: 16,
      align: 'left'
    });
    this.instructions.x = APPWIDTH * .5;
    this.instructions.y = APPHEIGHT * .85;
    this.instructions.anchor.set(.5);
    this.instructions.text = "Instructions:\nP / ESC to pause\n" +
      "R to soft reset (kill birds, but keep brains)" + 
      "\nM to mute audio";
    this.main_container.addChild(this.instructions);
  }
  on_exit() {
      app.stage.removeChild(this.main_container);
  }
  set_start_function(fn) {
    this.start_function = fn;
    if (this.start_button != undefined) {
        this.start_button.pointerdown = this.start_function;
    }
  }
  update() {}
}
