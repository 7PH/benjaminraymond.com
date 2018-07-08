import {DisplayObject} from "../engine/DisplayObject";
import {Point} from "../engine/Point";
import {DisplayObjectContainer} from "../engine/DisplayObjectContainer";
import {Node} from "./Node";


export class NodeLinker extends DisplayObject {

    private target: DisplayObjectContainer;

    constructor (stage, nodes) {
        super(stage);

        this.target = nodes;
    }

    update (delta) {
        super.update(delta);

        if (typeof this.graphics === 'undefined')
            return;

        this.graphics.clear();


        // pour tous les noeuds
        for (let i = 0, j = this.target.children.length; i < j; i++) {
            const node = this.target.children[i] as Node;

            // pour tous les noeuds au dessus
            for (let k = i + 1, l = this.target.children.length; k < l; k++) {
                const otherNode = this.target.children[k] as Node;

                const dist = Point.distance(
                    node.position,
                    otherNode.position
                );

                if (dist > 300) {
                    node.clearForce('node_' + otherNode.id);
                    otherNode.clearForce('node_' + node.id);
                    continue;
                }

                const a = Math.atan2(
                    node.position.y - otherNode.position.y,
                    node.position.x - otherNode.position.x
                );
                let fx = 0, fy = 0;
                if (dist != 0) {
                    fx = Math.cos(a) * 10000 / dist;
                    fy = Math.sin(a) * 10000 / dist;
                }

                node.setForce('node_' + otherNode.id, new PIXI.Point(- fx, - fy));
                otherNode.setForce('node_' + node.id, new PIXI.Point(fx, fy));

                let c = Math.floor((255 * Math.exp(-dist * 0.03))).toString(16);
                if (c.length == 1) c = '0' + c;
                this.graphics.lineStyle(1,parseInt('0x' + c.repeat(3)));
                this.graphics.beginFill(0x333333, 0.1);
                this.graphics.moveTo(node.position.x, node.position.y);
                this.graphics.lineTo(otherNode.position.x, otherNode.position.y);
                this.graphics.endFill();
            }
        }
    }
}