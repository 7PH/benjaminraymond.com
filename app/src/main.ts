import {Stage} from "./animation/engine/Stage";
import {NodeContainer} from "./animation/nodes/NodeContainer";
import AudioHandler from "./audio/AudioHandler";

window.onload = () => {
    const stage: Stage = new Stage('animation-canvas');

    let nodeContainer = new NodeContainer(stage);
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

    AudioHandler.init('assets/crossfire.webm');
};

document.addEventListener('click', async () => AudioHandler.play());
