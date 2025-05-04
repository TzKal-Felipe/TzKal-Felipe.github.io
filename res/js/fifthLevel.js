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
        this.whiteButton = allButtons[0][0];
        this.blueButton = allButtons[1][0];
        this.greenLever = allLevers[0];
        this.redLever = allLevers[1];
        this.lowerBall = allBalls[0];
        this.upperBall = allBalls[1];
        
        this.fireCheckpoints = {
            toBalls: false,
            dropped: false,
        };
        
        this.waterCheckpoints = {
            startDrop: false,
            dropToDoors: false,
            lowerLevelsDrop: false,
            greenLeverDrop: false,
            rightOfGreenLever: false,
            exitingGreenLeverJump: false,
            lowerLevelExitJump: false,
            betweenDoors: false,
            waterDoor: false,
            upperBall: false,
            lowerBallDrop: false,
            lowerBall: false,
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
            lowerBallDrop: {x: 1000, y: 78},
            afterLowerBallDrop: {x: 979, y: 334},
            lowerBall: {x: 1120, y: 334},
            underWaterpool: {x: 905, y: 226},
            leftOfFireDoor: {x: 220, y: 360},
            dropToDoors: {x: 77, y: 396},
            afterDropToDoors: {x: 79, y: 514},
            underFireDoor: {x: 400, y: 550},
            lowerLevelsDrop: {x: 985, y: 508},
            afterLowerLevelsDrop: {x: 985, y: 622},
            avoidLowerLavaJumpToLeft: {x: 859, y: 658},
            avoidLowerLavaJumpToRight: {x: 718, y: 694},
            greenLeverDrop: {x: 70, y: 729},
            afterGreenLeverDrop: {x: 77, y: 965},
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
        if (nearLocation(this.fireboy.position, this.coordinates.fireboyDropped) && !this.fireCheckpoints.dropped){
            this.fireCheckpoints.dropped = true;
        }
        if (nearLocation(this.fireboy.position, this.coordinates.fireboyToBalls) && !this.fireCheckpoints.toBalls){
            this.fireCheckpoints.toBalls = true;
        }
    }

    markWatergirlCheckpointsAndStops(){
        if (nearLocation(this.watergirl.position, this.coordinates.startDrop) && !this.waterCheckpoints.startDrop &&
           this.fireCheckpoints.toBalls){
            stopMoving(this.watergirl);
            this.waterCheckpoints.startDrop = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.dropToDoors) && !this.waterCheckpoints.dropToDoors){
            stopMoving(this.watergirl);
            this.waterCheckpoints.dropToDoors = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.lowerLevelsDrop) && !this.waterCheckpoints.lowerLevelsDrop){
            stopMoving(this.watergirl);
            this.waterCheckpoints.lowerLevelsDrop = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.greenLeverDrop) && !this.waterCheckpoints.greenLeverDrop){
            stopMoving(this.watergirl);
            this.waterCheckpoints.greenLeverDrop = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.rightOfGreenLever) && !this.waterCheckpoints.rightOfGreenLever){
            stopMoving(this.watergirl);
            this.waterCheckpoints.rightOfGreenLever = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.exitingGreenLeverJump) && !this.waterCheckpoints.exitingGreenLeverJump){
            stopMoving(this.watergirl);
            this.waterCheckpoints.exitingGreenLeverJump = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.lowerLevelExitJump) && !this.waterCheckpoints.lowerLevelExitJump){
            stopMoving(this.watergirl);
            this.waterCheckpoints.lowerLevelExitJump = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.betweenDoors) && !this.waterCheckpoints.betweenDoors &&
           this.greenLever.pressed){
            stopMoving(this.watergirl);
            this.waterCheckpoints.betweenDoors = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.waterDoor) && !this.waterCheckpoints.waterDoor){
            stopMoving(this.watergirl);
            this.waterCheckpoints.waterDoor = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.upperBall) && !this.waterCheckpoints.upperBall){
            stopMoving(this.watergirl);
            this.waterCheckpoints.upperBall = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.lowerBallDrop) && !this.waterCheckpoints.lowerBallDrop &&
           this.waterCheckpoints.upperBall){
            stopMoving(this.watergirl);
            this.waterCheckpoints.lowerBallDrop = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.lowerBall) && !this.waterCheckpoints.lowerBall){
            stopMoving(this.watergirl);
            this.waterCheckpoints.lowerBall = true;
        }
    }
    
    controlWatergirlMovement(){
        if (nearLocation(this.watergirl.position, this.coordinates.waterStart) && this.fireCheckpoints.dropped){
            moveRight(this.watergirl);
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.waterStart) && this.fireCheckpoints.toBalls){
            moveRight(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.leftOfFirepool) && !this.waterCheckpoints.lowerBall){
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.rightOfWaterpool) && !this.waterCheckpoints.lowerBall){
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.upperBall)){
            moveLeft(this.watergirl);
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterLowerBallDrop) && !this.waterCheckpoints.lowerBall){
            moveRight(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.lowerBall)){
            moveLeft(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterLowerBallDrop) && this.waterCheckpoints.lowerBall){
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.underWaterpool) && this.waterCheckpoints.lowerBall){
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.rightOfFirepool) && this.waterCheckpoints.lowerBall){
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.leftOfFireDoor)){
            moveLeft(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterDropToDoors)){
            moveRight(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.underFireDoor)){
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterLowerLevelsDrop) && !this.greenLever.pressed){
            moveLeft(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.avoidLowerLavaJumpToLeft) && !this.greenLever.pressed){
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterGreenLeverDrop) && !this.greenLever.pressed){
            moveRight(this.watergirl);
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.rightOfGreenLever)){
            moveLeft(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.atGreenLever) && this.greenLever.pressed){
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterGreenLeverDrop) && this.greenLever.pressed){
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.exitingGreenLeverJump)){
            moveRight(this.watergirl);
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.avoidLowerLavaJumpToRight) && this.greenLever.pressed){
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.twoStepsJump) && this.greenLever.pressed){
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.lowerLevelExitJump) && this.greenLever.pressed && this.watergirl.isOnBlock){
            moveLeft(this.watergirl);
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.betweenDoors) &&
            nearLocation(this.redLever.ramp.position, this.redLever.ramp.finalPosition) && this.greenLever.pressed){
            moveRight(this.watergirl);
            makeJump(this.watergirl);
        }
    }

    checkForLevelStateActions(){
        
    }
}
