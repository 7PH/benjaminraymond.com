

export default class AudioHandler {

    static readonly FFT_SIZE: number = 256;

    static readonly STATS_UPDATE_INTERVAL: number = 1000 / 30;

    static context: AudioContext;

    static analyser: AnalyserNode;

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
        this.context = new (AudioContext || (<any>window)['webkitAudioContext'])();

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
        this.average = this.waveform.reduce((prev, curr) => prev + Math.abs(curr), 0) / this.analyser.frequencyBinCount;
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