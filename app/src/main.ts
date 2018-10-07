import {Stage} from "./animation/engine/Stage";
import {NodeContainer} from "./animation/nodes/NodeContainer";
import AudioHandler from "./audio/AudioHandler";
import {AnimatedBackground} from "./animation/nodes/AnimatedBackground";
import {AverageCircle} from "./animation/nodes/AverageCircle";
import {DisplayObject} from "./animation/engine/DisplayObject";

export const DEBUG: boolean = document.location.hash === '#debug';
console.log("DEBUG", DEBUG);

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

    // average circle
    const avgCircle: DisplayObject = new AverageCircle(stage);
    avgCircle.position.x = stage.getWidth() / 2;
    avgCircle.position.y = 6 * stage.getHeight() / 10;
    stage.addChild(avgCircle);

    stage.addChildAt(new AnimatedBackground(stage), 0);
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

    document.removeEventListener('click', start);
}

let songs: string[] = [
    'assets/crossfire.webm',
    'assets/odd-look.mp3',
    'assets/odd-look-original.mp3',
    'assets/glitchmob.ogg?1',
    'assets/liftmefromtheground.webm',
    'assets/sandblast.webm',
];

let songIndex: number = parseInt(window.location.hash.replace('#', ''));
AudioHandler.init(songs[songIndex] || songs[0]);
document.addEventListener('click', start);
