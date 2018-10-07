import {DisplayObject} from "../engine/DisplayObject";
import AudioHandler from "../../audio/AudioHandler";
import {Stage} from "../engine/Stage";
import BlurFilter = PIXI.filters.BlurFilter;


export class Node extends DisplayObject {

    public color: number;

    public radius: number = 2 + Math.random() * 4;

    public readonly filter: BlurFilter;

    constructor (stage: Stage) {
        super(stage);

        this.filter = new PIXI.filters.BlurFilter();
        this.filters = [this.filter];

        this.color = 0xFFFFFF * (Math.random()*.5 + .5);
        this.setFriction(1);
    }

    redraw() {

        if (typeof this.graphics === 'undefined')
            return;

        // chose color
        let avg: number = Math.min(8, 64 * AudioHandler.average) / 8;
        let value: number = avg * 0xFF | 0;
        let grayscale: number = parseInt('0x' + ((value << 16) | (value << 8) | value).toString(16), 16);

        this.filter.blur = 0.5 + 10 * Math.exp(- 13 * AudioHandler.average);

        this.graphics.clear();
        this.graphics.beginFill(AudioHandler.average > 0.13 ? this.color : grayscale);
        this.graphics.drawCircle(0, 0, this.radius);
        this.graphics.endFill();
    }

    update(delta: number) {
        super.update(delta);

        // get coef according to the current music amplitude
        const coef: number = Math.max(0.1, AudioHandler.average * 13);
        this.position.x += delta * this.velocity.x * (coef - 1);
        this.position.y += delta * this.velocity.y * (coef - 1);

        if (this.x < 0) this.x = this.stage.getWidth();
        else if (this.x > this.stage.getWidth()) this.x = 0;

        if (this.y < 0) this.y = this.stage.getHeight();
        else if (this.y > this.stage.getHeight()) this.y = 0;

        this.redraw();
    }
}