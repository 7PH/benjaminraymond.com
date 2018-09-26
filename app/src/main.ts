import {Stage} from "./animation/engine/Stage";
import {NodeContainer} from "./animation/nodes/NodeContainer";
import AudioHandler from "./audio/AudioHandler";

async function start() {

    let pagePreview: HTMLElement | null = document.getElementById('page-preview');
    let pageContent: HTMLElement | null = document.getElementById('page-content');

    if (pagePreview === null || pageContent === null)
        return alert("Error. Please try to refresh the page");

    pagePreview.style.display = 'none';
    pageContent.style.display = 'block';

    // animation
    const stage: Stage = new Stage('animation-canvas');
    const nodeContainer: NodeContainer = new NodeContainer(stage);
    nodeContainer.populate();
    stage.addChild(nodeContainer);
    stage.run();

    // fps counter
    setInterval(() => {
        const fps = (1 / stage.lastDelta);
        let el = document.getElementById('fps');
        if (el === null)
            return;
        el.innerHTML = Math.floor(fps).toString();
    }, 1000);

    // start sound
    setTimeout(async () => {

        await AudioHandler.play();
    }, 400);
}

let songs: string[] = [
    'assets/crossfire.webm',
    'assets/glitchmob.ogg'
];
AudioHandler.init(songs[0]);
document.addEventListener('click', start);
