"use strict";

function setup() {
  var canvas = createCanvas(100,100);
  canvas.class('backgroundCanvas')
  canvas.parent('landingPage');
}

function draw() {
  if (mouseIsPressed) {
    fill(0);
  } else {
    fill(255);
  }
  ellipse(mouseX, mouseY, 80, 80);
}