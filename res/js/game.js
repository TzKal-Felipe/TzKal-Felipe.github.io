import { Player } from "./player.js";
import { Sprite } from "./sprite.js";
import { levels } from "./collisionBlocks.js";
import { createObjectsFromArray } from "./collisions.js";
import { Diamond } from "./ingameAssets/diamond.js";
import { Button } from "./ingameAssets/button.js";
import { Ramp } from "./ingameAssets/ramp.js";
import { pauseButton, menuButtons, checkButtonCollision } from "./menu/buttons.js";
import {
    getMousePos,
    continueAnimation,
    setContinueAnimation,
    endGame,
    currentLevel,
    gameData,
    setEndGame,
    menuActive,
    setMenuActive,
    setCurrentLevel,
    setAllDiamonds,
    setLevelCompleted,
    allDiamonds,
    menuLevels,
    menuLevelsPath,
    saveDataToLocalStorage,
} from "./helpers.js";
import { drawInGameMenu, drawMenu, checkMenuDiamondsCollision } from "./menu/menus.js";
import { Lever } from "./ingameAssets/lever.js";
import { Cube } from "./ingameAssets/cube.js";
import { Door } from "./ingameAssets/door.js";
import { quests } from "./menu/quests.js";
import { drawTime, formatTime, levelTime } from "./time.js";
import { Bridge } from "./ingameAssets/bridge.js";
import { Ball } from "./ingameAssets/ball.js";
import { AudioManager } from "./audio.js";

let bgBlocks, died, menuButtonPressed, pauseGame, collisionBlocks, ponds;

let allAssets = [];
let allPlayers = [];
let allButtons = [];
let allLevers = [];
let allCubes = [];
let allDoors = [];
let allBridges = [];
let allBalls = [];

let startedTime;
let pausedTime = 0;
let pausedStartTime;

const background = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imgSrc: `./res/img/maps/bg.png`,
});

const fireboy = 0;
const watergirl = 1;
const timedAudioDelay = 5;
const oneSecond = 1000;
let fireX;
let waterX;
let audioManager = new AudioManager();
let timer = 0;

const interval = setInterval(() => {
    timer++;

    if (timer === timedAudioDelay){
        audioManager.playAudio();
        timer = 0;
    }
}, oneSecond);

function nearLocation(currentPos, targetPos, thresholdX = 20, thresholdY = 70){
    return (
        Math.abs(currentPos.x - targetPos.x) <= thresholdX &&
        Math.abs(currentPos.y - targetPos.y) <= thresholdY
    );
}

function restartTimer(){
    timer = 0;
}

function moveRight(player){
    player.keys.pressed.right = true;
}

function moveLeft(player){
    player.keys.pressed.left = true;
}

function stopMoving(player){
    player.keys.pressed.left = false;
    player.keys.pressed.right = false;
}

function makeJump(player){
    player.velocity.y = -4.35;
    player.keys.pressed.up = true;
                    
    setTimeout(() => {
        player.keys.pressed.up = false;
    }, 300);
}

