import { 
    nearLocation,
    moveRight,
    moveLeft,
    stopMoving,
    makeJump,
} from "./helperFunctions.js";

export class FirstLevelManager {
    constructor(fireboy, watergirl, allLevers, allButtons){
        this.fireboy = fireboy;
        this.watergirl = watergirl;
        this.audioFilepaths = audioFilepaths;
        this.nextAudio = nextAudio;
        this.yellowLever = allLevers[0];
        this.firstPurpleButton = allButtons[0][0];
        this.secondPurpleButton = allButtons[0][1];
        
        this.fireCheckpoints = {
            beforeEncloseExitFire: false,
            beforeFirePool: false,
            betweenPools: false,
            afterWaterPool: false,
            firstHigherPlatform: false,
            beforeAcidPool: false,
            afterAcidPool: false,
            beforeLever: false,
            beforeLeverPlatform: false,
            onLeverPlatform: false,
            afterLeverPlatform: false,
            onFirstButton: false,
            onButtonPlatform: false,
            afterCubeDrop: false,
            halfwayCubeSliding: false,
            beforeCubeJump: false,
            onCube: false,
            afterCubeFire: false,
            beforeDoors: false
        };
        
        this.waterCheckpoints = {
            beforeEncloseExitFire: false,
            beforeFirePool: false,
            betweenPools: false,
            afterWaterPool: false,
            firstHigherPlatform: false,
            beforeAcidPool: false,
            afterAcidPool: false,
            beforeLever: false,
            beforeLeverPlatform: false,
            onLeverPlatform: false,
            afterLeverPlatform: false,
            onFirstButton: false,
            beforeButtonPlatform: false,
            onButtonPlatform: false,
            beforeCube: false,
            afterCubeDrop: false,
            halfwayCubeSliding: false,
            beforeCubeJump: false,
            onCube: false,
            afterCubeWater: false
        };
        
        this.coordinates = {
            startWater: {x: 47, y: 780},
            beforeEncloseExitFire: {x: 273, y: 911},
            beforeEncloseExitWater: {x: 273, y: 780},
            beforeFirePool: {x: 560, y: 851},
            betweenPools: {x: 833, y: 851},
            afterWaterPool: {x: 1128, y: 851},
            firstHigherPlatform: {x: 1265, y: 743},
            beforeAcidPool: {x: 1020, y: 635},
            afterAcidPool: {x: 708, y: 635},
            beforeLever: {x: 430, y: 573},
            beforeLeverPlatform: {x: 191, y: 573},
            onLeverPlatform: {x: 80, y: 555},
            afterLeverPlatform: {x: 212, y: 413},
            onFirstButton: {x: 359, y: 413},
            beforeButtonPlatform: {x: 1140, y: 479},
            onButtonPlatformLowered: {x: 1220, y: 448},
            onButtonPlatformLifted: {x: 1220, y: 340},
            onSecondButton: {x: 1031, y: 299},
            beforeCube: {x: 815, y: 227},
            afterCubeDrop: {x: 579, y: 299},
            halfwayCubeSliding: {x: 411, y: 299},
            beforeCubeJump: {x: 249, y: 299},
            onCube: {x: 185, y: 232},
            afterCubeFire: {x: 143, y: 155},
            afterCubeWater: {x: 46, y: 155},
            beforeDoors: {x: 357, y: 47},
            doorWater: {x: 1238, y: 119}
        };
    }
    
