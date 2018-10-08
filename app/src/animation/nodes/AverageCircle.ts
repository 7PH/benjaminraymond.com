import {DisplayObject} from "../engine/DisplayObject";
import AudioHandler from "../../audio/AudioHandler";
import {Stage} from "../engine/Stage";
import BlurFilter = PIXI.filters.BlurFilter;
import {DEBUG} from "../../main";

export class AverageCircle extends DisplayObject {

    public lineWidth: number = 1;

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

        // draw waveform
        const wave: Float32Array = AudioHandler.waveform;
        const maxAmplitude: number = 100; // in pixels
        let points: {x: number, y: number}[] = [];
        for (let i: number = 0, angle: number = Math.PI / 2; i < wave.length; ++ i, angle += Math.PI / wave.length) {
            const amplitude: number = Math.max(0, wave[i] - AudioHandler.average);
            const x: number = Math.cos(angle) * (this.radius + maxAmplitude * amplitude);
            const y: number = Math.sin(angle) * (this.radius + maxAmplitude * amplitude);
            points.push({x, y});
        }
        let n: number = points.length;
        for (let i: number = n - 1; i >= 0; -- i)
            points.push({x: - points[i].x, y: points[i].y})
        this.graphics.beginFill(0xFFFFFF, 0.2);
        this.graphics.lineStyle(this.lineWidth, 0xFFFFFF);
        this.graphics.moveTo(points[0].x, points[0].y);
        for (let i: number = 0; i < points.length; ++ i) {
            const point = points[i];
            this.graphics.lineTo(point.x, point.y);
        }

        // disk
        this.graphics.beginFill(0x111111, 1);
        this.graphics.lineStyle(this.lineWidth, 0xFFFFFF);
        this.graphics.drawCircle(0, 0, this.radius);
        this.graphics.endFill();

        // circle
        this.graphics.lineStyle(this.lineWidth, 0xFFFFFF);
        this.graphics.drawCircle(0, 0, this.radius);

        // eyes
        let eyesSize: number = this.radius * 0.1;
        let eyesY: number = -this.radius * 0.3;
        this.graphics.lineStyle(1, 0xFFFFFF);
        this.graphics.beginFill(0xFFFFFF, 1);
        this.graphics.drawRect(- eyesSize, eyesY, eyesSize, eyesSize);
        this.graphics.drawRect(this.radius * 0.3, eyesY, eyesSize, eyesSize);
    }

    update(delta: number) {
        super.update(delta);

        this.lineWidth = 1 + AudioHandler.linearAverage * 8;
        this.filter.blur = 1 + 10 * Math.exp(- 6 * AudioHandler.linearAverage);
        this.radius = this.baseRadius + 100 * AudioHandler.linearAverage;

        this.redraw();
    }
}