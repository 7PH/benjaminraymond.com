import {DisplayObject} from "../engine/DisplayObject";
import AudioHandler from "../../audio/AudioHandler";
import {Stage} from "../engine/Stage";
import BlurFilter = PIXI.filters.BlurFilter;

export class AverageCircle extends DisplayObject {

    public lineWidth: number = 1;

    public flattenedAverage: number = 0;

    public baseRadius: number;

    public radius: number;

    public readonly filter: BlurFilter;

    constructor(stage: Stage) {
        super(stage);

        this.baseRadius = Math.min(stage.getWidth(), stage.getHeight()) / 12;
        this.radius = this.baseRadius;

        this.filter = new PIXI.filters.BlurFilter();
        this.filters = [this.filter];
    }

    redraw() {

        if (typeof this.graphics === 'undefined')
            return;

        this.graphics.clear();
        // disk
        this.graphics.beginFill(0xFFFFFF, 0.1);
        this.graphics.drawCircle(0, 0, this.radius);
        this.graphics.endFill();
        // circle
        this.graphics.lineStyle(this.lineWidth, 0xFFFFFF);
        this.graphics.drawCircle(0, 0, this.radius);
    }

    update(delta: number) {
        super.update(delta);

        if (AudioHandler.average > this.flattenedAverage)
            this.flattenedAverage = AudioHandler.average;
        else
            this.flattenedAverage -= 1.00 * delta;

        this.lineWidth = 1 + this.flattenedAverage * 8;
        this.filter.blur = 1 + 10 * Math.exp(- 6 * this.flattenedAverage);
        this.radius = this.baseRadius + 100 * this.flattenedAverage;

        this.redraw();
    }
}