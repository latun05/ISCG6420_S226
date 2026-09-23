// 1. Get the canvas element and its 2D context
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// 2. Define the Logo object constructor
function Logo() {
    // Flag to track if the image has finished loading
    this.loading = true;
    
    // Create a new image and set its source
    this.image = new Image();
    this.image.src = "dvd-logo.png"; 
    
    // When the image loads, set loading to false
    this.image.onload = () => { this.loading = false; };
    
    // Scale the image down to 1/4 of its original size
    this.scaledWidth = this.image.width / 4;
    this.scaledHeight = this.image.height / 4;
    
    // Set a random starting position within the canvas bounds
    this.x = random(0, canvas.clientWidth - this.scaledWidth);
    this.y = random(0, canvas.clientHeight - this.scaledHeight);
    
    // Set the movement speed (velocity) for both axes
    this.velocityX = 1;
    this.velocityY = 1;

    // Method to update the position of the logo
    this.update = () => {
        this.x += this.velocityX;
        this.y += this.velocityY;
    }

    // Method to draw the logo onto the canvas
    this.draw = (context) => {
        context.drawImage(
            this.image, 
            this.x, 
            this.y, 
            this.scaledWidth, 
            this.scaledHeight
        );
    }
}

// 3. Create an array to store all the logo objects
let logos = [];

// 4. Add a click event listener to the canvas
// Every time you click, a new Logo is created and added to the array
canvas.addEventListener("click", () => { logos.push(new Logo()); });

// 5. Add one logo to start with, then start the animation
logos.push(new Logo());
run();

// 6. The main animation loop
function run() {
    update(); // Update positions
    draw();   // Draw everything
    window.requestAnimationFrame(run); // Ask the browser to run this again on the next frame
}

// 7. Loop through all logos and update their positions and check for collisions
function update() {
    for (let i = 0; i < logos.length; i++) {
        logos[i].update();
        checkWallCollision(logos[i]);
    }
}

// 8. Clear the canvas and draw all logos
function draw() {
    // Clear the entire canvas before drawing the next frame
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    
    for (let i = 0; i < logos.length; i++) {
        // Only draw the logo if its image has finished loading
        if (!logos[i].loading) {
            logos[i].draw(ctx);
        }
    }
}

// 9. Helper function to get a random integer between min and max
function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

// 10. Check if a logo has hit any of the four walls, and reverse its velocity if so
function checkWallCollision(object) {
    // Right wall collision
    if (object.x + object.scaledWidth >= canvas.clientWidth) {
        object.velocityX = -object.velocityX;
    }
    // Left wall collision
    else if (object.x <= 0) {
        object.velocityX = -object.velocityX;
    }

    // Bottom wall collision
    if (object.y + object.scaledHeight >= canvas.clientHeight) {
        object.velocityY = -object.velocityY;
    }
    // Top wall collision
    else if (object.y <= 0) {
        object.velocityY = -object.velocityY;
    }
}