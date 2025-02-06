import { 
    nearLocation,
    moveRight,
    moveLeft,
    stopMoving,
    makeJump,
} from "./helperFunctions.js";

let audioFiles = {
    
};

export class SixthLevelManager {
    constructor(fireboy, watergirl, audioManager){
        this.fireboy = fireboy;
        this.watergirl = watergirl;
        this.audioManager = audioManager;
        
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
