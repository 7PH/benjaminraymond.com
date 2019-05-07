import {Stage} from "./animation/engine/Stage";
import {NodeContainer} from "./animation/nodes/NodeContainer";
import AudioHandler from "./audio/AudioHandler";
import {AnimatedBackground} from "./animation/nodes/AnimatedBackground";
import {PowerCircle} from "./animation/nodes/PowerCircle";
import {DisplayObject} from "./animation/engine/DisplayObject";

export const DEBUG: boolean = document.location.hash === '#debug';
console.log("DEBUG", DEBUG);

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

    // 1 fade out the 'click to play' screen
    pagePreview.classList.add('goaway');

    // init song
    await restartSong();
    AudioHandler.song.pause();

    setTimeout(async () => {

        // 2 display the stuff behind
        pageContent.style.display = 'block';

        // animation
        stage = new Stage('animation-canvas');
        rebuildStage();

    }, 1000);

    setTimeout(async () => {

        // start song
        await restartSong();

        // display title, metas, links
        const elements = document.getElementsByClassName("outofscreen");
        while (elements.length > 0) {
            elements[0].classList.add("onthescreen");
            elements[0].classList.remove("outofscreen");
        }
    }, 4000);
}

function getMusicPath(): string | undefined {
    const path: string = (document.getElementById('music-select') as any).value;
    return path === "false" ? undefined : path;
}

/**
 *
 */
async function restartSong() {

    if (typeof AudioHandler.song !== 'undefined') {
        AudioHandler.song.pause();
        AudioHandler.song.currentTime = 0;
    }

    const path = getMusicPath();
    if (typeof path !== "undefined") {

        // music changed
        AudioHandler.init(path);
        await AudioHandler.play();
    }
}


/**
 * @TODO finish
 */
async function switchToPage2() {

    document.getElementById('animation-container')!.style["top"] = "-100vh";

    // display title, metas, links
    const elements = document.getElementsByClassName("onthescreen");
    while (elements.length > 0) {
        elements[0].classList.add("outofscreen");
        elements[0].classList.remove("onthescreen");
    }

    setTimeout(() => {
        stage.cacheAsBitmap = true;
        AudioHandler.song.pause();
    }, 4000);
}
//(document.getElementById('fps-info')!).addEventListener('click', switchToPage2);

document.addEventListener('click', init);

const musicSelect: HTMLSelectElement = document.getElementById('music-select') as HTMLSelectElement;
musicSelect.addEventListener('change', () => restartSong());
