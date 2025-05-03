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
        
        };
        
        this.waterCheckpoints = {
            firstWaterDrop: false,
            secondWaterDrop: false,
            thirdWaterDrop: false,
            fourthWaterDrop: false,
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
    }

    markFireboyCheckpoints(){
        
    }

    markWatergirlCheckpointsAndStops(){
        if (nearLocation(this.watergirl, this.coordinates.firstWaterDrop) && !this.waterCheckpoints.firstWaterDrop){
            stopMoving(this.watergirl);
            this.waterCheckpoints.firstWaterDrop = true;
        }
        if (nearLocation(this.watergirl, this.coordinates.secondWaterDrop) && !this.waterCheckpoints.secondWaterDrop){
            stopMoving(this.watergirl);
            this.waterCheckpoints.secondWaterDrop = true;
        }
        if (nearLocation(this.watergirl, this.coordinates.thirdWaterDrop) && !this.waterCheckpoints.thirdWaterDrop){
            stopMoving(this.watergirl);
            this.waterCheckpoints.thirdWaterDrop = true;
        }
        if (nearLocation(this.watergirl, this.coordinates.fourthWaterDrop) && !this.waterCheckpoints.fourthWaterDrop){
            stopMoving(this.watergirl);
            this.waterCheckpoints.fourthWaterDrop = true;
        }
        if (nearLocation(this.watergirl, this.coordinates.fifthWaterDrop) && !this.waterCheckpoints.fifthWaterDrop){
            stopMoving(this.watergirl);
            this.waterCheckpoints.fifthWaterDrop = true;
        }
        if (nearLocation(this.watergirl, this.coordinates.secondWaterDrop) && !this.waterCheckpoints.secondWaterDrop){
            stopMoving(this.watergirl);
            this.waterCheckpoints.secondWaterDrop = true;
        }
        if (nearLocation(this.watergirl, this.coordinates.secondWaterDrop) && !this.waterCheckpoints.secondWaterDrop){
            stopMoving(this.watergirl);
            this.waterCheckpoints.secondWaterDrop = true;
        }
        if (nearLocation(this.watergirl, this.coordinates.secondWaterDrop) && !this.waterCheckpoints.secondWaterDrop){
            stopMoving(this.watergirl);
            this.waterCheckpoints.secondWaterDrop = true;
        }
    }

    controlWatergirlMovement(){
        
    }

    checkForLevelStateActions(){
        
    }
}
