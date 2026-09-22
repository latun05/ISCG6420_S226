function animate() {

    const element = document.getElementById("animBlock");

    let x = 0;          // horizontal position of the block
    let y = 0;          // vertical position of the block
    let opacity = 1;    // opacity style value of the block
    let phase = 0;      // determines which code block runs
    let animId;         // will hold the ID of the interval timer

    function doAnimation() {

        if (phase == 0) {
            x++;
            y++;
            element.style.left = x + 'px';
            element.style.top = y + 'px';

            if (x >= 300) {
                phase = 1;
            }
        }
        else if (phase == 1) {
            x--;
            element.style.left = x + 'px';

            if (x <= 20) {
                phase = 2;
            }
        }
        else if (phase == 2) {
            x++;
            y += 0.5;
            element.style.left = x + 'px';
            element.style.top = y + 'px';

            if (x >= 550) {
                phase = 3;
                clearInterval(animId);   // stop the timer when finished
            }
        }
    }

    // Run doAnimation every 10 milliseconds and store the timer ID
    animId = setInterval(doAnimation, 10);
}

// Start the animation when the wrapper is clicked
document.getElementById("animWrapper").addEventListener("click", animate);