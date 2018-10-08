import {DisplayObject} from "../engine/DisplayObject";
import AudioHandler from "../../audio/AudioHandler";
import {Stage} from "../engine/Stage";
import BlurFilter = PIXI.filters.BlurFilter;
import {DEBUG} from "../../main";

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

        const wave: Float32Array = AudioHandler.waveform;
        const pixelsPerUnit: number = 40;
        let points: {x: number, y: number}[] = [];
        for (let i: number = 0, angle: number = Math.PI / 2; i < wave.length; ++ i, angle += Math.PI / wave.length) {
            const x: number = Math.cos(angle) * (this.radius + pixelsPerUnit * wave[i]);
            const y: number = Math.sin(angle) * (this.radius + pixelsPerUnit * wave[i]);
            points.push({x, y});
        }
        let n: number = points.length;
        for (let i: number = n - 1; i >= 0; -- i)
            points.push({x: - points[i].x, y: points[i].y})

        this.graphics.lineStyle(this.lineWidth, 0xFFFFFF);
        this.graphics.moveTo(points[0].x, points[0].y);
        for (let i: number = 0; i < points.length; ++ i) {
            const point = points[i];
            this.graphics.lineTo(point.x, point.y);
        }
        this.graphics.closePath();

        // disk
        this.graphics.beginFill(0x111111, 1);
        this.graphics.drawCircle(0, 0, this.radius);
        this.graphics.endFill();
        // circle
        this.graphics.lineStyle(this.lineWidth, 0xFFFFFF);
        this.graphics.drawCircle(0, 0, this.radius);
    }

    update(delta: number) {
        super.update(delta);

        if (AudioHandler.average > this.flattenedAverage)
            this.flattenedAverage += 1.00 * delta;
        else
            this.flattenedAverage -= 1.00 * delta;

        this.lineWidth = 1 + this.flattenedAverage * 8;
        this.filter.blur = 1 + 10 * Math.exp(- 6 * this.flattenedAverage);
        this.radius = this.baseRadius + 100 * this.flattenedAverage;

        this.redraw();
    }
}