import {Stage} from "./animation/engine/Stage";
import {NodeContainer} from "./animation/nodes/NodeContainer";
import AudioHandler from "./audio/AudioHandler";
import {AnimatedBackground} from "./animation/nodes/AnimatedBackground";
import {AverageCircle} from "./animation/nodes/AverageCircle";
import {DisplayObject} from "./animation/engine/DisplayObject";

export const DEBUG: boolean = document.location.hash === '#debug';
console.log("DEBUG", DEBUG);

let stage: Stage;

function rebuildStage() {

    while (stage.children.length > 0)
        stage.removeChildAt(0);

    const nodeContainer: NodeContainer = new NodeContainer(stage);
    nodeContainer.populate();
    stage.addChild(nodeContainer);

    // average circle
    const avgCircle: DisplayObject = new AverageCircle(
        stage,
        stage.getWidth() / 2,
        6 * stage.getHeight() / 10
    );
    stage.addChild(avgCircle);

    stage.addChildAt(new AnimatedBackground(stage), 0);
    stage.run();
}

/**
 * To run only once
 */
async function init() {

    let pagePreview: HTMLElement = <HTMLElement> document.getElementById('page-preview');
    let pageContent: HTMLElement = <HTMLElement> document.getElementById('page-content');
    if (pagePreview === null || pageContent === null)
        return alert("Error. Please try to refresh the page");

    // fps counter
    setInterval(() => {
        const fps = (1 / stage.lastDelta);
        let el = document.getElementById('fps');
        if (el === null)
            return;
        el.innerHTML = Math.floor(fps).toString();
    }, 1000);

    // prevent multi clicks
    document.removeEventListener('click', init);

    // start song
    await restartSong();

    // 1 fade out the 'click to play' screen
    pagePreview.classList.add('goaway');

    setTimeout(async () => {

        // 2 display the stuff behind
        pageContent.style.display = 'block';

        // animation
        stage = new Stage('animation-canvas');
        rebuildStage();

    }, 2000);
}

function getMusicPath() {
    return (document.getElementById('music-select') as any).value;
}

/**
 *
 */
async function restartSong() {

    if (typeof AudioHandler.song !== 'undefined') {
        AudioHandler.song.pause();
        AudioHandler.song.currentTime = 0;
    }

    AudioHandler.init(getMusicPath());
    await AudioHandler.play();
}

document.addEventListener('click', init);

const musicSelect: HTMLSelectElement = document.getElementById('music-select') as HTMLSelectElement;
musicSelect.addEventListener('change', () => restartSong());
