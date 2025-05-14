import { buildAudioPath } from "./helperFunctions.js";

let voice_type = "original";
let audioEnabled = true;

function changeVoice(voice){
    voice_type = voice;
}

function setAudioEnabled(bool){
    audioEnabled = bool;
}

function* audioIterator(audioFiles) {
    for (const file of audioFiles) {
        yield file;
    }
}

class AudioManager {
    constructor(){
        this.audio = new Audio();
        this.isPlaying = false;
        this.queue = null;
        this.currentSrc = null;
        this.nextAudio = null;
        this.audioInterval = null;
        this.timedAudioDelay = 7;
        this.timer = 0
    }

    resetAudioTimer(){
        this.timer = 0;
    }

    playAudio(audioSrc, forgetNext=true){
        if (!audioSrc.startsWith("res/js")){
            audioSrc = buildAudioPath(audioSrc, voice_type);
        }

         if (forgetNext){
            this.nextAudio = null;
        }

        if (audioSrc === this.currentSrc || audioSrc === this.queue || !audioEnabled){
            return;
        }
        
        if (this.isPlaying){
            this.queue = audioSrc;
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
                    this.playAudio(this.nextAudio);
                }
                else{
                    let nextAudio = this.nextAudio.next();

                    if (nextAudio.done){
                        this.nextAudio = null;
                    }
                    else{
                        this.playAudio(nextAudio.value, false);
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
        this.resetAudioTimer();
        
        if (typeof audioSrc === "string"){
            this.nextAudio = audioSrc;
        }
        else if (Array.isArray(audioSrc) && audioSrc.every(item => typeof item === "string")){
            this.nextAudio = audioIterator(audioSrc);
        }
    }
}

export{ changeVoice, setAudioEnabled, AudioManager };
