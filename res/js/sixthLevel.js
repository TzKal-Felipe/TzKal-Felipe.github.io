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
            firstBallPushed: false,
            secondBallPushed: false
        };
        
        this.waterCheckpoints = {
            dropBeforeLeftBall: false,
            leftBallPush: false,
            dropAfterLeftBall: false
        };
        
        this.coordinates = {
            leftBallStart: {x: 355, y: 200},
            middleBallStart: {x: 630, y: 200},
            rightBallStart: {x: 1200, y: 30},
            watergirlStart: {x: 530, y: 47},
            duringDropBeforeLeftBall: {x: 100, y: 130},
            afterDropBeforeLeftBall: {x: 100, y: 263},
            atLeftBallPush: {x: 320, y: 155},
            beforeDrop1: {x: 237, y: 300},
            afterDrop1: {x: 237, y: 400},
            beforeDrop2: {x: 30, y: 410},
            afterDrop2: {x: 30, y: 550},
            beforeDrop3: {x: 120, y: 520},
            afterDrop3: {x: 120, y: 700},
            beforeDrop4: {x: 25, y: 740},
            afterDrop4: {x: 25, y: 840}
        };
    }

    markFireboyCheckpoints(){
        if (!nearLocation(this.middleBall.position, this.coordinates.middleBallStart) ||
            !nearLocation(this.rightBall.position, this.coordinates.rightBallStart)){
            
            this.fireCheckpoints.firstBallPushed = true;
        }
        if (!nearLocation(this.middleBall.position, this.coordinates.middleBallStart) &&
            !nearLocation(this.rightBall.position, this.coordinates.rightBallStart)){
            
            this.fireCheckpoints.secondBallPushed = true;
        }
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
        if (nearLocation(this.watergirl.position, this.coordinates.beforeDrop1)){
            stopMoving(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeDrop2)){
            stopMoving(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeDrop3)){
            stopMoving(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeDrop4)){
            stopMoving(this.watergirl);
        }
    }

    controlWatergirlMovement(){
        if (nearLocation(this.watergirl.position, this.coordinates.watergirlStart) &&
            this.fireCheckpoints.firstBallPushed){
            
            moveLeft(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterDropBeforeLeftBall) &&
            this.fireCheckpoints.secondBallPushed && !this.waterCheckpoints.leftBallPush){

            makeJump(this.watergirl);
            moveRight(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.atLeftBallPush) &&
            this.waterCheckpoints.leftBallPush){

            moveLeft(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterDropBeforeLeftBall) &&
            this.waterCheckpoints.leftBallPush){

            moveRight(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterDrop1)){
            moveLeft(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterDrop2)){
            moveRight(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterDrop3)){
            moveLeft(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterDrop4)){
            moveRight(this.watergirl);
        }
    }

    checkForLevelStateActions(){
        
    }
}
