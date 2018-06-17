class WallManager {
    constructor(stage) {
        this.walls = [];
        this.stage = stage;
    }

    add_wall(x, gy) {
        let new_wall = new Wall(x, gy);
        this.walls.push(new_wall);
        this.stage.addChild(new_wall);
    }

    get_wall(index) {
        return this.walls[index];
    }

    remove_wall(index) {
        if (index < 0) {
            console.error("Cannot remove wall with index: " + index);
            return;
        }
        this.stage.removeChild(this.walls[index]);
        this.walls.splice(index, 1);
    }

    remove_wall_by_wall(wall) {
        let index = this.index_of_wall_by_xpos(wall.x);
        this.remove_wall(index);
    }

    index_of_wall_by_xpos(xpos) {
        let res = -1;
        this.walls.forEach((wall, index) => {
            if (wall.x == xpos) res = index;;
        });
        if (res == -1) console.error("There exists no wall with xpos: " + xpos);
        return res;
    }

    size() { return this.walls.length; }

    clear() {
        console.log(this.size());
        for (let i = 0; i < this.walls.length; ++i) {
            this.remove_wall(i);
            --i;
        }
    }
}