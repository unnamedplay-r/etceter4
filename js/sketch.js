"use strict";

var myp5;
var visionImage;
var footerHeight = $('footer').css('height').replace('px', '');

$(document).ready(function () {
    // find the storage
    visionImage = document.getElementById("imageStorage");
    
    // load image for vision canvas & save it der
    visionImage.src = 'img/photos/glitchpr0n/glitch26.png';
});

/*
 * 
 * The listeners for the canvas change
 * 
 */

$('#toWords').mouseenter( function () {
    if ($('#menuPageCanvasWrapper canvas').is("#defaultCanvas1")) {
        removeCanvas();
    } 
    
    if (!myp5) {
        myp5 = new p5( wordsCanvas, 'menuPageCanvasWrapper' );
        myp5.id = 'words';
    } else if (myp5.id !== 'words') {
        myp5.remove();
        myp5 = undefined;
        myp5 = new p5( wordsCanvas, 'menuPageCanvasWrapper' );
        myp5.id = 'words';
    }
});

$('#toSound').mouseenter( function() {
    if ($('#menuPageCanvasWrapper canvas').is("#defaultCanvas1")) {
        removeCanvas();
    } 
    
    if (!myp5) {
        myp5 = new p5( soundCanvas, 'menuPageCanvasWrapper' );
        myp5.id = 'sound';
    } else if (myp5.id !== 'sound') {
        myp5.remove();
        myp5 = undefined;
        myp5 = new p5( soundCanvas, 'menuPageCanvasWrapper' );
        myp5.id = 'sound';
    }
});

$('#toVision').mouseenter( function() {
    if ($('#menuPageCanvasWrapper canvas').is("#defaultCanvas1")) {
        removeCanvas();
    }
    
    if (!myp5) {
        myp5 = new p5( visionCanvas, 'menuPageCanvasWrapper' );
        myp5.id = 'vision';
    } else if (myp5.id !== 'vision') {
        myp5.remove();
        myp5 = undefined;
        myp5 = new p5( visionCanvas, 'menuPageCanvasWrapper' );
        myp5.id = 'vision';
    }
});

$('#toInfo').mouseenter( function() {
    if ($('#menuPageCanvasWrapper canvas').is("#defaultCanvas1")) {
        removeCanvas();
    }
    
    if (!myp5) {
        myp5 = new p5( infoCanvas, 'menuPageCanvasWrapper' );
        myp5.id = 'info';
    } else if (myp5.id !== 'info') {
        myp5.remove();
        myp5 = undefined;
        myp5 = new p5( infoCanvas, 'menuPageCanvasWrapper' );
        myp5.id = 'info';
    }
});

/*
 * 
 * The Sounds Canvas 
 * - These canvases below appear when you hover over their respective anchor
 * - tags in the menu section of the site
 * 
 */

var soundCanvas = function ( p ) {

    var horCenter = 0;
    var verCenter = 0;
    var xBounds = 0;
    var yBounds = 0;

    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);
        
        horCenter = p.windowWidth / 2;
        verCenter = (p.windowHeight - footerHeight) / 2 ;

    }

    p.draw = function () {
        p.background(255);
        p.translate(horCenter, verCenter);
        for (var i = 0; i < 40; i++) {
            var r = Math.floor(p.randomGaussian(127,40)) % 255;
            var g = Math.floor(p.randomGaussian(127,40)) % 255;
            var b = Math.floor(p.randomGaussian(127,40)) % 255;
            var c = p.color(r, g, b);
            p.fill(c);
            p.noStroke();

            var x = Math.floor(p.randomGaussian(0,100));
            var y = Math.floor(p.randomGaussian(0,100));
            p.ellipse(x, y, 40, 40);
        }   
    }

    p.windowResized = function () {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        horCenter = p.windowWidth / 2;
        verCenter = (p.windowHeight - footerHeight) / 2 ;
    }
}

/*
 * 
 * The Words Canvas
 * 
 */