    markFireboyCheckpoints(){
        if (nearLocation(this.fireboy.position, this.coordinates.beforeEncloseExitFire)){
            this.fireCheckpoints.beforeEncloseExitFire = true;
        }
        if (nearLocation(this.fireboy.position, this.coordinates.beforeFirePool)){
            this.fireCheckpoints.beforeFirePool = true;
        }
        if (nearLocation(this.fireboy.position, this.coordinates.betweenPools)){
            this.fireCheckpoints.betweenPools = true;
        }
        if (nearLocation(this.fireboy.position, this.coordinates.afterWaterPool)){
            this.fireCheckpoints.afterWaterPool = true;
        }
        if (nearLocation(this.fireboy.position, this.coordinates.firstHigherPlatform)){
            this.fireCheckpoints.firstHigherPlatform = true;
        }
        if (nearLocation(this.fireboy.position, this.coordinates.beforeAcidPool)){
            this.fireCheckpoints.beforeAcidPool = true;
        }
        if (nearLocation(this.fireboy.position, this.coordinates.afterAcidPool)){
            this.fireCheckpoints.afterAcidPool = true;
        }
        if (nearLocation(this.fireboy.position, this.coordinates.beforeLever)){
            this.fireCheckpoints.beforeLever = true;
        }
        if (nearLocation(this.fireboy.position, this.coordinates.beforeLeverPlatform)){
            this.fireCheckpoints.beforeLeverPlatform = true;
        }
        if (nearLocation(this.fireboy.position, this.coordinates.onLeverPlatform)){
            this.fireCheckpoints.onLeverPlatform = true;
        }
        if (nearLocation(this.fireboy.position, this.coordinates.afterLeverPlatform)){
            this.fireCheckpoints.afterLeverPlatform = true;
        }
        if (nearLocation(this.fireboy.position, this.coordinates.onFirstButton)){
            this.fireCheckpoints.onFirstButton = true;
        }
        if (nearLocation(this.fireboy.position, this.coordinates.onButtonPlatformLowered)){
            this.fireCheckpoints.onButtonPlatform = true;
        }
        if (nearLocation(this.fireboy.position, this.coordinates.afterCubeDrop)){
            this.fireCheckpoints.afterCubeDrop = true;
        }
        if (nearLocation(this.fireboy.position, this.coordinates.halfwayCubeSliding)){
            this.fireCheckpoints.halfwayCubeSliding = true;
        }
        if (nearLocation(this.fireboy.position, this.coordinates.beforeCubeJump)){
            this.fireCheckpoints.beforeCubeJump = true;
        }
        if (nearLocation(this.fireboy.position, this.coordinates.onCube)){
            this.fireCheckpoints.onCube = true;
        }
        if (nearLocation(this.fireboy.position, this.coordinates.afterCubeFire)){
            this.fireCheckpoints.afterCubeFire = true;
        }
        if (nearLocation(this.fireboy.position, this.coordinates.beforeDoors)){
            this.fireCheckpoints.beforeDoors = true;
        }
    }

