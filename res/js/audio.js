import { buildAudioPath } from "./helperFunctions.js";

let voice_type = "default_tts";

function changeVoice(voice){
    voice_type = voice;
}

class AudioManager {
    constructor(){
        this.audio = new Audio();
        this.isPlaying = false;
        this.queue = null;
        this.currentSrc = null;
        this.nextAudio = null;
        this.audioInterval = null;
        this.timedAudioDelay = 5;
        this.timer = 0
    }

    resetAudioTimer(){
        this.timer = 0;
    }

    playAudio(audioSrc){
        if (!audioSrc.startsWith("res/js")){
            audioSrc = buildAudioPath(audioSrc, voice_type);
        }
        
        if (audioSrc === this.currentSrc || audioSrc === this.queue){
            return;
        }

        this.nextAudio = null;
        
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

        this.resetAudioTimer();
    }

    startAudioTimer(){
        this.audioInterval = setInterval(() => {
            this.timer++;
    
            if (this.timer === this.timedAudioDelay && this.nextAudio){
                if (typeof this.nextAudio === "string"){
                    console.log("played the single string audio");
                    this.playAudio(this.nextAudio);
                    this.nextAudio = null;
                }
                else{
                    let nextAudio = this.nextAudio.next();

                    if (nextAudio.done){
                        console.log("iterator is done, nulling nextAudio");
                        this.nextAudio = null;
                    }
                    else{
                        console.log("played the next iterator string");
                        this.playAudio(nextAudio.value);
                    }
                }
            }
        }, 1000);
    }

    stopAudioTimer(){
        clearInterval(this.audioInterval);
        this.resetAudioTimer();
    }

    nextAudioForTimer(audioSrc){
        if (typeof audioSrc === "string"){
            this.nextAudio = audioSrc;
        }
        else if (Array.isArray(audioSrc) && audioSrc.every(item => typeof item === "string")){
            this.nextAudio = audioSrc[Symbol.iterator]();
            console.log("used string array for nextAudioForTimer call, created iterator for nextAudio");
        }
    }
}

export{ voice_type, changeVoice, AudioManager };
