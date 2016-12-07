"use strict";

var myp5;

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
        verCenter = (p.windowHeight - 80) / 2 ;

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
        verCenter = (p.windowHeight - 80) / 2 ;
    }
}

/*
 * 
 * The Words Canvas
 * 
 */

var wordsCanvas = function( p ) {

    "use strict";
    
    var horCenter = 0;
    var verCenter = 0;
    var xBounds = 700;
    var yBounds = 300;
    var rate = 0.008;
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
        'rain',        'clouds',        'ai',
        'numbers',     'scene',         'return',
        'personality', 'stakeholder',   'budget'
    ]

    function Word ( text ) {
            this.x = 0;
            this.y = 0;
            this.text = text;
            this.opacity = 1;
            this.scale = 1;
            this.timeX = p.random(-10,10);
            this.timeY = p.random(-10,10);
    }
    
    function getRandomWord () {
        
        do {
            var randomWord = words[Math.floor(Math.random() * words.length)];
        } while ( wordCloud.some(hasWord) );

        function hasWord ( word ) {
            return word.text === randomWord;
        }

        return randomWord;
    }

    function randomWalk_X ( word ) {
        var n = p.noise(word.timeX);
        word.timeX += rate;
        var x = p.map(n, 0, 1, -xBounds, xBounds);
        return word.x = x;
    } 

    function randomWalk_Y ( word ) {
        var n = p.noise(word.timeY);
        word.timeY += rate;
        var y = p.map(n, 0, 1, -yBounds, yBounds);
        return word.y = y;
    } 

    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);
        
        // TODO: do some error checking to see if we have Bodoni MT & fallback to Garamond or Georgia
        p.textFont("Bodoni MT");
        p.textSize(24);
        
        horCenter = p.windowWidth / 2;
        verCenter = (p.windowHeight - 80) / 2 ;

        // populate the word cloud
        for (var i = 0; i < 20; i++) {
            wordCloud.push(new Word(getRandomWord()));
        }
    }

    p.draw = function () {
        p.background(255);
        p.translate(horCenter, verCenter);

        for (var i = 0; i < 20; i++) {
            var currentWord = wordCloud[i];
            p.fill(0);
            p.text(currentWord.text, randomWalk_X(currentWord), randomWalk_Y(currentWord));
        }
    }

    p.windowResized = function () {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        horCenter = p.windowWidth / 2;
        verCenter = (p.windowHeight - 80) / 2 ;
    }

}

/*
 * 
 * The Vision Canvas
 * 
 */

var visionCanvas = function ( p ) {
    
    var center = p.createVector(p.windowWidth / 2 , (p.windowHeight - 80) / 2); 
    var bounds = p.createVector(p.windowWidth, p.windowHeight);
    var imageSlices = [];
    var totalSlices = 10;
    var rate = 0.02;
    var pg;
    var img;

    function ImageSlice () {
        this.location = p.createVector(0,0);
        this.time = p.createVector(p.random(-10,10), p.random(-10,10));
    }

    function randomWalk (vector) {
        var _nx = p.noise(vector.time.x);
        var _ny = p.noise(vector.time.y);
        vector.time.x += rate;
        vector.time.y += rate;

        var _x = p.map(_nx, 0, 1, 0, bounds.x);
        var _y = p.map(_ny, 0, 1, 0, bounds.y);
        vector.location.set(_x,_y);
    }

    function _2DRandomWalk ( vector ) {
        var n = p.noise(vector.timeX);
        word.timeX += rate;
        var x = p.map(n, 0, 1, -xBounds, xBounds);
        return word.x = x;
    }

    /*
     *
     * Setup
     * 
     */ 
    p.preload = function () {
        // img = p.loadImage("img/photos/faster/faster1.jpg");
        img = p.loadImage("img/photos/media/media1.jpg");
    }

    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);
        
        // the graphics needed for the square 
        pg = p.createGraphics(100, 100);
        pg.background(0,0,0,0);
        pg.fill(0,0,0,0);
        pg.rect(0, 0, pg.width, pg.height);


        // create the image slices
        for (var i = 0; i < totalSlices; i++) {
            imageSlices.push(new ImageSlice());
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
        pg.background(0); // for some reason, this works too
        
        // draw in all slices
        for (var i = 0; i < totalSlices; i++) { 
            var currentSlice = imageSlices[i];
            randomWalk(currentSlice);
            p.image(pg, currentSlice.location.x, currentSlice.location.y);
        }
        p.drawingContext.globalCompositeOperation="source-in";
        p.image(img, 0, 0); // IMAGE

    }

    p.windowResized = function () {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        horCenter = p.windowWidth / 2;
        verCenter = (p.windowHeight - 80) / 2;
    }
}

/*
 * 
 * The Info Canvas
 * 
 */

var infoCanvas = function ( p ) {
    
    var center = p.createVector(p.windowWidth / 2 , (p.windowHeight - 80) / 2); 
    var bounds = p.createVector(p.windowWidth, p.windowHeight);

    function visualobject () {
        this.location = p.createVector(0,0);
        this.time = p.createVector(p.random(-10,10), p.random(-10,10));
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
    }


    /*
     *
     * Drawing & Dynamics
     * 
     */ 

    p.draw = function () {
        
        p.background(255);
        
        // Two Vectors, one for the mouse location and one for the center of the window
        var mouse  = p.createVector(p.mouseX, p.mouseY);
        var center = p.createVector(p.windowWidth / 2, p.windowHeight / 2);
        
        // Vector subtraction & multiplication!
        mouse.sub(center);
        // mouse.mult(0.5);

        var mag = mouse.mag();
        p.fill(0);
        p.rect(0,0,mag,10);
        
        // Draw a line to represent the vector.
        p.translate(p.windowWidth / 2, p.windowHeight / 2);
        p.line(0, 0, mouse.x, mouse.y);

    }

    p.windowResized = function () {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        center.set(p.windowWidth / 2 , (p.windowHeight - 80) / 2);
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


