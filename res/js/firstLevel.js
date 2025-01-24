import { 
    nearLocation,
    restartTimer,
    moveRight,
    moveLeft,
    stopMoving,
    makeJump,
    playAudio,
    queueAudioForTimer
} from "./helperFunctions.js";

export class FirstLevelManager {
    constructor(fireboy, watergirl, audioFilepaths){
        this.fireboy = fireboy;
        this.watergirl = watergirl;
        this.audioFilepaths = audioFilepaths;
        
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

    markWatergirlCheckpoints(){
        
    }

    checkForWatergirlMovement(){
        
    }

    checkForWatergirlStops(){
        
    }

    checkForLevelStateActions(){
        
    }
}
