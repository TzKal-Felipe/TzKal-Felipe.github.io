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
    constructor(fireboy, watergirl, audioManager, allButtons, allLevers){
        this.fireboy = fireboy;
        this.watergirl = watergirl;
        this.audioManager = audioManager;
        this.whiteButtonLeft = allButtons[0][0];
        this.whiteButtonRight = allButtons[0][1];
        this.blueLever = allLevers[0];
        this.redLever = allLevers[1];
        
        this.fireCheckpoints = {
            fireDoor: false,
        };
        
        this.waterCheckpoints = {
            firstWaterDrop: false,
            thirdWaterDrop: false,
            fifthWaterDrop: false,
            redLever: false,
            platformAfterLever: false,
            gapRightOfBluePlatform: false,
            firstWaterPool: false,
            beforeBluePlatformDrop: false,
            beforeRedPlatformDrop: false,
            beforeFinalDrop: false,
            rightButton: false,
            waterDoor: false
        };
        
        this.coordinates = {
            waterStart: {x: 1100, y: 47},
            firstWaterDrop: {x: 1280, y: 96},
            afterFirstWaterDrop: {x: 1280, y: 227},
            secondWaterDrop: {x: 1192, y: 243},
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
            beforeHugeDropJump: {x: 941, y: 227},
            beforeBluePlatformDrop: {x: 652, y: 520},
            afterBluePlatformDrop: {x: 652, y: 622},
            beforeRedPlatformDrop: {x: 725, y: 665},
            afterRedPlatformDrop: {x: 725, y: 802},
            betweenFireAndWaterPools: {x: 374, y: 730},
            beforeFinalDrop: {x: 51, y: 745},
            afterFinalDrop: {x: 51, y: 896},
            beforeFirstAcidPool: {x: 281, y: 874},
            beforeSecondAcidPool: {x: 461, y: 874},
            beforeWhiteBarrier: {x: 873, y: 910},
            secondWhiteButton: {x: 1273, y: 910},
            fireDoor: {x: 1043, y: 910},
            waterDoor: {x: 1143, y: 910},
        };
        console.log(nearLocation(this.watergirl, this.coordinates.waterStart));
        console.log(nearLocation(this.watergirl, {x: 1100, y: 47}));
    }

    markFireboyCheckpoints(){
        
    }

    markWatergirlCheckpointsAndStops(){
        if (nearLocation(this.watergirl.position, this.coordinates.firstWaterDrop) && !this.waterCheckpoints.firstWaterDrop){
            stopMoving(this.watergirl);
            this.waterCheckpoints.firstWaterDrop = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.thirdWaterDrop) && !this.waterCheckpoints.thirdWaterDrop){
            stopMoving(this.watergirl);
            this.waterCheckpoints.thirdWaterDrop = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.fifthWaterDrop) && !this.waterCheckpoints.fifthWaterDrop){
            stopMoving(this.watergirl);
            this.waterCheckpoints.fifthWaterDrop = true;
        }
        if (this.redLever.pressed && !this.waterCheckpoints.redLever){
            stopMoving(this.watergirl);
            this.waterCheckpoints.redLever = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterFourthWaterDrop) && !this.waterCheckpoints.platformAfterLever &&
           this.redLever.pressed){
            stopMoving(this.watergirl);
            this.waterCheckpoints.platformAfterLever = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.gapRightOfBluePlatform) && !this.waterCheckpoints.gapRightOfBluePlatform &&
           this.redLever.pressed){
            stopMoving(this.watergirl);
            this.waterCheckpoints.gapRightOfBluePlatform = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterSecondWaterDrop) && !this.waterCheckpoints.firstWaterPool &&
           this.redLever.pressed){
            stopMoving(this.watergirl);
            this.waterCheckpoints.firstWaterPool = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeBluePlatformDrop) && !this.waterCheckpoints.beforeBluePlatformDrop){
            stopMoving(this.watergirl);
            this.waterCheckpoints.beforeBluePlatformDrop = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeRedPlatformDrop) && !this.waterCheckpoints.beforeRedPlatformDrop){
            stopMoving(this.watergirl);
            this.waterCheckpoints.beforeRedPlatformDrop = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeFinalDrop) && !this.waterCheckpoints.beforeFinalDrop){
            stopMoving(this.watergirl);
            this.waterCheckpoints.beforeFinalDrop = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.secondWhiteButton) && !this.waterCheckpoints.rightButton){
            stopMoving(this.watergirl);
            this.waterCheckpoints.rightButton = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.waterDoor) && !this.waterCheckpoints.waterDoor && this.fireCheckpoints.fireDoor){
            stopMoving(this.watergirl);
            this.waterCheckpoints.waterDoor = true;
        }
    }
    
    controlWatergirlMovement(){
        if (nearLocation(this.watergirl.position, this.coordinates.waterStart) && this.blueLever.pressed){
            moveRight(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterFirstWaterDrop)){
            moveLeft(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterThirdWaterDrop) && !this.redLever.pressed){
            makeJump(this.watergirl);
            moveRight(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterFifthWaterDrop)){
            moveLeft(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.atRedLever) && this.redLever.pressed){
            makeJump(this.watergirl);
            moveRight(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterFourthWaterDrop) && this.redLever.pressed){
            makeJump(this.watergirl);
            moveLeft(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterThirdWaterDrop) && this.redLever.pressed){
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.gapRightOfBluePlatform) && this.redLever.pressed){
            makeJump(this.watergirl);
            moveRight(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterSecondWaterDrop) && this.redLever.pressed){
            makeJump(this.watergirl);
            moveLeft(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeHugeDropJump)){
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterBluePlatformDrop)){
            moveRight(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterRedPlatformDrop)){
            moveLeft(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.betweenFireAndWaterPools)){
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterFinalDrop)){
            moveRight(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeFirstAcidPool)){
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeSecondAcidPool)){
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.secondWhiteButton) && this.fireCheckpoints.fireDoor){
            moveLeft(this.watergirl);
        }
    }

    checkForLevelStateActions(){
        
    }
}
