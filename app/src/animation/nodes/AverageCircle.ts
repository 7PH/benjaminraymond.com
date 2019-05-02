import {DisplayObject} from "../engine/DisplayObject";
import AudioHandler from "../../audio/AudioHandler";
import {Stage} from "../engine/Stage";
import BlurFilter = PIXI.filters.BlurFilter;

export class AverageCircle extends DisplayObject {

    /**
     * Circle line width in pixels
     */
    public lineWidth: number = 1;

    /**
     * Radius when no music is there in pixels
     */
    public baseRadius: number;

    /**
     * Current radius in pixels
     */
    public radius: number;

    /**
     * Whether the eyes are closed
     */
    public eyesClosed: boolean = false;

    /**
     * Position where the circle should be (there is an interpolation)
     */
    public targetPosition: PIXI.Point = new PIXI.Point(0, 0);

    /**
     * Timestamp of the last position update in ms
     */
    public lastUpdateRandomAngle: number = 0;

    /**
     * Random angle
     */
    public randomAngle: number = 0;

    /**
     * Circle filter
     */
    public readonly filter: BlurFilter;

    /**
     *
     * @param stage
     * @param centerX
     * @param centerY
     */
    constructor(stage: Stage, private centerX: number, private centerY: number) {
        super(stage);

        this.baseRadius = Math.min(stage.getWidth(), stage.getHeight()) / 12;
        this.radius = this.baseRadius;

        this.filter = new PIXI.filters.BlurFilter();
        this.filters = [this.filter];

        this.setFriction(1);

        this.position.x = centerX;
        this.position.y = centerY;
    }

    /**
     *
     * @param delta
     */
    public update(delta: number) {
        super.update(delta);

        this.eyesClosed = Math.floor(10 * Date.now() / 1000) % 30 === 0;
        this.lineWidth = 1 + AudioHandler.linearAverage * 8;
        this.filter.blur = 0.2 + 8 * Math.exp(- 16 * AudioHandler.linearAverage);
        this.radius = this.baseRadius + 100 * AudioHandler.linearAverage;

        this.setForce("main", {
            x: (this.targetPosition.x - this.position.x) * AudioHandler.firstOrderAverage * 16,
            y: (this.targetPosition.y - this.position.y) * AudioHandler.firstOrderAverage * 16,
        });

        // update shift from center
        if (Date.now() > 400 + this.lastUpdateRandomAngle) {
            this.randomAngle = Math.random() * 2 * Math.PI;
            this.lastUpdateRandomAngle = Date.now();
        }

        // get circle closer to target location
        this.updatePosition();

        // redraw
        this.redraw();
    }

    /**
     * Interpolate this circle to the target position and update its radius
     */
    private updatePosition() {

        const radius: number = this.baseRadius * (.5 + AudioHandler.firstOrderAverage * .5);
        const x: number = Math.cos(this.randomAngle) * radius;
        const y: number = Math.sin(this.randomAngle) * radius;

        const mousePos = this.stage.renderer.plugins.interaction.mouse.global;
        const mouseAngle: number = Math.atan2(
            mousePos.y - this.centerY,
            mousePos.x - this.centerX
        );
        const mouseVectorX = Math.cos(mouseAngle) * radius;
        const mouseVectorY = Math.sin(mouseAngle) * radius;

        this.targetPosition.x = this.centerX + x + mouseVectorX;
        this.targetPosition.y = this.centerY + y + mouseVectorY;
    }

    /**
     * Redraw the circle
     */
    private redraw() {

        if (typeof this.graphics === "undefined") {
            return;
        }

        this.graphics.clear();

        // draw waveform
        const wave: Float32Array = AudioHandler.firstOrderWaveform;
        const waveAverage: number = wave.reduce((acc, v) => acc + v, 0) / wave.length;
        const maxAmplitude: number = 100; // in pixels
        const points: Array<{x: number, y: number}> = [];
        for (let i: number = 0, angle: number = Math.PI / 2; i < wave.length; ++ i, angle += Math.PI / wave.length) {
            const amplitude: number = Math.max(0, wave[i] - waveAverage);
            const x: number = Math.cos(angle) * (this.radius + maxAmplitude * amplitude);
            const y: number = Math.sin(angle) * (this.radius + maxAmplitude * amplitude);
            points.push({x, y});
        }
        const n: number = points.length;
        for (let i: number = n - 1; i >= 0; -- i) {
            points.push({x: - points[i].x, y: points[i].y});
        }
        this.graphics.beginFill(0xFFFFFF, 0.2);
        this.graphics.lineStyle(this.lineWidth, 0xFFFFFF);
        this.graphics.moveTo(points[0].x, points[0].y);
        for (const point of points) {
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
        // 1 blink of 100ms every 3s
        const eyesSize: number = this.eyesClosed ? this.radius * 0.02 : this.radius * 0.1;
        const eyesY: number = -this.radius * 0.3;
        this.graphics.lineStyle(1, 0xFFFFFF);
        this.graphics.beginFill(0xFFFFFF, 1);
        this.graphics.drawRect(- eyesSize * 0.5, eyesY - eyesSize * 0.5, eyesSize, eyesSize);
        this.graphics.drawRect(this.radius * 0.3 - eyesSize * 0.5, eyesY - eyesSize * 0.5, eyesSize, eyesSize);
    }
}