// TODO : Make two distinct clouds - they repel one another - each cloud contains different emotions
var wordsCanvas = function( p ) {

    "use strict";

    var center = p.createVector(p.windowWidth / 2, (p.windowHeight - footerHeight) / 2);
    var bounds = p.createVector(700, 300);
    var textBounds = p.createVector(12,30);
    var rate = p.createVector(0.008, 0.008);
    var bezierRate = 0.01;
    var wordTotal = 30; 
    var wordCloud = [];

    var words = [
        'KPI',         'death',         'callback',
        'forever',     'growth',        'capture',
        'society',     'taste',         'empty',
        'disgust',     'forgiveness',   'sell',
        'purchase',    'buy',           'fear',
        'remorse',     'life',          'love',
        'forget',      'sculpture',     'market',
        'common',      'take',          'question',
        'rain',        'clouds',        'AI',
        'numbers',     'scene',         'return',
        'personality', 'stakeholder',   'budget',
        'pain',        'depression',    'hate',
        'constant',    'repetition',    'space'
    ]

    function Word ( text ) {
            this.bezierTime = p.random();
            this.bezierReverse = Math.random() >= 0.5;
            this.location = p.createVector(p.random(-20,20), p.random(-20,20));
            this.text = text;
            this.textSize = Math.floor(p.random(18,28) + 1);
            this.noiseTime = p.createVector(p.random(-10,10), p.random(-10,10));
    }
    
    function getRandomWord () {
        // don't repeat any words
        do {
            var randomWord = words[Math.floor(Math.random() * words.length)];
        } while ( wordCloud.some(hasWord) );

        function hasWord ( word ) {
            return word.text === randomWord;
        }
        return randomWord;
    }

    Word.prototype._2DRandomWalk = function () {
        var _nx = p.noise(this.noiseTime.x);
        var _ny = p.noise(this.noiseTime.y);
        this.noiseTime.add(rate);

        var _x = p.map(_nx, 0, 1, -bounds.x, bounds.x);
        var _y = p.map(_ny, 0, 1, -bounds.y, bounds.y);
        this.location.set(_x,_y);
    }

    Word.prototype.update = function () {
        this._2DRandomWalk();
        this._updateBezier();
    }

    Word.prototype._updateBezier = function () {
        var size = p.map(getBezierPoint(this.bezierTime), 0, 1, textBounds.x, textBounds.y);
        
        if (this.bezierReverse === true) {
            if ( this.bezierTime < 0 ) {
                this.bezierTime += bezierRate;
                this.bezierReverse = false;
            } else {
                this.bezierTime -= bezierRate;
            }
        } else { // bezierReverse = false
            if ( this.bezierTime < 1 ) {
                this.bezierTime += bezierRate;
            } else {
                this.bezierTime -= bezierRate;
                this.bezierReverse = true;
            }
        }

        this.textSize = size;
    }

    /*
     *
     * Setup
     * 
     */

    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);
        
        // TODO: do some error checking to see if we have Bodoni MT & fallback to Garamond or Georgia
        p.textFont("Bodoni MT");
        

        // populate the word cloud
        for (var i = 0; i < wordTotal; i++) {
            wordCloud.push(new Word(getRandomWord()));
        }
    }

    /*
     *
     * Drawing & Dynamics
     * 
     */

    p.draw = function () {
        p.background(255);
        p.translate(center.x, center.y);

        for (var i = 0; i < wordTotal; i++) {
            var currentWord = wordCloud[i];
            currentWord.update();
            p.fill(0);
            p.textSize(currentWord.textSize);
            p.text(currentWord.text, currentWord.location.x, currentWord.location.y);
        }
    }

    p.windowResized = function () {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        center.set(p.windowWidth / 2, (p.windowHeight - footerHeight) / 2);
    }

}

/*
 * 
 * The Vision Canvas
 * 
 */