function startGame() {
    died = false;
    menuButtonPressed = null;
    pauseGame = false;

    allAssets = [];
    allPlayers = [];
    setAllDiamonds([]);
    allButtons = [];
    allLevers = [];
    allCubes = [];
    allDoors = [];
    allBridges = [];
    allBalls = [];

    setLevelCompleted(false);

    startedTime = Date.now();
    pausedTime = 0;

    const values = createObjectsFromArray(levels[currentLevel]);
    collisionBlocks = values.objects;
    ponds = values.ponds;

    bgBlocks = new Sprite({
        position: {
            x: 0,
            y: 0,
        },
        imgSrc: `./res/img/maps/level${currentLevel}.png`,
    });

    //diamonds
    gameData.diamonds[currentLevel].forEach((diamond) => {
        allDiamonds.push(
            new Diamond({
                position: diamond.position,
                type: diamond.type,
            })
        );
    });

    //buttons
    if (gameData.buttons[currentLevel]) {
        gameData.buttons[currentLevel].forEach((buttonGroup) => {
            const color = buttonGroup.ramp.color;
            const finalColor = buttonGroup.ramp.finalColor;

            const ramp = new Ramp({
                position: { ...buttonGroup.ramp.position },
                boxCount: buttonGroup.ramp.boxCount,
                color,
                finalColor,
                finalPosition: buttonGroup.ramp.finalPosition,
                rotated: buttonGroup.ramp.rotated,
            });
            allAssets.push(ramp);

            let groupButtons = [];

            buttonGroup.buttons.forEach((button) => {
                const newButton = new Button({
                    position: { ...button.position },
                    color,
                    finalColor,
                    ramp,
                });
                groupButtons.push(newButton);
                allAssets.push(newButton);
            });
            allButtons.push(groupButtons);
        });
    }

    //levers
    if (gameData.levers[currentLevel]) {
        gameData.levers[currentLevel].forEach((leverGroup) => {
            const color = leverGroup.ramp.color;
            const finalColor = leverGroup.ramp.finalColor;

            const ramp = new Ramp({
                position: { ...leverGroup.ramp.position },
                boxCount: leverGroup.ramp.boxCount,
                color,
                finalColor,
                finalPosition: leverGroup.ramp.finalPosition,
                rotated: leverGroup.ramp.rotated,
            });
            allAssets.push(ramp);

            const lever = new Lever({
                position: leverGroup.lever.position,
                color,
                finalColor,
                ramp,
            });
            allLevers.push(lever);
            allAssets.push(lever);
        });
    }

    //cubes
    if (gameData.cubes[currentLevel]) {
        gameData.cubes[currentLevel].forEach((cube) => {
            const newCube = new Cube({
                position: { ...cube.position },
                collisionBlocks,
                allAssets,
                players: allPlayers,
            });
            allCubes.push(newCube);
            allAssets.push(newCube);
        });
    }

    //bridges
    if (gameData.bridges[currentLevel]) {
        gameData.bridges[currentLevel].forEach((bridge) => {
            const newBridge = new Bridge({
                position: { ...bridge.position },
                chainsCount: bridge.chainsCount,
            });

            allBridges.push(newBridge);
            allAssets.push(newBridge);
        });
    }

    //balls
    if (gameData.balls[currentLevel]) {
        gameData.balls[currentLevel].forEach((ball) => {
            const newBall = new Ball({
                position: { ...ball.position },
                collisionBlocks,
                allAssets,
                allPlayers,
            });

            allBalls.push(newBall);
            allAssets.push(newBall);
        });
    }

    //doors
    gameData.doors[currentLevel].forEach((door) => {
        const newDoor = new Door({
            position: door.position,
            element: door.element,
        });
        allDoors.push(newDoor);
    });

    //players
    for (const player in gameData.players) {
        const currentPlayer = gameData.players[player];

        allPlayers.push(
            new Player({
                position: { ...currentPlayer[currentLevel].position },
                collisionBlocks,
                allAssets,
                diamonds: allDiamonds,
                doors: allDoors,
                imgSrc: currentPlayer.constants.imgSrc,
                element: currentPlayer.constants.element,
                frameRate: 1,
                frameDelay: 4,
                imgRows: 4,
                currentRow: 1,
                keys: {
                    up: currentPlayer.constants.keys.up,
                    left: currentPlayer.constants.keys.left,
                    right: currentPlayer.constants.keys.right,
                    pressed: {
                        up: false,
                        left: false,
                        right: false,
                    },
                },
                animations: {
                    idle: {
                        currentRow: 1,
                        frameRate: 1,
                    },
                    left: {
                        currentRow: 2,
                        frameRate: 8,
                        flipImage: true,
                    },
                    right: {
                        currentRow: 2,
                        frameRate: 8,
                    },
                    up: {
                        currentRow: 3,
                        frameRate: 1,
                    },
                    down: {
                        currentRow: 4,
                        frameRate: 1,
                    },
                },
                legs: new Sprite({
                    position: {
                        x: currentPlayer[currentLevel].position.x + 37,
                        y: currentPlayer[currentLevel].position.y + 72,
                    },
                    imgSrc: currentPlayer.constants.legsImgSrc,
                    imgRows: 2,
                    currentRow: 1,
                    frameRate: 1,
                    frameDelay: 4,
                    animations: {
                        idle: {
                            currentRow: 1,
                            frameRate: 1,
                        },
                        left: {
                            currentRow: 2,
                            flipImage: true,
                            frameRate: 8,
                        },
                        right: {
                            currentRow: 2,
                            frameRate: 8,
                        },
                    },
                }),
            })
        );
    }

    fireX = allPlayers[fireboy].observableX;
    waterX = allPlayers[watergirl].observableX;

    let checkpoints = {
        fireboy: {
            level1: {
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
            }
        },
        watergirl: {
            level1: {
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
            }
        } 
    };

    let coords = {
        level1: {
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
        }
    };

    let audioFilepaths = {
        you_got_it: "res/js/audio/you_got_it.wav",
        lava_ahead: "res/js/audio/lava_ahead.wav",
        made_jump: "res/js/audio/made_jump.wav",
        nice_jump: "res/js/audio/nice_jump.wav",
        up_we_go: "res/js/audio/up_we_go.wav",
        acid_ahead: "res/js/audio/acid_ahead.wav",
        acid_not_scary: "res/js/audio/acid_not_scary.wav",
        lever_does: "res/js/audio/lever_does.wav",
        doing_great: "res/js/audio/doing_great.wav",
        onwards: "res/js/audio/onwards.wav",
        button_push: "res/js/audio/button_push.wav",
        wait: "res/js/audio/wait.wav",
        keep_button_pressed: "res/js/audio/keep_button_pressed.wav",
        block_strong: "res/js/audio/block_strong.wav",
        finish_line: "res/js/audio/finish_line.wav",
        diamonds: "res/js/audio/diamonds.wav",
        spot_exit: "res/js/audio/spot_exit.wav",
        teamwork: "res/js/audio/teamwork.wav",
        keep_going: "res/js/audio/keep_going.wav",
        arrow_keys: "res/js/audio/arrow_keys.wav"
    };

    if (currentLevel == 1){
        audioManager.changeAudioFile(audioFilepaths.arrow_keys);
    }

    fireX.onChange(() => {
        if (currentLevel == 1){
            // Fireboy checkpoints
            if (nearLocation(allPlayers[fireboy].position, coords.level1.beforeEncloseExitFire)){
                checkpoints.fireboy.level1.beforeEncloseExitFire = true;
            }
            if (nearLocation(allPlayers[fireboy].position, coords.level1.beforeFirePool)){
                checkpoints.fireboy.level1.beforeFirePool = true;
            }
            if (nearLocation(allPlayers[fireboy].position, coords.level1.betweenPools)){
                checkpoints.fireboy.level1.betweenPools = true;
            }
            if (nearLocation(allPlayers[fireboy].position, coords.level1.afterWaterPool)){
                checkpoints.fireboy.level1.afterWaterPool = true;
            }
            if (nearLocation(allPlayers[fireboy].position, coords.level1.firstHigherPlatform)){
                checkpoints.fireboy.level1.firstHigherPlatform = true;
            }
            if (nearLocation(allPlayers[fireboy].position, coords.level1.beforeAcidPool)){
                checkpoints.fireboy.level1.beforeAcidPool = true;
            }
            if (nearLocation(allPlayers[fireboy].position, coords.level1.afterAcidPool)){
                checkpoints.fireboy.level1.afterAcidPool = true;
            }
            if (nearLocation(allPlayers[fireboy].position, coords.level1.beforeLever)){
                checkpoints.fireboy.level1.beforeLever = true;
            }
            if (nearLocation(allPlayers[fireboy].position, coords.level1.beforeLeverPlatform)){
                checkpoints.fireboy.level1.beforeLeverPlatform = true;
            }
            if (nearLocation(allPlayers[fireboy].position, coords.level1.onLeverPlatform)){
                checkpoints.fireboy.level1.onLeverPlatform = true;
            }
            if (nearLocation(allPlayers[fireboy].position, coords.level1.afterLeverPlatform)){
                checkpoints.fireboy.level1.afterLeverPlatform = true;
            }
            if (nearLocation(allPlayers[fireboy].position, coords.level1.onFirstButton)){
                checkpoints.fireboy.level1.onFirstButton = true;
            }
            if (nearLocation(allPlayers[fireboy].position, coords.level1.onButtonPlatformLowered)){
                checkpoints.fireboy.level1.onButtonPlatform = true;
            }
            if (nearLocation(allPlayers[fireboy].position, coords.level1.afterCubeDrop)){
                checkpoints.fireboy.level1.afterCubeDrop = true;
            }
            if (nearLocation(allPlayers[fireboy].position, coords.level1.halfwayCubeSliding)){
                checkpoints.fireboy.level1.halfwayCubeSliding = true;
            }
            if (nearLocation(allPlayers[fireboy].position, coords.level1.beforeCubeJump)){
                checkpoints.fireboy.level1.beforeCubeJump = true;
            }
            if (nearLocation(allPlayers[fireboy].position, coords.level1.onCube)){
                checkpoints.fireboy.level1.onCube = true;
            }
            if (nearLocation(allPlayers[fireboy].position, coords.level1.afterCubeFire)){
                checkpoints.fireboy.level1.afterCubeFire = true;
            }
            if (nearLocation(allPlayers[fireboy].position, coords.level1.beforeDoors)){
                checkpoints.fireboy.level1.beforeDoors = true;
            }

            // Watergirl movement
            if (nearLocation(allPlayers[watergirl].position, coords.level1.startWater) && checkpoints.fireboy.level1.beforeEncloseExitFire){
                moveRight(allPlayers[watergirl]);
                audioManager.changeAudioFile(audioFilepaths.you_got_it);
                audioManager.playAudio();
                audioManager.changeAudioFile(audioFilepaths.keep_going);
            }
            if (nearLocation(allPlayers[watergirl].position, coords.level1.beforeEncloseExitWater) && checkpoints.fireboy.level1.beforeFirePool){
                moveRight(allPlayers[watergirl]);
            }
            if (nearLocation(allPlayers[watergirl].position, coords.level1.beforeFirePool) && checkpoints.fireboy.level1.betweenPools && allPlayers[watergirl].isOnBlock){
                moveRight(allPlayers[watergirl]);
                makeJump(allPlayers[watergirl]);
            }
            if (nearLocation(allPlayers[watergirl].position, coords.level1.betweenPools) && checkpoints.fireboy.level1.afterWaterPool){
                moveRight(allPlayers[watergirl]);
                audioManager.changeAudioFile(audioFilepaths.nice_jump);
                audioManager.playAudio();
                audioManager.changeAudioFile(audioFilepaths.keep_going);
            }
            if (nearLocation(allPlayers[watergirl].position, coords.level1.afterWaterPool) && checkpoints.fireboy.level1.firstHigherPlatform && allPlayers[watergirl].isOnBlock){
                moveRight(allPlayers[watergirl]);
                makeJump(allPlayers[watergirl]);
            }
            if (nearLocation(allPlayers[watergirl].position, coords.level1.firstHigherPlatform) && checkpoints.fireboy.level1.beforeAcidPool && allPlayers[watergirl].isOnBlock){
                moveLeft(allPlayers[watergirl]);
                makeJump(allPlayers[watergirl]);
            }
            if (nearLocation(allPlayers[watergirl].position, coords.level1.beforeAcidPool) && checkpoints.fireboy.level1.afterAcidPool && allPlayers[watergirl].isOnBlock){
                moveLeft(allPlayers[watergirl]);
                makeJump(allPlayers[watergirl]);
            }
            if (nearLocation(allPlayers[watergirl].position, coords.level1.afterAcidPool) && checkpoints.fireboy.level1.beforeLever && allPlayers[watergirl].isOnBlock){
                moveLeft(allPlayers[watergirl]);
                makeJump(allPlayers[watergirl]);
            }
            if (nearLocation(allPlayers[watergirl].position, coords.level1.beforeLever) && checkpoints.fireboy.level1.beforeLeverPlatform && allPlayers[watergirl].isOnBlock){
                moveLeft(allPlayers[watergirl]);
                makeJump(allPlayers[watergirl]);
            }
            if (nearLocation(allPlayers[watergirl].position, coords.level1.beforeLeverPlatform) && checkpoints.fireboy.level1.onLeverPlatform && allPlayers[watergirl].isOnBlock && allLevers[0].pressed){
                moveLeft(allPlayers[watergirl]);
                makeJump(allPlayers[watergirl]);
            }
            if (nearLocation(allPlayers[watergirl].position, coords.level1.onLeverPlatform) && checkpoints.fireboy.level1.afterLeverPlatform && allPlayers[watergirl].isOnBlock){
                moveRight(allPlayers[watergirl]);
                makeJump(allPlayers[watergirl]);
                audioManager.changeAudioFile(audioFilepaths.onwards);
                audioManager.playAudio();
                audioManager.changeAudioFile(audioFilepaths.keep_going);
            }
            if (nearLocation(allPlayers[watergirl].position, coords.level1.afterLeverPlatform) && checkpoints.fireboy.level1.onFirstButton){
                moveRight(allPlayers[watergirl]);
            }
            if (nearLocation(allPlayers[watergirl].position, coords.level1.onFirstButton) && checkpoints.fireboy.level1.onButtonPlatform){
                moveRight(allPlayers[watergirl]);
                audioManager.changeAudioFile(audioFilepaths.wait);
                audioManager.playAudio();
                audioManager.changeAudioFile(audioFilepaths.keep_going);
            }
            if (nearLocation(allPlayers[watergirl].position, coords.level1.beforeButtonPlatform) && nearLocation(allButtons[0][1].ramp.position, allButtons[0][1].ramp.finalPosition)){
                moveRight(allPlayers[watergirl]);
                makeJump(allPlayers[watergirl]);
            }
            if (nearLocation(allPlayers[watergirl].position, coords.level1.onButtonPlatformLifted)){
                moveLeft(allPlayers[watergirl]);
                makeJump(allPlayers[watergirl]);
            }
            if (nearLocation(allPlayers[watergirl].position, coords.level1.beforeCube) && checkpoints.fireboy.level1.afterCubeDrop){
                moveLeft(allPlayers[watergirl]);
            }
            if (nearLocation(allPlayers[watergirl].position, coords.level1.afterCubeDrop) && checkpoints.fireboy.level1.halfwayCubeSliding){
                moveLeft(allPlayers[watergirl]);
            }
            if (nearLocation(allPlayers[watergirl].position, coords.level1.halfwayCubeSliding) && checkpoints.fireboy.level1.beforeCubeJump){
                moveLeft(allPlayers[watergirl]);
            }
            if (nearLocation(allPlayers[watergirl].position, coords.level1.beforeCubeJump) && checkpoints.fireboy.level1.onCube){
                moveLeft(allPlayers[watergirl]);
                makeJump(allPlayers[watergirl]);
            }
            if (nearLocation(allPlayers[watergirl].position, coords.level1.onCube) && checkpoints.fireboy.level1.afterCubeFire && allPlayers[watergirl].isOnBlock){
                moveLeft(allPlayers[watergirl]);
                makeJump(allPlayers[watergirl]);
            }
            if (nearLocation(allPlayers[watergirl].position, coords.level1.afterCubeWater) && checkpoints.fireboy.level1.beforeDoors && allPlayers[watergirl].isOnBlock){
                moveRight(allPlayers[watergirl]);
                makeJump(allPlayers[watergirl]);
            }
            if (nearLocation(allPlayers[watergirl].position, coords.level1.beforeDoors)){
                audioManager.changeAudioFile(audioFilepaths.spot_exit);
                audioManager.playAudio();
                audioManager.changeAudioFile(audioFilepaths.keep_going);
            }
        }
    });

    waterX.onChange(() => { 
        if (currentLevel == 1){
            // Stop watergirl movement
            if (nearLocation(allPlayers[watergirl].position, coords.level1.beforeEncloseExitWater) && !checkpoints.watergirl.level1.beforeEncloseExitWater){
                stopMoving(allPlayers[watergirl]);
                checkpoints.watergirl.level1.beforeEncloseExitWater = true;
            }
            if (nearLocation(allPlayers[watergirl].position, coords.level1.beforeFirePool) && !checkpoints.watergirl.level1.beforeFirePool){
                stopMoving(allPlayers[watergirl]);
                checkpoints.watergirl.level1.beforeFirePool = true;
                audioManager.changeAudioFile(audioFilepaths.lava_ahead);
                audioManager.playAudio();
                audioManager.changeAudioFile(audioFilepaths.keep_going);
            }
            if (nearLocation(allPlayers[watergirl].position, coords.level1.betweenPools) && !checkpoints.watergirl.level1.betweenPools){
                stopMoving(allPlayers[watergirl]);
                checkpoints.watergirl.level1.betweenPools = true;
                audioManager.changeAudioFile(audioFilepaths.made_jump);
                audioManager.playAudio();
                audioManager.changeAudioFile(audioFilepaths.keep_going);
            }
            if (nearLocation(allPlayers[watergirl].position, coords.level1.afterWaterPool) && !checkpoints.watergirl.level1.afterWaterPool){
                stopMoving(allPlayers[watergirl]);
                checkpoints.watergirl.level1.afterWaterPool = true;
            }
            if (nearLocation(allPlayers[watergirl].position, coords.level1.firstHigherPlatform) && !checkpoints.watergirl.level1.firstHigherPlatform){
                stopMoving(allPlayers[watergirl]);
                checkpoints.watergirl.level1.firstHigherPlatform = true;
                audioManager.changeAudioFile(audioFilepaths.up_we_go);
                audioManager.playAudio();
                audioManager.changeAudioFile(audioFilepaths.keep_going);
            }
            if (nearLocation(allPlayers[watergirl].position, coords.level1.beforeAcidPool) && !checkpoints.watergirl.level1.beforeAcidPool){
                stopMoving(allPlayers[watergirl]);
                checkpoints.watergirl.level1.beforeAcidPool = true;
                audioManager.changeAudioFile(audioFilepaths.acid_ahead);
                audioManager.playAudio();
                audioManager.changeAudioFile(audioFilepaths.keep_going);
            }
            if (nearLocation(allPlayers[watergirl].position, coords.level1.afterAcidPool) && !checkpoints.watergirl.level1.afterAcidPool){
                stopMoving(allPlayers[watergirl]);
                checkpoints.watergirl.level1.afterAcidPool = true;
                audioManager.changeAudioFile(audioFilepaths.acid_not_scary);
                audioManager.playAudio();
                audioManager.changeAudioFile(audioFilepaths.keep_going);
            }
            if (nearLocation(allPlayers[watergirl].position, coords.level1.beforeLever) && !checkpoints.watergirl.level1.beforeLever){
                stopMoving(allPlayers[watergirl]);
                checkpoints.watergirl.level1.beforeLever = true;
                audioManager.changeAudioFile(audioFilepaths.lever_does);
                audioManager.playAudio();
                audioManager.changeAudioFile(audioFilepaths.keep_going);
            }
            if (nearLocation(allPlayers[watergirl].position, coords.level1.beforeLeverPlatform) && !checkpoints.watergirl.level1.beforeLeverPlatform){
                stopMoving(allPlayers[watergirl]);
                checkpoints.watergirl.level1.beforeLeverPlatform = true;
            }
            if (nearLocation(allPlayers[watergirl].position, coords.level1.onLeverPlatform) && !checkpoints.watergirl.level1.onLeverPlatform){
                stopMoving(allPlayers[watergirl]);
                checkpoints.watergirl.level1.onLeverPlatform = true;
            }
            if (nearLocation(allPlayers[watergirl].position, coords.level1.afterLeverPlatform) && !checkpoints.watergirl.level1.afterLeverPlatform){
                stopMoving(allPlayers[watergirl]);
                checkpoints.watergirl.level1.afterLeverPlatform = true;
            }
            if (nearLocation(allPlayers[watergirl].position, coords.level1.onFirstButton) && !checkpoints.watergirl.level1.onFirstButton){
                stopMoving(allPlayers[watergirl]);
                checkpoints.watergirl.level1.onFirstButton = true;
                audioManager.changeAudioFile(audioFilepaths.button_push);
                audioManager.playAudio();
                audioManager.changeAudioFile(audioFilepaths.keep_going);
            }
            if (nearLocation(allPlayers[watergirl].position, coords.level1.beforeButtonPlatform) && !checkpoints.watergirl.level1.beforeButtonPlatform){
                stopMoving(allPlayers[watergirl]);
                checkpoints.watergirl.level1.beforeButtonPlatform = true;
                audioManager.changeAudioFile(audioFilepaths.keep_button_pressed);
                audioManager.playAudio();
                audioManager.changeAudioFile(audioFilepaths.keep_going);
            }
            if (nearLocation(allPlayers[watergirl].position, coords.level1.onButtonPlatformLowered) && !checkpoints.watergirl.level1.onButtonPlatform){
                stopMoving(allPlayers[watergirl]);
                checkpoints.watergirl.level1.onButtonPlatform = true;
            }
            if (nearLocation(allPlayers[watergirl].position, coords.level1.beforeCube) && !checkpoints.watergirl.level1.beforeCube){
                stopMoving(allPlayers[watergirl]);
                checkpoints.watergirl.level1.beforeCube = true;
                audioManager.changeAudioFile(audioFilepaths.block_strong);
                audioManager.playAudio();
                audioManager.changeAudioFile(audioFilepaths.keep_going);
            }
            if (nearLocation(allPlayers[watergirl].position, coords.level1.afterCubeDrop) && !checkpoints.watergirl.level1.afterCubeDrop){
                stopMoving(allPlayers[watergirl]);
                checkpoints.watergirl.level1.afterCubeDrop = true;
            }
            if (nearLocation(allPlayers[watergirl].position, coords.level1.halfwayCubeSliding) && !checkpoints.watergirl.level1.halfwayCubeSliding){
                stopMoving(allPlayers[watergirl]);
                checkpoints.watergirl.level1.halfwayCubeSliding = true;
                audioManager.changeAudioFile(audioFilepaths.finish_line);
                audioManager.playAudio();
                audioManager.changeAudioFile(audioFilepaths.keep_going);
            }
            if (nearLocation(allPlayers[watergirl].position, coords.level1.beforeCubeJump) && !checkpoints.watergirl.level1.beforeCubeJump){
                stopMoving(allPlayers[watergirl]);
                checkpoints.watergirl.level1.beforeCubeJump = true;
            }
            if (nearLocation(allPlayers[watergirl].position, coords.level1.onCube) && !checkpoints.watergirl.level1.onCube){
                stopMoving(allPlayers[watergirl]);
                checkpoints.watergirl.level1.onCube = true;
            }
            if (nearLocation(allPlayers[watergirl].position, coords.level1.afterCubeWater) && !checkpoints.watergirl.level1.afterCubeWater){
                stopMoving(allPlayers[watergirl]);
                checkpoints.watergirl.level1.afterCubeWater = true;
                audioManager.changeAudioFile(audioFilepaths.diamonds);
                audioManager.playAudio();
                audioManager.changeAudioFile(audioFilepaths.keep_going);
            }
            if (nearLocation(allPlayers[watergirl].position, coords.level1.doorWater)){
                stopMoving(allPlayers[watergirl]);
                audioManager.changeAudioFile(audioFilepaths.teamwork);
                audioManager.playAudio();
            }
        }
    });

    for (let player in checkpoints){
        for (let level in checkpoints[player]){
            for (let point in checkpoints[player][level]){
                checkpoints[player][level][point] = false;
            }
        }
    }
}

