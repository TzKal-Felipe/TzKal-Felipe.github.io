export class AudioManager {
    constructor(){
        this.audio = new Audio();
        this.isPlaying = false;
        this.queue = null;
        this.currentSrc = null;
    }

    playAudio(audioSrc){
        if (audioSrc === this.currentSrc || audioSrc === this.queue){
            return;
        }
        
        if (this.isPlaying){
            this.queue = audioSrc;
            console.log("audio queued");
        } else {
            this.audio.src = audioSrc;
            this.audio.load();
            this.audio.play();
            this.isPlaying = true;
            this.currentSrc = audioSrc;

            this.audio.onended = () => {
                this.isPlaying = false;
                this.currentSrc = null;

                if (this.queue){
                    const nextAudio = this.queue;
                    this.queue = null;
                    console.log("dequeued and played audio");
                    this.playAudio(nextAudio);
                }
            };
        }
    }
}
