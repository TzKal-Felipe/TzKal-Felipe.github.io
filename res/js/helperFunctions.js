export function nearLocation(currentPos, targetPos, thresholdX = 20, thresholdY = 70){
    return (
        Math.abs(currentPos.x - targetPos.x) <= thresholdX &&
        Math.abs(currentPos.y - targetPos.y) <= thresholdY
    );
}

export function moveRight(player){
    player.keys.pressed.right = true;
}

export function moveLeft(player){
    player.keys.pressed.left = true;
}

export function stopMoving(player){
    player.keys.pressed.left = false;
    player.keys.pressed.right = false;
}

export function makeJump(player){
    player.velocity.y = -4.35;
    player.keys.pressed.up = true;
                    
    setTimeout(() => {
        player.keys.pressed.up = false;
    }, 300);
}
