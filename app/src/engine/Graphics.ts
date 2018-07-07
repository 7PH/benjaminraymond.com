import {Stage} from "./Stage";

export class Graphics extends PIXI.Graphics {

    private stage: Stage;

    constructor (stage) {
        super();
        this.stage = stage;
    }
}
