import { 
    nearLocation,
    moveRight,
    moveLeft,
    stopMoving,
    makeJump
} from "./helperFunctions.js";

let audioFiles = {
    
};

export class FifthLevelManager {
    constructor(fireboy, watergirl, audioManager, allButtons, allLevers, allBalls){
        this.fireboy = fireboy;
        this.watergirl = watergirl;
        this.audioManager = audioManager;
        
        this.fireCheckpoints = {
        
        };
        
        this.waterCheckpoints = {
        
        };
        
        this.coordinates = {
            waterStart: {x: 116, y: 118},
            startDrop: {x: 234, y: 106},
            fireboyDropped: {x: 218, y: 266},
            fireboyToBalls: {x: 587, y: 85},
            leftOfFirepool: {x: 506, y: 118},
            rightOfFirepool: {x: 651, y: 118},
            rightOfWaterpool: {x: 871, y: 118},
            upperBall: {x: 1228, y: 118},
            beforeSpike: {x: 1171, y: 118},
            lowerBallDrop: {x: 979, y: 10},
            afterLowerBallDrop: {x: 979, y: 334},
            lowerBall: {x: 1100, y: 334},
            underWaterpool: {x: 905, y: 226},
            dropToDoors: {x: 77, y: 396},
            afterDropToDoors: {x: 79, y: 514},
            underFireDoor: {x: 400, y: 550},
            lowerLevelsDrop: {x: 985, y: 508},
            afterLowerLevelsDrop: {x: 985, y: 622},
            avoidLowerLavaJumpToLeft: {x: 859, y: 658},
            avoidLowerLavaJumpToRight: {x: 718, y: 694},
            greenLeverDrop: {x: 70, y: 729},
            afterGreenLeverDrop: {x: 77, y: 910},
            rightOfGreenLever: {x: 256, y: 910},
            atGreenLever: {x: 177, y: 910},
            exitingGreenLeverJump: {x: 5, y: 838},
            twoStepsJump: {x: 940, y: 658},
            lowerLevelExitJump: {x: 1084, y: 586},
            betweenDoors: {x: 568, y: 406},
            waterDoor: {x: 780, y: 300},
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
