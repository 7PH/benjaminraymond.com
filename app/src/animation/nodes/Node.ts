import {DisplayObject} from "../engine/DisplayObject";


export class Node extends DisplayObject {

    public color: number;

    public radius: number = 2 + Math.random() * 4;

    constructor (stage) {
        super(stage);

        this.color = 0xFFFFFF * (Math.random()*.5 + .5);
        this.setFriction(1);
    }

    redraw() {
        if (typeof this.graphics === 'undefined')
            return;
        this.graphics.clear();
        this.graphics.beginFill(this.color);
        this.graphics.drawCircle(0, 0, this.radius);
        this.graphics.endFill();
    }

    update(delta) {
        super.update(delta);

        if (this.x < 0) this.x = this.stage.getWidth();
        else if (this.x > this.stage.getWidth()) this.x = 0;

        if (this.y < 0) this.y = this.stage.getHeight();
        else if (this.y > this.stage.getHeight()) this.y = 0;

        this.redraw();
    }
}