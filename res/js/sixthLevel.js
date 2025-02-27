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
            dropBeforeLeftBall: false,
            leftBallPush: false,
            dropAfterLeftBall: false
        };
        
        this.coordinates = {
            leftBallAfterPush: {x: 400, y: 230},
            middleBallAfterPush: {x: 570, y: 245},
            rightBallAfterPush: {x: 1290, y: 10},
            watergirlStart: {x: 530, y: 47},
            duringDropBeforeLeftBall: {x: 123, y: 130},
            afterDropBeforeLeftBall: {x: 123, y: 263},
            atLeftBallPush: {x: 310, y: 155}
        };
    }

    markFireboyCheckpoints(){
        
    }

    markWatergirlCheckpointsAndStops(){
        if (nearLocation(this.watergirl.position, this.coordinates.duringDropBeforeLeftBall) &&
            !this.waterCheckpoints.dropBeforeLeftBall){

            stopMoving(this.watergirl);
            this.waterCheckpoints.dropBeforeLeftBall = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.atLeftBallPush) &&
            !this.waterCheckpoints.leftBallPush){

            stopMoving(this.watergirl);
            this.waterCheckpoints.leftBallPush = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterDropBeforeLeftBall) &&
            !this.waterCheckpoints.dropAfterLeftBall){

            stopMoving(this.watergirl);
            this.waterCheckpoints.dropAfterLeftBall = true;
        }
    }

    controlWatergirlMovement(){
        if (nearLocation(this.watergirl.position, this.coordinates.watergirlStart) &&
            nearLocation(this.middleBall.position, this.coordinates.middleBallAfterPush) ||
            nearLocation(this.rightBall.position, this.coordinates.rightBallAfterPush)){
            
            moveLeft(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterDropBeforeLeftBall) &&
            nearLocation(this.middleBall.position, this.coordinates.middleBallAfterPush) ||
            nearLocation(this.rightBall.position, this.coordinates.rightBallAfterPush)){

            makeJump(this.watergirl);
            moveRight(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.atLeftBallPush) &&
            nearLocation(this.leftBall.position, this.coordinates.leftBallAfterPush)){

            moveLeft(this.watergirl);
        }
    }

    checkForLevelStateActions(){
        
    }
}
