import {DisplayObjectContainer} from "../engine/DisplayObjectContainer";
import {Node} from "./Node";
import {NodeLinker} from "./NodeLinker";

export class NodeContainer extends DisplayObjectContainer {

    public nodes: DisplayObjectContainer;

    public nodeLinker: NodeLinker;

    constructor (stage) {
        super(stage);

        this.nodes = new DisplayObjectContainer(this.stage);
        this.addChild(this.nodes);

        this.nodeLinker = new NodeLinker(this.stage, this.nodes);
        this.addChildAt(this.nodeLinker, 0);

    }

    populate() {
        for (let x = 10; x < this.stage.getWidth(); x += 200)
            for (let y = 10; y < this.stage.getHeight(); y += 200)
                this.addNode(x + 12 * Math.random(), y + 12 * Math.random(), 0, 0);
    }

    addNode (x, y, vx, vy) {
        const node = new Node(this.stage);
        node.position.set(x, y);
        node.velocity.set(vx, vy);
        this.nodes.addChild(node);
    }

}
