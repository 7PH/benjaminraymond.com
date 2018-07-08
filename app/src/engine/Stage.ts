import {DisplayObjectContainer} from "./DisplayObjectContainer";


export class Stage extends DisplayObjectContainer {

    private canvasContainerID: any;

    private canvasContainer: HTMLDivElement;

    lastDelta: any;

    private renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;

    private mouse: any;

    private lastUpdateDelta: any;

    constructor (canvasID) {
        super(null);

        this.canvasContainerID = canvasID;
        this.canvasContainer = document.getElementById(canvasID) as HTMLDivElement;
        this.lastDelta = 0;

        /** Renderer */
        this.renderer = PIXI.autoDetectRenderer(
            window.innerWidth,
            window.innerHeight
        );
        this.canvasContainer.appendChild(this.renderer.view);
        this.renderer.render(this);

        /** Mouse */
        this.interactive = true;
        this.mouse = {};
        this.mouse.position = new PIXI.Point(0, 0);
        this.on('mousemove', (e, v, t) => {
            this.mouse.position.set(
                e.data.global.x,
                e.data.global.y
            );
        });
    }

    getWidth() {
        return this.canvasContainer.clientWidth;
    }

    getHeight() {
        return this.canvasContainer.clientHeight;
    }

    update() {
        const t = Date.now() / 1000;
        this.lastDelta = t - this.lastUpdateDelta;
        this.lastUpdateDelta = t;
        if (this.lastDelta > 1) this.lastDelta = 0;
        super.update(this.lastDelta);

        this.renderer.render(this);
        requestAnimationFrame(this.update.bind(this));
    }

    run() {
        this.lastUpdateDelta = Date.now() / 1000;
        requestAnimationFrame(this.update.bind(this));
    }
}
