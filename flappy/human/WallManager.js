class WallManager extends ObjectManager {
    constructor(stage) {
        super(stage);
    }

    add(x, gy) {
        let new_wall = new Wall(x, gy);
        super.add(new_wall);
    }
    remove_wall_by_wall(wall) {
        let index = this.index_of_wall_by_xpos(wall.x);
        this.remove(index);
    }

    index_of_wall_by_xpos(xpos) {
        let res = -1;
        for (let i = 0; i < this.size(); ++i) {
            let wall = this.objects[i];
            if (wall.x === xpos) res = index;
        }
        if (res == -1) console.error("There exists no wall with xpos: " + xpos);
        return res;
    }
}