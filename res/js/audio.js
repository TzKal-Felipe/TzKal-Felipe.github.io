export class AudioManager {
    constructor(){
        this.audio = new Audio();
        this.isPlaying = false;
        this.queue = null;
        this.currentSrc = null;
        this.audioInterval = null;
        this.timedAudioDelay = 6;
        this.timer = 0

        this.audioFilepaths = {
            
        };
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

    resetAudioTimer(){
        this.timer = 0;
    }

    startAudioTimer(){
        this.audioInterval = setInterval(() => {
            this.timer++;
    
            if (this.timer === this.timedAudioDelay){
                this.playAudio(nextAudio);
            }
        }, 1000);
    }

    stopAudioTimer(){
        clearInterval(this.audioInterval);
        this.resetAudioTimer();
    }
}
