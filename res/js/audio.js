let levelOneAudio = [
    "res/js/audio/you_got_it.wav",
    "res/js/audio/lava_ahead.wav",
    "res/js/audio/made_jump.wav",
    "res/js/audio/nice_jump.wav",
    "res/js/audio/up_we_go.wav",
    "res/js/audio/acid_ahead.wav",
    "res/js/audio/acid_not_scary.wav",
    "res/js/audio/lever_does.wav",
    "res/js/audio/doing_great.wav",
    "res/js/audio/onwards.wav",
    "res/js/audio/water_press_button.wav",
    "res/js/audio/wait.wav",
    "res/js/audio/keep_button_pressed.wav",
    "res/js/audio/block_strong.wav",
    "res/js/audio/finish_line.wav",
    "res/js/audio/diamonds.wav",
    "res/js/audio/spot_exit.wav",
    "res/js/audio/teamwork.wav"
    ];

export class AudioManager {
    constructor(){
        this.audio = new Audio();
        this.isPlaying = false;
        this.queue = null;
        this.currentSrc = null;
        this.nextAudio = null;
        this.audioInterval = null;
        this.timedAudioDelay = 6;
        this.timer = 0
        this.audioFiles = null;
        this.audioIndex = null;
    }

    resetAudioTimer(){
        this.timer = 0;
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

        this.resetAudioTimer();
    }

    playNext(){
        if (this.audioFiles){
            console.log(this.audioIndex);
            this.playAudio(this.audioFiles[this.audioIndex]);
            this.audioIndex++;
        }
    }

    loadLevelAudio(levelNumber){
        this.audioIndex = 0;
        
        switch (levelNumber){
            case 1:
                this.audioFiles = levelOneAudio;
                break;

            case 2:
                this.audioFiles = levelTwoAudio;
                break;

            case 3:
                this.audioFiles = levelThreeAudio;
                break;

            case 4:
                this.audioFiles = levelFourAudio;
                break;

            case 5:
                this.audioFiles = levelFiveAudio;
                break;

            case 6:
                this.audioFiles = levelSixAudio;
                break;
        }
    }

    startAudioTimer(){
        this.audioInterval = setInterval(() => {
            this.timer++;
    
            if (this.timer === this.timedAudioDelay){
                this.playAudio(this.nextAudio);
                this.nextAudio = null;
            }
        }, 1000);
    }

    stopAudioTimer(){
        clearInterval(this.audioInterval);
        this.resetAudioTimer();
    }

    nextAudioForTimer(audioSrc){
        this.nextAudio = audioSrc;
    }
}
