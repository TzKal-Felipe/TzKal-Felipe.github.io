import { 
    nearLocation,
    moveRight,
    moveLeft,
    stopMoving,
    makeJump,
    buildAudioPath
} from "./helperFunctions.js";

let audioFiles = {
    
};

export class FourthLevelManager {
    constructor(fireboy, watergirl, audioManager, voice_type){
        this.fireboy = fireboy;
        this.watergirl = watergirl;
        this.audioManager = audioManager;
        this.voice = voice_type;
        
        this.fireCheckpoints = {
        
        };
        
        this.waterCheckpoints = {
        
        };
        
        this.coordinates = {
        
        };
    }

    markFireboyCheckpoints(){
        
    }

    markWatergirlStopsAndCheckpoints(){
        
    }

    checkForWatergirlMovement(){
        
    }

    checkForLevelStateActions(){
        
    }
}
