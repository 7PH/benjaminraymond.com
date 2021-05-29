import {Stage} from "./animation/engine/Stage";
import {NodeContainer} from "./animation/nodes/NodeContainer";
import AudioHandler from "./audio/AudioHandler";
import {AnimatedBackground} from "./animation/nodes/AnimatedBackground";
import {PowerCircle} from "./animation/nodes/PowerCircle";

let stage: Stage;

function rebuildStage() {

    while (stage.children.length > 0)
        stage.removeChildAt(0);

    // average circle
    const avgCircle: PowerCircle = new PowerCircle(
        stage,
        stage.getWidth() / 2,
        6 * stage.getHeight() / 10
    );
    stage.addChild(avgCircle);

    const nodeContainer: NodeContainer = new NodeContainer(stage, avgCircle);
    nodeContainer.populate();
    stage.addChildAt(nodeContainer, 0);

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

    // prevent multi clicks
    document.removeEventListener('click', init);

    // 1 fade out the 'click to play' screen
    pagePreview.classList.add('goaway');

    // init song
    prepareSong();
    AudioHandler.song.pause();

    setTimeout(async () => {

        // start song
        playSong();

        // display title, metas, links
        const elements = document.getElementsByClassName("outofscreen");
        while (elements.length > 0) {
            elements[0].classList.add("onthescreen");
            elements[0].classList.remove("outofscreen");
        }
    }, 0);
}

function getMusicPath(): string | undefined {
    const path: string = (document.getElementById('music-select') as any).value;
    return path === "false" ? undefined : path;
}

/**
 *
 */
function prepareSong() {

    const audioContainer = document.getElementById('audio') as HTMLElement;

    if (typeof AudioHandler.song !== 'undefined') {
        AudioHandler.song.pause();
        AudioHandler.song.currentTime = 0;
    }

    const path = getMusicPath();
    if (typeof path !== "undefined") {
        // music changed
        AudioHandler.init(audioContainer, path);
    }

    return typeof path !== 'undefined';
}

async function playSong() {
    await AudioHandler.play();
}

window.addEventListener('DOMContentLoaded', () => {

    prepareSong();

    stage = new Stage('animation-canvas');
    rebuildStage();

    if (document.location.hash === '#debug') {

        // fps counter
        setInterval(() => {
            const fps = (1 / stage.lastDelta);
            let el = document.getElementById('fps');
            if (el === null)
                return;
            el.innerHTML = Math.floor(fps).toString();
        }, 1000);

    } else {

        let el = document.getElementById('fps');
        if (el && el.parentElement) {
            el.parentElement.style.display = 'none';
        }
    }
});

document.addEventListener('click', init);

const musicSelect: HTMLSelectElement = document.getElementById('music-select') as HTMLSelectElement;
musicSelect.addEventListener('change', async () => {
    if (prepareSong()) {
        await playSong();
    }
});
