import {DisplayObjectContainer} from "./DisplayObjectContainer";

/**
 * Base container of every object on the scene
 */
export class Stage extends DisplayObjectContainer {

    /**
     * HTML id of the canvas container
     */
    public canvasContainerID: string;

    /**
     * Reference to the canvas container
     */
    public canvasContainer: HTMLDivElement;

    /**
     * PIXI renderer
     */
    public renderer: PIXI.Renderer;

    /**
     * Date of the last call to update
     */
    public lastUpdateDelta: number = 0;

    /**
     * Last delta value (seconds)
     */
    public lastDelta: number = 0;

    constructor (canvasID: string) {

        // we want the stage typed as 'Stage'
        //  even if it is null on the Stage itself.
        super(null as any);

        // init container
        this.canvasContainerID = canvasID;
        this.canvasContainer = document.getElementById(canvasID) as HTMLDivElement;

        // create renderer
        this.renderer = PIXI.autoDetectRenderer({
            width: window.innerWidth,
            height: window.innerHeight
        });
        this.canvasContainer.appendChild(this.renderer.view);
        this.renderer.render(this);
    }

    /**
     * Get the stage width
     */
    getWidth() {
        return this.canvasContainer.clientWidth;
    }

    /**
     * Get the stage height
     */
    getHeight() {
        return this.canvasContainer.clientHeight;
    }

    /**
     * Update every DisplayObject on stage
     */
    update() {
        const currentDateMs = Date.now() / 1000;
        this.lastDelta = currentDateMs - this.lastUpdateDelta;
        this.lastUpdateDelta = currentDateMs;
        if (this.lastDelta > 1) this.lastDelta = 0;
        super.update(this.lastDelta);

        this.renderer.render(this);
        requestAnimationFrame(this.update.bind(this));
    }

    /**
     * Run the stage
     */
    run() {
        this.lastUpdateDelta = Date.now() / 1000;
        requestAnimationFrame(this.update.bind(this));
    }
}
