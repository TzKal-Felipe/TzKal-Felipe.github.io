export class AudioManager {
    constructor(){
        this.audio = new Audio();
    }

    changeAudioFile(filePath){
        this.audio.src = filePath;
        this.audio.load();
    }

    playAudio(){
        this.audio.play();
    }
}
