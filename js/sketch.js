"use strict";

function setup() {
  var canvas = createCanvas(windowWidth,windowHeight);
  canvas.class('backgroundCanvas');
  canvas.id('landingPageCanvas');
  canvas.parent('landingPage');
  
  /* 
  
  Tests removing all the stylings p5.js gives the Canvas element so that it fit a div 
  
  * 
  $('#landingPageCanvas').removeAttr('width')
                         .removeAttr('height')
                         .removeAttr('style');
  */
}

function draw() {

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}