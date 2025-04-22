import { 
    nearLocation,
    moveRight,
    moveLeft,
    stopMoving,
    makeJump
} from "./helperFunctions.js";

let audioFiles = {
    
};

export class FourthLevelManager {
    constructor(fireboy, watergirl, audioManager){
        this.fireboy = fireboy;
        this.watergirl = watergirl;
        this.audioManager = audioManager;
        
        this.fireCheckpoints = {
        
        };
        
        this.waterCheckpoints = {
        
        };
        
        this.coordinates = {
            waterStart: {x: 1100, y: 47},
            firstWaterDrop: {x: 1280, y: 96},
            afterFirstWaterDrop: {x: 1280, y: 227},
            secondWaterDrop: {x: 1192, 243},
            afterSecondWaterDrop: {x: 1192, y: 352},
            thirdWaterDrop: {x: 832, y: 485},
            afterThirdWaterDrop: {x: 833, y: 622},
            beforeFirstLavaPool: {x: 883, y: 622},
            fourthWaterDrop: {x: 1160, y: 563},
            afterFourthWaterDrop: {x: 1160, y: 658},
            fifthWaterDrop: {x: 1251, y: 692},
            afterFifthWaterDrop: {x: 1265, y: 766},
            atRedLever: {x: 1095, y: 766},
            gapRightOfBluePlatform: {x: 797, y: 527},
        };
    }

    markFireboyCheckpoints(){
        
    }

    markWatergirlCheckpointsAndStops(){
        
    }

    controlWatergirlMovement(){
        
    }

    checkForLevelStateActions(){
        
    }
}
