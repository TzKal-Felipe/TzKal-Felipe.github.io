export class AudioManager {
    constructor(){
        this.audio = new Audio();
        this.isPlaying = false;
        this.queue = null;
    }

    playAudio(audioSrc){
        if (this.isPlaying){
            this.queue = audioSrc;
        } else {
            this.audio.src = audioSrc;
            this.audio.load();
            this.audio.play();
            this.isPlaying = true;

            this.audio.onended = () => {
                this.isPlaying = false;

                if (this.queue){
                    const nextAudio = this.queue;
                    this.queue = null;
                    this.playAudio(nextAudio);
                }
            };
        }
    }
}