function playGame() {
    drawMenu();

    let now;
    let delta;
    let fixedFps = 60;
    let interval = 1000 / fixedFps;
    let then = Date.now();

    let time;

    function animation() {
        now = Date.now();
        delta = now - then;

        if (delta > interval) {
            then = now - (delta % interval);

            background.draw();

            allPlayers.forEach((player) => {
                player.checkDiamonds();
            });

            allDiamonds.forEach((diamond) => {
                diamond.draw();
            });

            for (const buttons of allButtons) {
                let movedRamp = false;
                for (const button of buttons) {
                    if (button.pressed) {
                        if (button.position.y == button.finalPosition.y) {
                            let standingOnButton = false;
                            allPlayers.forEach((player) => {
                                if (button.checkStandingOnButton(player, player.hitbox.legs)) {
                                    standingOnButton = true;
                                }
                            });
                            allCubes.forEach((cube) => {
                                if (button.checkStandingOnButton(cube, cube.hitbox)) {
                                    standingOnButton = true;
                                }
                            });
                            allBalls.forEach((ball) => {
                                if (button.checkStandingOnButton(ball, ball.hitbox)) {
                                    standingOnButton = true;
                                }
                            });
                            if (!standingOnButton) {
                                button.pressed = false;
                                button.move("up");
                            }
                        } else {
                            button.move("down");
                        }
                    } else {
                        if (button.position.y != button.startPosition.y) {
                            button.move("up");
                        }
                    }

                    button.fillColor();
                    button.draw();
                    if (button.pressed && !movedRamp) {
                        movedRamp = true;
                        button.run();
                    }
                }
                if (!movedRamp) {
                    buttons[0].run();
                }
            }

            allCubes.forEach((cube) => {
                cube.draw();
                cube.update();
                if (cube.rampBlocked) {
                    allAssets.forEach((asset) => {
                        if (
                            asset.hitbox.position.y ==
                            Math.round(cube.hitbox.position.y + cube.hitbox.height)
                        ) {
                            asset.blocked = true;
                            asset.blockedDirection = "up";
                        }
                    });
                }
            });

            allLevers.forEach((lever) => {
                lever.run();
            });

            allDoors.forEach((door) => {
                door.draw();
                door.pressed = false;
            });

            allBalls.forEach((ball) => {
                ball.draw();
                ball.update();
            });

            allBridges.forEach((bridge) => {
                bridge.drawChain();
                bridge.draw();
            });

            bgBlocks.draw();
            // collisionBlocks.forEach((collisionBlock) => {
            //     collisionBlock.draw();
            // });

            allLevers.forEach((lever) => {
                lever.checkAngle();
                lever.drawLever();
            });

            allPlayers.forEach((player) => {
                if (player.keys.pressed.left) {
                    player.velocity.x = -2.5;
                    player.changeSprite("left");
                } else if (player.keys.pressed.right) {
                    player.velocity.x = 2.5;
                    player.changeSprite("right");
                } else {
                    player.velocity.x = 0;
                    if (player.velocity.y < -1.5) {
                        player.changeSprite("up");
                    } else if (player.velocity.y > 1.5) {
                        player.changeSprite("down");
                    } else {
                        player.changeSprite("idle");
                    }
                }

                player.draw();
                player.legs.draw();
                player.update();

                if (player.rampBlocked) {
                    allAssets.forEach((asset) => {
                        if (
                            asset.hitbox.position.y ==
                            Math.round(player.hitbox.position.y + player.hitbox.height)
                        ) {
                            asset.blocked = true;
                            asset.blockedDirection = "up";
                        }
                    });
                }

                player.checkDoors();

                if (player.died) {
                    died = true;
                }
            });

            ponds.forEach((pond) => {
                pond.draw();
            });

            //time calc
            time = now - startedTime - pausedTime;
            const formatedTime = formatTime(time);
            drawTime(formatedTime.minutes, formatedTime.seconds);

            //both doors opened
            if (allDoors[0].opened == true && allDoors[1].opened == true) {
                setLevelCompleted(true);
                levelTime.minutes = formatedTime.minutes;
                levelTime.seconds = formatedTime.seconds;
                playersDissapearing();
                return;
            }

            pauseButton.draw();

            if (died) {
                setMenuActive("lost");
                drawMenuAnimation(menuActive, "up");
                return;
            } else if (pauseGame) {
                setMenuActive("paused");
                drawMenuAnimation(menuActive, "up");
                return;
            }
        }
        requestAnimationFrame(animation);
    }

    function drawAll() {
        background.draw();
        allDiamonds.forEach((diamond) => {
            diamond.draw();
        });
        allButtons.forEach((buttonGroup) => {
            buttonGroup.forEach((button) => {
                button.fillColor();
                button.draw();
                button.ramp.draw(button.pressed);
            });
        });
        allCubes.forEach((cube) => {
            cube.draw();
        });
        allLevers.forEach((lever) => {
            lever.ramp.draw();
        });
        allBridges.forEach((bridge) => {
            bridge.drawChain();
            bridge.draw();
        });
        allDoors.forEach((door) => {
            door.draw();
        });
        allBalls.forEach((ball) => {
            ball.draw();
        });
        bgBlocks.draw();
        // collisionBlocks.forEach((collisionBlock) => {
        //     collisionBlock.draw();
        // });
        allLevers.forEach((lever) => {
            lever.drawLever();
        });
        allPlayers.forEach((player) => {
            player.draw();
            player.legs.draw();
        });
        ponds.forEach((pond) => {
            pond.draw();
        });
        const formatedTime = formatTime(time);
        drawTime(formatedTime.minutes, formatedTime.seconds);
        pauseButton.draw();
    }

    function playersDissapearing() {
        let opacity = 1;
        const dissapearing = setInterval(() => {
            opacity -= 0.05;
            if (opacity <= 0) {
                opacity = 0;
                clearInterval(dissapearing);

                let questCount = 0;
                menuLevels[currentLevel].quests.forEach((quest) => {
                    quest.setVariable();
                    quest.check();
                    if (quest.completed) {
                        if (menuLevels[currentLevel].quests.length == 1) {
                            questCount += 2;
                        } else {
                            questCount++;
                        }
                    }
                });
                if (questCount > menuLevels[currentLevel].questsStatus) {
                    menuLevels[currentLevel].setQuestsStatus(questCount);
                }

                menuLevels[currentLevel].levelsUnlocking.forEach((index) => {
                    menuLevels[index].unlocked = true;
                });
                menuLevels[currentLevel].pathUnlocking.forEach((index) => {
                    menuLevelsPath[index].unlocked = true;
                });

                saveDataToLocalStorage();

                setMenuActive("won");
                drawMenuAnimation(menuActive, "up");
            }
            allDoors.forEach((door) => {
                door.draw();
            });
            allPlayers.forEach((player) => {
                player.opacity = opacity;
                player.draw();
                player.legs.opacity = opacity;
                player.legs.draw();
            });
        }, 50);
    }

    function drawMenuAnimation(menuName, direction) {
        let transform = 1000;
        let value = 10;
        if (direction == "down") {
            transform = 0;
            value = -10;
        }
        const endTransform = Math.abs(transform - 1000);

        const menuAnimation = setInterval(() => {
            drawAll();

            transform -= value;
            drawInGameMenu(menuName, transform);
            if (transform == endTransform) {
                clearInterval(menuAnimation);
                if (direction == "down") {
                    animation();
                    setContinueAnimation(false);
                }
            }
        }, 1);
    }

    canvas.onmousedown = (event) => {
        if (menuButtonPressed) return;

        const mousePos = getMousePos(event);

        for (const menuButton in menuButtons[menuActive]) {
            if (checkButtonCollision(mousePos, menuButtons[menuActive][menuButton])) {
                menuButtonPressed = menuButton;
                menuButtons[menuActive][menuButton].scaleDown();
                menuButtons[menuActive][menuButton].draw();
            }
        }
    };

    canvas.onmouseup = (event) => {
        const mousePos = getMousePos(event);

        if (!menuActive) {
            if (checkButtonCollision(mousePos, pauseButton)) {
                pauseGame = true;
                allPlayers.forEach((player) => {
                    for (const key in player.keys.pressed) {
                        player.keys.pressed[key] = false;
                    }
                });
                pausedStartTime = Date.now();
            }
            return;
        }

        if (menuActive == "mainMenu") {
            for (const index in menuLevels) {
                if (checkMenuDiamondsCollision(mousePos, menuLevels[index])) {
                    setCurrentLevel(index);
                    setMenuActive(null);
                    startGame();
                    animation();
                }
            }
        }

        for (const menuButton in menuButtons[menuActive]) {
            if (
                checkButtonCollision(mousePos, menuButtons[menuActive][menuButton]) &&
                menuButtonPressed == menuButton
            ) {
                menuButtons[menuActive][menuButton].resetSize();
                menuButtons[menuActive][menuButton].draw();

                setTimeout(() => {
                    if (!menuActive) return;

                    menuButtons[menuActive][menuButton].run();
                    pauseGame = false;

                    if (continueAnimation) {
                        drawMenuAnimation(menuActive, "down");
                        pausedTime += Date.now() - pausedStartTime;
                    }
                    if (endGame) {
                        setEndGame(false);
                        startGame();
                        animation();
                    }
                    if (menuActive != "mainMenu") {
                        setMenuActive(null);
                    }
                    menuButtonPressed = null;
                }, 200);
                return;
            }
        }

        if (menuButtonPressed) {
            menuButtons[menuActive][menuButtonPressed].resetSize();
            menuButtons[menuActive][menuButtonPressed].draw();
            menuButtonPressed = null;
        }
    };

    window.addEventListener("keydown", (event) => {
        if (pauseGame) return;
        allPlayers.forEach((player) => {
            if (player === allPlayers[fireboy]){
                switch (event.key) {
                    case player.keys.up:
                        if (player.isOnBlock && !player.keys.pressed.up && !player.rampBlocked) {
                            player.velocity.y = -4.35;
                            player.keys.pressed.up = true;
                        }
                        break;
                    case player.keys.left:
                        player.keys.pressed.left = true;
                        break;
                    case player.keys.right:
                        player.keys.pressed.right = true;
                        break;
                    case " ":
                        console.log(player.position);
                }
            }
        });
    });

    window.addEventListener("keyup", (event) => {
        if (pauseGame) return;

        allPlayers.forEach((player) => {
            switch (event.key) {
                case player.keys.up:
                    player.keys.pressed.up = false;
                    break;
                case player.keys.left:
                    player.keys.pressed.left = false;
                    break;
                case player.keys.right:
                    player.keys.pressed.right = false;
                    break;
            }
        });
    });

    document.addEventListener("visibilitychange", () => {
        allPlayers.forEach((player) => {
            for (const key in player.keys.pressed) {
                player.keys.pressed[key] = false;
            }
        });
    });

    document.addEventListener("contextmenu", () => {
        allPlayers.forEach((player) => {
            for (const key in player.keys.pressed) {
                player.keys.pressed[key] = false;
            }
        });
    });
}

export { playGame };
