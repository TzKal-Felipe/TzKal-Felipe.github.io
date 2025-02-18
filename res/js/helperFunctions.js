function nearLocation(currentPos, targetPos, thresholdX = 20, thresholdY = 70){
    return (
        Math.abs(currentPos.x - targetPos.x) <= thresholdX &&
        Math.abs(currentPos.y - targetPos.y) <= thresholdY
    );
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

function buildAudioPath(audiofile, voice_type){
    return `res/js/audio/${voice_type}/${audiofile}`
}

function drawAudioDropdown(){
    // Create the dropdown container
    let dropdownContainer = document.createElement("div");
    dropdownContainer.style.position = "relative";
    dropdownContainer.style.display = "inline-block";
    
    // Create the button
    let dropdownButton = document.createElement("button");
    dropdownButton.innerText = "Click Me";
    dropdownButton.style.padding = "10px";
    dropdownButton.style.border = "none";
    dropdownButton.style.cursor = "pointer";
    dropdownButton.style.backgroundColor = "#007BFF";
    dropdownButton.style.color = "white";
    dropdownButton.style.borderRadius = "5px";
    
    // Create the dropdown menu
    let dropdownMenu = document.createElement("div");
    dropdownMenu.style.position = "absolute";
    dropdownMenu.style.top = "100%";  // Position below the button
    dropdownMenu.style.left = "0";
    dropdownMenu.style.minWidth = "150px";
    dropdownMenu.style.backgroundColor = "white";
    dropdownMenu.style.border = "1px solid #ccc";
    dropdownMenu.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
    dropdownMenu.style.padding = "10px";
    dropdownMenu.style.display = "none";
    dropdownMenu.style.borderRadius = "5px";
    
    // Create dropdown options
    let options = ["Option 1", "Option 2", "Option 3"];
    options.forEach(optionText => {
        let option = document.createElement("a");
        option.innerText = optionText;
        option.href = "#";
        option.style.display = "block";
        option.style.padding = "5px";
        option.style.textDecoration = "none";
        option.style.color = "black";
        
        // Hover effect
        option.addEventListener("mouseover", () => option.style.backgroundColor = "#f1f1f1");
        option.addEventListener("mouseout", () => option.style.backgroundColor = "white");
        
        dropdownMenu.appendChild(option);
    });
    
    // Append elements
    dropdownContainer.appendChild(dropdownButton);
    dropdownContainer.appendChild(dropdownMenu);
    document.body.appendChild(dropdownContainer);
    
    // Toggle dropdown on button click
    dropdownButton.addEventListener("click", function (event) {
        dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
        event.stopPropagation(); // Prevent closing when clicking the button
    });
    
    // Hide dropdown if clicking outside
    document.addEventListener("click", function () {
        dropdownMenu.style.display = "none";
    });
}

export { nearLocation, moveRight, moveLeft, stopMoving, makeJump, buildAudioPath, drawAudioDropdown };
