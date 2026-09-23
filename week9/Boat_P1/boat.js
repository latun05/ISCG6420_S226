var ctx;
var smokeX = 400; 
var smokeY = 180; // Moved up to sit above the cabin

function init() {
    var canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    
    drawScene();
    
    // Requirement 10: Move smoke every 180 milliseconds
    setInterval(moveSmoke, 180);
}

function drawScene() {
    ctx.clearRect(0, 0, 800, 500);

    // Center is at (400, 320). 'true' draws the bottom half.
    // The top is flat at y=320, the curve goes down to y=520.
    ctx.beginPath();
    ctx.arc(400, 320, 200, Math.PI, 0, true); 
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#663300";
    ctx.stroke();
    ctx.closePath();

    // Draw the sea AFTER the boat so it covers the bottom curve 
    ctx.beginPath();
    ctx.rect(0, 400, 800, 100);
    ctx.fillStyle = "#00FFCC";
    ctx.fill();
    ctx.closePath();

    // Draw the cabin ON TOP of the boat's flat deck 
    ctx.beginPath();
    ctx.rect(310, 220, 180, 100); 
    ctx.fillStyle = "#663300";
    ctx.fill();
    ctx.closePath();

    // Left Window
    ctx.beginPath();
    ctx.arc(340, 360, 25, 0, 2 * Math.PI);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#663300";
    ctx.stroke();
    ctx.closePath();

    // Right Window
    ctx.beginPath();
    ctx.arc(460, 360, 25, 0, 2 * Math.PI);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#663300";
    ctx.stroke();
    ctx.closePath();

    // 'false' draws the top half, which is what the target image shows.
    ctx.beginPath();
    ctx.arc(smokeX, smokeY, 40, Math.PI, 0, false); 
    ctx.lineWidth = 10;
    ctx.strokeStyle = "blue";
    ctx.stroke();
    ctx.closePath();
}

function moveSmoke() {
    // Requirement 10: Move smoke up and right diagonally
    smokeX += 2; 
    smokeY -= 2; 
    
    // Reset smoke position if it goes off screen
    if (smokeX > 800 || smokeY < 0) {
        smokeX = 400;
        smokeY = 180; // Reset to the new starting position
    }
    
    drawScene();
}