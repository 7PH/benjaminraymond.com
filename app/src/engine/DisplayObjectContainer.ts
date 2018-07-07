import {DisplayObject} from "./DisplayObject";


export class DisplayObjectContainer extends DisplayObject {

    constructor (stage) {
        super(stage, false);

    }

    update (delta) {
        super.update(delta);
        
        for (let i = 0, j = this.children.length; i < j; ++i) {
            const child: DisplayObject = this.children[i] as DisplayObject;

            if (child.update)
                child.update(delta);
        }
    }
}
