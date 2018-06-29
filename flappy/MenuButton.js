class MenuButton extends PIXI.Graphics {
    constructor(x, y, width, height, text) {
        super();
        this.beginFill(0x000000);
        this.drawRect(0, 0, width, height);
        this.x = x;
        this.y = y ;
        this.pivot.x = width / 2;
        this.pivot.y = height / 2;
        let text_object = new PIXI.Text(text, {
            fontSize: 38
        });
        text_object.x = this.width / 2;
        text_object.y = this.height / 2;
        text_object.style.fill = 0xffffff;
        text_object.anchor.set(.5);
        this.addChild(text_object);
        this.interactive = true;
        this.buttonMode = true;
        this.mouseover = () => {
            this.alpha = .8;
        };
        this.mouseout =  () => {
            this.alpha = 1;
        };
    }
}