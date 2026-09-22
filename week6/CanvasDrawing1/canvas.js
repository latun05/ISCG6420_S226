window.onload = (event) => {
  let canvas = document.getElementById('myCanvas');
  let ctx = canvas.getContext("2d");

  // 1. Draw a line from top-left to bottom-right
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(800, 600);
  ctx.closePath();
  ctx.lineWidth = 10;
  ctx.strokeStyle = "red";
  ctx.stroke();

  // 2. Draw a filled rectangle
  ctx.beginPath();
  ctx.rect(500, 20, 200, 300);
  ctx.closePath();
  ctx.stroke();                     // outline
  ctx.fillStyle = "#00FFCC";
  ctx.fill();                       // fill

  // 3. Draw Pacman body (modified from the original circle)
  //    The arc starts at 0.2π and ends at 1.8π, leaving a mouth opening.
  ctx.beginPath();
  ctx.arc(150, 400, 120, 0.2 * Math.PI, 1.8 * Math.PI);
  ctx.lineTo(150, 400);            // line back to centre to close the mouth
  ctx.closePath();
  ctx.strokeStyle = "black";
  ctx.fillStyle = "yellow";
  ctx.fill();
  ctx.stroke();

  // 4. Draw Pacman eye (a small black circle)
  ctx.beginPath();
  ctx.arc(190, 350, 15, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fillStyle = "black";
  ctx.fill();

  // 5. Draw custom shape (star)
  ctx.beginPath();
  ctx.moveTo(380, 400);
  ctx.lineTo(430, 550);
  ctx.lineTo(300, 460);
  ctx.lineTo(460, 460);
  ctx.lineTo(330, 550);
  ctx.closePath();
  ctx.fillStyle = "rgb(255, 0, 255)";
  ctx.fill();

  // 6. Draw text
  ctx.fillStyle = "blue";
  ctx.font = "40px arial";
  ctx.fillText("Naimilz", 100, 50);   // <-- replace with your own name
};