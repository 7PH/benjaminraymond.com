import {DisplayObject} from "../engine/DisplayObject";
import {Point} from "../engine/Point";


export class Node extends DisplayObject {

    public color: number;

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
        this.graphics.drawCircle(0, 0, 2);
        this.graphics.endFill();
    }

    update(delta) {
        super.update(delta);

        if (this.x < 0) this.x = this.stage.getWidth();
        else if (this.x > this.stage.getWidth()) this.x = 0;

        if (this.y < 0) this.y = this.stage.getHeight();
        else if (this.y > this.stage.getHeight()) this.y = 0;

        const target = new PIXI.Point(
            this.stage.getWidth() * 0.5,
            this.stage.getHeight() * 0.5
        );
        const dist = Point.distance(this.position, target);
        const a = Math.atan2(
            target.y - this.position.y,
            target.x - this.position.x
        );
        let fx = 0, fy = 0;
        if (dist != 0) {
            fx = 20000 * Math.cos(a) / dist;
            fy = 20000 * Math.sin(a) / dist;
        }
        this.setForce('mouse_attraction', new PIXI.Point(fx, fy));

        this.redraw();
    }
}