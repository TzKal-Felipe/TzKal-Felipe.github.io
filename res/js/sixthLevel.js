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
            dropAfterLeftBall: false,
            belowLeverPlatform: false,
            leverPush: false,
            bottomRightStop: false,
            bottomRightJump: false,
            afterBlueBarrier: false,
            diamondStop: false,
            bottomRightSecondStop: false
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
            afterDrop4: {x: 25, y: 840},
            belowLeverPlatform: {x: 660, y: 910},
            atLeverStop: {x: 485, y: 750},
            atLeverMove: {x: 500, y: 750},
            bottomRight: {x: 1320, y: 887},
            afterBlueBarrier: {x: 1045, y: 730},
            diamond: {x: 860, y: 730},
            afterDiamondRetrieved: {x: 985, y: 730},
            waterDoor: {x: 955, y: 910}
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
            !this.waterCheckpoints.dropAfterLeftBall && this.waterCheckpoints.leftBallPush){

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
        if (nearLocation(this.watergirl.position, this.coordinates.belowLeverPlatform) &&
            !this.waterCheckpoints.belowLeverPlatform){
            
            stopMoving(this.watergirl);
            this.waterCheckpoints.belowLeverPlatform = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.atLeverStop) &&
            !this.waterCheckpoints.leverPush){
            
            stopMoving(this.watergirl);
            this.waterCheckpoints.leverPush = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.bottomRight) &&
            !this.waterCheckpoints.bottomRightStop){
            
            stopMoving(this.watergirl);
            this.waterCheckpoints.bottomRightStop = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.diamond) &&
            !this.waterCheckpoints.diamondStop){
            
            stopMoving(this.watergirl);
            this.waterCheckpoints.diamondStop = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.bottomRight) &&
            this.waterCheckpoints.diamondStop && !this.waterCheckpoints.bottomRightSecondStop){
            
            stopMoving(this.watergirl);
            this.waterCheckpoints.bottomRightSecondStop = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.waterDoor) &&
            this.waterCheckpoints.diamondStop){
            
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
        if (nearLocation(this.watergirl.position, this.coordinates.belowLeverPlatform) &&
            nearLocation(this.purpleButton.ramp.position, this.purpleButton.ramp.finalPosition) && 
            !this.greyLever.pressed){

            makeJump(this.watergirl);
            moveLeft(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.atLeverMove) &&
            this.greyLever.pressed){
            
            moveRight(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.bottomRight) &&
            !this.waterCheckpoints.bottomRightJump){
            
            makeJump(this.watergirl);
            moveLeft(this.watergirl);
            this.waterCheckpoints.bottomRightJump = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterBlueBarrier) &&
            !this.waterCheckpoints.afterBlueBarrier){
            
            makeJump(this.watergirl);
            this.waterCheckpoints.afterBlueBarrier = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.diamond)){
            moveRight(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterDiamondRetrieved) &&
            this.waterCheckpoints.diamondStop){
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.bottomRight) &&
            this.waterCheckpoints.diamondStop){
            
            moveLeft(this.watergirl);
        }
    }

    checkForLevelStateActions(){
        
    }
}