var visionCanvas = function ( p ) {
    var heightOfCanvas = p.windowHeight - footerHeight;
    var imageSlices = [];
    var totalSlices = 20;
    var sliceHeightBigRatio = heightOfCanvas * (1/8);
    var sliceHeightSmallRatio = heightOfCanvas * (1/4);
    var topSpeed = 20;
    var pg;
    var img;

    function ImageSlice (heightWeight) {
        var height;
        var heightOffset;

        if (heightWeight < .333) { 
            height = heightOfCanvas - (sliceHeightBigRatio/6 + sliceHeightBigRatio/6);
            heightOffset = sliceHeightBigRatio/6 ;
        } else if (heightWeight < .666) {
            height = heightOfCanvas - (sliceHeightBigRatio + sliceHeightBigRatio);
            heightOffset = sliceHeightBigRatio;
        } else {
            height = heightOfCanvas - (sliceHeightSmallRatio + sliceHeightSmallRatio);
            heightOffset = sliceHeightSmallRatio;
        }

        // the graphics needed for the square 
        var sliceWidth = 15;
        this.slice = p.createGraphics(sliceWidth, height);
        this.slice.background(0,0,0,0);
        this.slice.fill(0,0,0,0);
        this.slice.rect(0, 0, this.slice.width, this.slice.height);

        this.reverse = false; // goes backwards
        this.acceleration = p.createVector(.03,0);
        this.location = p.createVector(-sliceWidth + p.random(-1000,0), heightOffset); // start before the line
        this.velocity = p.createVector(p.random(0.01,10), 0);
        this.time = p.createVector(p.random(-10,10), p.random(-10,10));
    }

    ImageSlice.prototype.update = function () {
        if (this.reverse === false) {
            this.velocity.add(this.acceleration);
            if (this.velocity.x >= topSpeed) {
                this.reverse = true;
            }
        } else {  // if (this.reverse === true)
            if (this.velocity.x >= -topSpeed) {
                this.velocity.sub(this.acceleration);
            } else {
                this.reverse = false;
            }
        }

        this.location.add(this.velocity);
    }

    ImageSlice.prototype.checkEdges = function () {
        // acceleration to the right (left to right directionality)
        if (this.reverse === false) {
        
            // are you past the right edge?
            if (this.location.x > p.windowWidth) {
                 
                // are you going right?
                if (this.velocity.x > 0) {
                    this.location.x = p.random(-1000,0); // cool, go back to the other side
                } 
                
                // are you going left? (coming out of a reverse)
                // else if (this.velocity.x < 0) { } // do nothing! 
                
            } 
            
            // are you past the left edge?
            else if (this.location.x < 0) { 
                
                // are you going left?
                if (this.velocity.x < 0) {
                    this.location.x = p.random(p.windowWidth, p.windowWidth + 1000); // go back to the right side
                } 

                // are you going right? (coming out of a reverse)
                // else if (this.velocity.x > 0) { }  // do nothing!
            }
        } 
        
        // acceleration to the left (right to left directionality)
        else {
            if (this.location.x > p.windowWidth) {
                if (this.velocity.x > 0) {
                    this.location.x = p.random(-1000,0) 
                }
            } else if (this.location.x < 0) { // left side
                if (this.velocity.x <= 0) {
                    this.location.x = p.random(p.windowWidth, p.windowWidth + 1000);
                }
            }
        }
    }

    /*
     *
     * Setup
     * 
     */ 
    p.preload = function () {}

    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);
        img = p.loadImage(visionImage.src);

        // create the image slices
        for (var i = 0; i < totalSlices; i++) {
            imageSlices.push(new ImageSlice(p.random()));
            imageSlices[i].location.sub(10,0);
        }
    }


    /*
     *
     * Drawing & Dynamics
     * 
     */ 

    p.draw = function () {
        
        p.rect(0,0,1,1); // this acts as a reset for some reason
        p.drawingContext.globalCompositeOperation="source-over";
        // pg.background(0); // for some reason, this works too
        
        // draw in all slices
        for (var i = 0; i < totalSlices; i++) { 
            var currentSlice = imageSlices[i];
            currentSlice.update();
            currentSlice.checkEdges();
            currentSlice.slice.background(0);
            p.image(currentSlice.slice, currentSlice.location.x, currentSlice.location.y);
        }
        p.drawingContext.globalCompositeOperation="source-in";
        p.image(img, 0, 0); // IMAGE

    }

    p.windowResized = function () {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }
}

/*
 * 
 * The Info Canvas
 * 
 */

var infoCanvas = function ( p ) {
    
    var center = p.createVector(p.windowWidth / 2 , (p.windowHeight - footerHeight) / 2); // (width, height)
    var bounds = p.createVector(p.windowWidth, p.windowHeight);
    var topSpeed = 20;
    var ball;
    var _keyAccel = p.createVector(10.0, 10.0);

    function Ball () {
        this.acceleration = p.createVector(0, 0);
        this.location = p.createVector(center.x, center.y);
        this.time = p.createVector(p.random(-10,10), p.random(-10,10));
        this.velocity = p.createVector(0, 0);
    }

    Ball.prototype.update = function () {
        
        var mouse = p.createVector(p.mouseX, p.mouseY);
        var direction = p5.Vector.sub(mouse,this.location);

        direction.normalize();
        direction.mult(0.5);
        direction.div(Math.pow(direction.mag(), 2)); // divide it by the distance squared so it has some gravity
        this.acceleration = direction;

        this.velocity.add(this.acceleration);
        this.velocity.limit(topSpeed);
        this.location.add(this.velocity);
    }

    Ball.prototype.checkEdges = function () {
        if (this.location.x > p.windowWidth) {
            this.location.x = 0;
        } else if (this.location.x < 0) {
            this.location.x = p.windowWidth;
        }
    
        if (this.location.y > p.windowHeight) {
            this.location.y = 0;
        } else if (this.location.y < 0) {
            this.location.y = p.windowHeight;
        }
    }

    Ball.prototype.display = function () {
        p.stroke(0);
        p.fill(175);
        // The Mover is displayed.
        p.ellipse(this.location.x, this.location.y, 16, 16);
    }

    /*
     *
     * Setup
     * 
     */ 
    p.preload = function () {
    }

    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);
        ball = new Ball();
    }


    /*
     *
     * Drawing & Dynamics
     * 
     */ 

    p.draw = function () {
        p.background(255);
        ball.update();
        ball.checkEdges();
        ball.display();
    }

    p.windowResized = function () {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        center.set(p.windowWidth / 2 , (p.windowHeight - footerHeight) / 2);
    }

    p.keyPressed = function () {
        if (p.keyCode == p.UP_ARROW) {
            ball.velocity.add(_keyAccel);
            // ball.location.add(ball.velocity);
        } else if (p.keyCode == p.DOWN_ARROW) {
            ball.velocity.sub(_keyAccel);
            // ball.location.sub(ball.velocity);
        }
    }
}

