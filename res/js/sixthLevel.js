import { 
    nearLocation,
    moveRight,
    moveLeft,
    stopMoving,
    makeJump
} from "./helperFunctions.js";

let audioFiles = {
    
};

export class SixthLevelManager {
    constructor(fireboy, watergirl, audioManager, allButtons, allLevers, allBalls){
        this.fireboy = fireboy;
        this.watergirl = watergirl;
        this.audioManager = audioManager;
        this.blueButton = allButtons[0][0];
        this.redButton = allButtons[1][0];
        this.greenButton = allButtons[2][0];
        this.purpleButton = allButtons[3][0];
        this.greyLever = allLevers[0];
        this.leftBall = allBalls[0];
        this.middleBall = allBalls[1];
        this.rightBall = allBalls[2];
        
        this.fireCheckpoints = {
        
        };
        
        this.waterCheckpoints = {
            
        };
        
        this.coordinates = {
            leftBallAfterPush: {x: 400, y: 230},
            middleBallAfterPush: {x: 570, y: 245},
            rightBallAfterPush: {x: 1250, y: 30},
            watergirlStart: {x: 530, y: 47},
            duringDropBeforeLeftBall: {x: 123, y: 130},
            afterDropBeforeLeftBall: {x: 123, y: 263},
            atLeftBallPush: {x: 310, y: 155},
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
