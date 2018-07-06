class MultiPart extends PIXI.Container {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.parts = [];
    }

    collidesWithRect(x, y, width, height) {
        let collided = false;
        let x2 = x + width;
        let y2 = y + height;
        this.parts.forEach(part => {
            let px1 = part.x + this.x;
            let px2 = px1 + part.width;
            let py1 = part.y + this.y;
            let py2 = py1 + part.height;
            if (rectInRect(x, x2, y, y2, px1, px2, py1, py2)) {
                collided = true;
            }
        });
        return collided;
    }

    collidesWithObj(obj) {
        return this.collidesWithRect(obj.x, obj.y, obj.width, obj.height);
    }
}