/*
 * 
 * Other Utility Functions
 * 
 */

// Linear Random Value Generator
function randomMonteCarlo (max, exponent) {
    while (true) {
        var r1 = Math.random();
        var probability = Math.pow(r1, exponent);
        var r2 = Math.random();

        if (r2 < probability) {
            return r1 * max;
        }
    }
}

function removeCanvas () {
    $('#menuPageCanvasWrapper canvas').remove();
}

function _2DRandomWalk (vector) {
    var _nx = p.noise(vector.time.x);
    var _ny = p.noise(vector.time.y);
    vector.time.x += rate;
    vector.time.y += rate;

    var _x = p.map(_nx, 0, 1, 0, bounds.x);
    var _y = p.map(_ny, 0, 1, 0, bounds.y);
    vector.location.set(_x,_y);
}

/*
 * 
 * Failed Attempts at Art
 * 
 */


        /*
         * 
         * Failed attempt to make clouds using noise
         * 
         */
        // p.loadPixels();
        // var d = p.pixelDensity();  
        
        // // we multiply by 4 because the pixel[] array is the size of the display window * 4 (including the pixel density)
        // var widthOfCanvas = Math.pow(4, d) * p.width;
        // var heightOfCanvas = Math.pow(4, d) * p.height;
        
        // for (var y = 0; y < heightOfCanvas; y+=4) {
        //     for (var x = 0; x < widthOfCanvas; x+=4) {
        //         var grayScale = Math.floor(p.random(255));
        //         p.pixels[x] = grayScale;
        //         p.pixels[x+1] = grayScale; 
        //         p.pixels[x+2] = grayScale; 
        //         p.pixels[x+3] = 1; 
        //     }
        // }
        // p.updatePixels();


        /* 
         * This one draws the canvas, the one above it doesn't!
         */

        // var fullCanvas = 4 * (p.windowWidth * d) * (p.windowHeight * d);
        // for (var i = 0; i < fullCanvas; i+=4) {
        //     var bright = p.color(Math.floor(p.random(255)), Math.floor(p.random(255)), Math.floor(p.random(255)));
        //     p.pixels[i] = p.red(bright);
        //     p.pixels[i+1] = p.green(bright);
        //     p.pixels[i+2] = p.blue(bright);
        //     p.pixels[i+3] = p.alpha(bright);
        // }
        // p.updatePixels();


        /*
         * Successful Line Drawing thingy!
         */ 
        // p.draw = function () {
        
        //     p.background(255);
            
        //     // Two Vectors, one for the mouse location and one for the center of the window
        //     var mouse  = p.createVector(p.mouseX, p.mouseY);
        //     var center = p.createVector(p.windowWidth / 2, p.windowHeight / 2);
            
        //     // Vector subtraction & multiplication!
        //     mouse.sub(center);
        //     // mouse.mult(0.5);

        //     var mag = mouse.mag();
        //     p.fill(0);
        //     p.rect(0,0,mag,10);
            
        //     // Draw a line to represent the vector.
        //     p.translate(center.x, center.y);
        //     p.line(0, 0, mouse.x, mouse.y);

        // }


function getBezierPoint ( t ) {
    // from here: http://math.stackexchange.com/questions/26846/is-there-an-explicit-form-for-cubic-b%C3%A9zier-curves
    // y = u0(1−x^3) + 3*u1*(1−x^2)*x + 3*u2*(1−x)*x^2 + u3*x^3
    //        A             B                 C             D  
    // t = 'time'

    if (t > 1) {
        t = 1;
    } else if (t < 0) {
        t = 0;
    }

    var curve = { // ease in curve
        u0: 0, 
        u1: 0.05,
        u2: 0.25,
        u3: 1
    }

    var A = curve.u0 * (1 - Math.pow(t, 3));
    var B = 3 * curve.u1 * (1 - Math.pow(t, 2)) * t;
    var C = 3 * curve.u2 * (1 - t) * Math.pow(t, 2);
    var D = curve.u3 * Math.pow(t, 3);

    return A + B + C + D;
}