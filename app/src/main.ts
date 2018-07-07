import {Stage} from "./engine/Stage";
import {NodeContainer} from "./nodes/NodeContainer";

let nodeContainer;
let stage;

function init() {
    stage = new Stage('animation-canvas');

    nodeContainer = new NodeContainer(stage);
    nodeContainer.populate();

    stage.addChild(nodeContainer);
    stage.run();

    setInterval(() => {
        const fps = (1 / stage.lastDelta);
        let el = document.getElementById('fps');
        if (el === null)
            return;
        el.innerHTML = Math.floor(fps).toString();
    }, 100);
}

window.onload = init;