    markWatergirlStopsAndCheckpoints(){
        if (nearLocation(this.watergirl.position, this.coordinates.beforeEncloseExitWater) && !this.waterCheckpoints.beforeEncloseExitWater){
            stopMoving(this.watergirl);
            this.waterCheckpoints.beforeEncloseExitWater = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeFirePool) && !this.waterCheckpoints.beforeFirePool){
            stopMoving(this.watergirl);
            this.waterCheckpoints.beforeFirePool = true;
            playAudio(this.audioFilepaths.lava_ahead);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.betweenPools) && !this.waterCheckpoints.betweenPools){
            stopMoving(this.watergirl);
            this.waterCheckpoints.betweenPools = true;
            playAudio(this.audioFilepaths.made_jump);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterWaterPool) && !this.waterCheckpoints.afterWaterPool){
            stopMoving(this.watergirl);
            this.waterCheckpoints.afterWaterPool = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.firstHigherPlatform) && !this.waterCheckpoints.firstHigherPlatform){
            stopMoving(this.watergirl);
            this.waterCheckpoints.firstHigherPlatform = true;
            playAudio(this.audioFilepaths.up_we_go);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeAcidPool) && !this.waterCheckpoints.beforeAcidPool){
            stopMoving(this.watergirl);
            this.waterCheckpoints.beforeAcidPool = true;
            playAudio(this.audioFilepaths.acid_ahead);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterAcidPool) && !this.waterCheckpoints.afterAcidPool){
            stopMoving(this.watergirl);
            this.waterCheckpoints.afterAcidPool = true;
            playAudio(this.audioFilepaths.acid_not_scary);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeLever) && !this.waterCheckpoints.beforeLever){
            stopMoving(this.watergirl);
            this.waterCheckpoints.beforeLever = true;
            playAudio(this.audioFilepaths.lever_does);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeLeverPlatform) && !this.waterCheckpoints.beforeLeverPlatform){
            stopMoving(this.watergirl);
            this.waterCheckpoints.beforeLeverPlatform = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.onLeverPlatform) && !this.waterCheckpoints.onLeverPlatform){
            stopMoving(this.watergirl);
            this.waterCheckpoints.onLeverPlatform = true;
            
            if (this.nextAudio === this.audioFilepaths.lever_important){
                queueAudioForTimer(this.audioFilepaths.stuck_restart);
            }
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterLeverPlatform) && !this.waterCheckpoints.afterLeverPlatform){
            stopMoving(this.watergirl);
            this.waterCheckpoints.afterLeverPlatform = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.onFirstButton) && !this.waterCheckpoints.onFirstButton){
            stopMoving(this.watergirl);
            this.waterCheckpoints.onFirstButton = true;
            playAudio(this.audioFilepaths.water_press_button);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeButtonPlatform) && !this.waterCheckpoints.beforeButtonPlatform){
            stopMoving(this.watergirl);
            this.waterCheckpoints.beforeButtonPlatform = true;
            playAudio(this.audioFilepaths.keep_button_pressed);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.onButtonPlatformLowered) && !this.waterCheckpoints.onButtonPlatform){
            stopMoving(this.watergirl);
            this.waterCheckpoints.onButtonPlatform = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeCube) && !this.waterCheckpoints.beforeCube){
            stopMoving(this.watergirl);
            this.waterCheckpoints.beforeCube = true;
            playAudio(this.audioFilepaths.block_strong);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterCubeDrop) && !this.waterCheckpoints.afterCubeDrop){
            stopMoving(this.watergirl);
            this.waterCheckpoints.afterCubeDrop = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.halfwayCubeSliding) && !this.waterCheckpoints.halfwayCubeSliding){
            stopMoving(this.watergirl);
            this.waterCheckpoints.halfwayCubeSliding = true;
            playAudio(this.audioFilepaths.finish_line);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeCubeJump) && !this.waterCheckpoints.beforeCubeJump){
            stopMoving(this.watergirl);
            this.waterCheckpoints.beforeCubeJump = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.onCube) && !this.waterCheckpoints.onCube){
            stopMoving(this.watergirl);
            this.waterCheckpoints.onCube = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterCubeWater) && !this.waterCheckpoints.afterCubeWater){
            stopMoving(this.watergirl);
            this.waterCheckpoints.afterCubeWater = true;
            playAudio(this.audioFilepaths.diamonds);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.doorWater)){
            stopMoving(this.watergirl);
            playAudio(this.audioFilepaths.teamwork);
        }
    }

    checkForWatergirlMovement(){
        if (nearLocation(this.watergirl.position, this.coordinates.startWater) && this.fireCheckpoints.beforeEncloseExitFire){
            moveRight(this.watergirl);
            playAudio(this.audioFilepaths.you_got_it);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeEncloseExitWater) && this.fireCheckpoints.beforeFirePool){
            moveRight(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeFirePool) && this.fireCheckpoints.betweenPools && this.watergirl.isOnBlock){
            moveRight(this.watergirl);
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.betweenPools) && this.fireCheckpoints.afterWaterPool){
            moveRight(this.watergirl);
            playAudio(this.audioFilepaths.nice_jump);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterWaterPool) && this.fireCheckpoints.firstHigherPlatform && this.watergirl.isOnBlock){
            moveRight(this.watergirl);
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.firstHigherPlatform) && this.fireCheckpoints.beforeAcidPool && this.watergirl.isOnBlock){
            moveLeft(this.watergirl);
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeAcidPool) && this.fireCheckpoints.afterAcidPool && this.watergirl.isOnBlock){
            moveLeft(this.watergirl);
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterAcidPool) && this.fireCheckpoints.beforeLever && this.watergirl.isOnBlock){
            moveLeft(this.watergirl);
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeLever) && this.fireCheckpoints.beforeLeverPlatform && this.watergirl.isOnBlock){
            moveLeft(this.watergirl);
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeLeverPlatform) && this.fireCheckpoints.onLeverPlatform && this.watergirl.isOnBlock && this.yellowLever.pressed){
            moveLeft(this.watergirl);
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.onLeverPlatform) && this.fireCheckpoints.afterLeverPlatform && this.watergirl.isOnBlock){
            moveRight(this.watergirl);
            makeJump(this.watergirl);
            playAudio(this.audioFilepaths.onwards);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterLeverPlatform) && this.fireCheckpoints.onFirstButton){
            moveRight(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.onFirstButton) && this.fireCheckpoints.onButtonPlatform){
            moveRight(this.watergirl);
            playAudio(this.audioFilepaths.wait);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeButtonPlatform) && nearLocation(this.secondPurpleButton.ramp.position, this.secondPurpleButton.ramp.finalPosition)){
            moveRight(this.watergirl);
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.onButtonPlatformLifted)){
            moveLeft(this.watergirl);
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeCube) && this.fireCheckpoints.afterCubeDrop){
            moveLeft(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterCubeDrop) && this.fireCheckpoints.halfwayCubeSliding){
            moveLeft(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.halfwayCubeSliding) && this.fireCheckpoints.beforeCubeJump){
            moveLeft(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeCubeJump) && this.fireCheckpoints.onCube){
            moveLeft(this.watergirl);
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.onCube) && this.fireCheckpoints.afterCubeFire && this.watergirl.isOnBlock){
            moveLeft(this.watergirl);
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterCubeWater) && this.fireCheckpoints.beforeDoors && this.watergirl.isOnBlock){
            moveRight(this.watergirl);
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeDoors)){
            playAudio(this.audioFilepaths.spot_exit);
        }
    }

    checkForLevelStateActions(){
        if (this.fireCheckpoints.beforeLeverPlatform && !this.yellowLever.pressed){
            queueAudioForTimer(this.audioFilepaths.lever_important);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeButtonPlatform) && !this.secondPurpleButton.pressed){
            queueAudioForTimer(this.audioFilepaths.press_button);
        }
        if (this.secondPurpleButton.pressed){
            queueAudioForTimer(this.audioFilepaths.off_button);
        }
    }
}
