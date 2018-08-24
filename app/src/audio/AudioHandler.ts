

export default class AudioHandler {

    static readonly FFT_SIZE: number = 64;

    static readonly STATS_UPDATE_INTERVAL: number = 50;

    static context: AudioContext;

    static analyser;

    static gain: GainNode;

    static song: HTMLAudioElement;

    static waveform: Float32Array;

    static average: number = 0;

    static isPlaying: boolean;

    /**
     *
     * @param {string} src
     */
    static init(src: string) {

        // context
        this.context = new (AudioContext || window['webkitAudioContext'])();

        // gain
        this.gain = AudioHandler.context.createGain();
        this.gain.connect(this.context.destination);

        // song
        this.song = new Audio(src);
        this.song.crossOrigin = 'anonymous';
        this.isPlaying = false;

        // source
        const songSource = this.context.createMediaElementSource(this.song);
        songSource.connect(this.gain);

        // setup analyser
        this.analyser = this.context.createAnalyser();
        this.gain.connect(this.analyser);
        this.analyser.fftSize = AudioHandler.FFT_SIZE;
        this.waveform = new Float32Array(this.analyser.frequencyBinCount);
        this.analyser.getFloatTimeDomainData(this.waveform);

        setInterval(() => this.updateStats(), AudioHandler.STATS_UPDATE_INTERVAL);
    }

    /**
     *
     */
    static updateStats() {

        this.analyser.getFloatTimeDomainData(this.waveform);

        const newAverage = this.waveform.reduce((prev, curr) => prev + Math.abs(curr), 0);

        this.average += (newAverage - this.average) * 1;
    }

    /**
     *
     * @returns {Promise<void>}
     */
    static async play() {

        await this.song.play();

        this.isPlaying = true;

        this.updateStats();
    }
}