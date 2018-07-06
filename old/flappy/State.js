class State {
    constructor() {
        if (this.constructor === State) {
            throw new TypeError('Abstract class cannot be instantiated directly.'); 
        }
    }
    on_enter() {
        throw new TypeError('Class missing method from extended abstract class.');
    }
    on_exit() {
        throw new TypeError('Class missing method from extended abstract class.');
    }
    update() {
        throw new TypeError('Class missing method from extended abstract class.');
    }
}