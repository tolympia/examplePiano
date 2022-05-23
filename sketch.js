var keyWidth;
var keyHeight;
var canvasWidth;
var canvasHeight;
var margin;
var x;
var y;
var numKeys = 7;
var keyPressed;

var soundFiles = ["A1.mp3", "B1.mp3", "C2.mp3", "D2.mp3", "E2.mp3", "F2.mp3", "G2.mp3"];
var keys = [];

function setup() {
  canvasWidth = 640;
  canvasHeight = 400;
  createCanvas(canvasWidth, canvasHeight);
  for (var i = 0; i < numKeys; i++) {
    keys.push(loadSound(soundFiles[i]));
  }
  keyPressed = -1;  // Start out with no keys pressed.
  font = loadFont("FredokaOne-Regular.ttf");
}

function draw() {
  background(220);
  // Draw each key.
  margin = 80;
  keyWidth = (canvasWidth - margin * 2) / numKeys;
  keyHeight = (canvasHeight - margin * 2);
  x = margin;
  y = margin;
  var transparency = 100;
  var colors = [
    color(255, 107, 107, transparency),  // Red
    color(255, 171, 118, transparency),  // Orange
    color(255, 217, 61, transparency),  // Yellow
    color(107, 203, 119, transparency),  // Green
    color(77, 150, 255, transparency), // Blue
    color(111, 105, 172, transparency),  // Purple
    color(51, 60, 131, transparency), // Navy
  ];
  for (var i = 0; i < numKeys; i++) {
    if (keyPressed == i) {
      var pressedColor = colors[i];
      pressedColor.setAlpha(250);
      fill(pressedColor);
      
      // Play sound.
      var keyToPlay = keys[i];
      keyToPlay.play();
    }
    else {
      fill(colors[i]);
    }
    stroke(255, 255, 255);
    strokeWeight(3);
    rect(x, y, keyWidth, keyHeight);
    x += keyWidth;
  }
  
  fill(10, 10, 10, 255);
  noStroke();
  textFont(font);
  textAlign(CENTER, CENTER);
  textSize(40);
  text("press any piano key to play!", canvasWidth/2, canvasHeight - 100);
}

function mouseReleased() {
  keyPressed = -1;
}

function mousePressed() {
  var start = margin;
  // Click was in the margin of the canvas. Return!
  if (mouseX < margin || mouseX > canvasWidth - margin) {
    return;
  }
  if (mouseY < margin || mouseY > canvasHeight - margin) {
    return;
  }
      
  // From left to right, check which key the mouse click
  // was on, then remember which key is currently pressed.
  for (var i = 0; i < numKeys; i++) {
    if (mouseX < margin + ((i + 1) * keyWidth)) {
      keyPressed = i;
      return;
    }
  }
}