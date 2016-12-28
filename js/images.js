/**
 * @file Handles image loading & processing.
 * @author gabriel
 */ 

/**
 * appendImagesTo
 * 
 * @summary Appends images to an element 
 * 
 * @param {string} element - html element you're appending to
 * @param {string} location - pathway to the images
 * @param {string} prefix - prefix of the name of the images are 
 * @param {string} fileExtension - file extension of the images. Must include a period (.)
 * @param {number} start - integer value we should start at (inclusive)
 * @param {number} end - integer value we should stop at (inclusive)
 */

function appendImagesTo (element, location, prefix, fileExtension, start, end) {
    var srcContents = location + prefix;
    element = $(element)
    while (start <= end) {
        element.append('<div id="stillsImage" class="dtc heightControl min-h-21_875rem min-h-28_125rem-ns tc h-100">' + 
                            '<img class="mw-100 mh-100 w-auto h-auto" src="' + srcContents + start + fileExtension + '"/>' + 
                        '</div>');
        start++;
    }
}

/**
 * replacePlaceholders
 * 
 * @summary Replaces the placeholders of any images within a page
 * 
 * @param {string} element - html element to search
 */

function replacePlaceholders (element) {
    var images = $(element).find("img[src='img/placeholder.jpg']");
    if (images.length !== 0) {
        images.each( function ()  {
            var actualImage = $(this).attr("data-src");
            $(this).attr("src", actualImage);  
        });
    }
}

// Initial Diary Image Loading

// (function(){
//     var target = document.getElementById('diary');
//     var observer = new MutationObserver( function (mutations) {
//         mutations.forEach( function (mutation) {
//             // prevents an error for searching a null value
//             if (mutation.oldValue) {
//                 var displayblock = mutation.oldValue.search(/block/g);
//                 if (displayblock !== -1 ) {
//                     replacePlaceholders("#diary");
//                     appendImagesTo("#diaryCarouselInner", "img/photos/diary/", "diary", ".jpg", 2, 10);
//                     observer.disconnect();
//                 }
//             }
//         });
//     });

//     var config = { attributes: true, attributeOldValue: true, attributeFilter: ["style"] }
//     observer.observe(target, config);
// })();

/**
 * Image Loading listeners
 * 
 * @summary listens after initial loading of stills, and gets next set
 */
$('.carousel').on('slid.bs.carousel', function () {
    // tie this event to a custom event so you can turn it off after it's done
    // this might help if you apply it to the carousel event https://learn.jquery.com/events/introduction-to-custom-events/
    // $( document ).trigger( "myCustomEvent", [ "bim", "baz" ] );

    if (pages[7].hasAllData === true) {
        // console.log('not loading any more images');
        return;
    } else 
    var index = $('.carousel .active').index('.carousel .item');
    console.log('index = ' + index);
    if (index + 1 === 9) {
        // console.log('9th image loaded, loading new set');
        appendImagesTo("#diaryCarouselInner", "img/photos/diary/", "diary", ".jpg", 11, 21);
        return;
    } else if (index + 1 === 20) {
        // console.log('20th image loaded, loading new set');
        appendImagesTo("#diaryCarouselInner", "img/photos/diary/", "diary", ".jpg", 22, 32);
        return;
    } else if (index + 1 === 30) {
        // console.log('30th image loaded, loading rest of diary');
        appendImagesTo("#diaryCarouselInner", "img/photos/diary/", "diary", ".jpg", 33, 63);
        pages[7].hasAllData = true;
        return;
    }
});

function Carousel ( _c ) {
    this.id = _c.id || "";
    this.index = _c.index || 0;
    this.images = _c.images || {};
    this.total = _c.total || 0;
}

Carousel.prototype.incIndex = function () {
    var _index = this.index + 1;
    if (_index > this.total - 1 ) {
        this.setIndex(0);
    } else {
        this.index = _index;
    }
}

Carousel.prototype.decIndex = function () {
    var _index = this.index - 1;
    if (_index < 0 ) {
        this.setIndex(this.total - 1)
    } else {
        this.index = _index;
    }
}

Carousel.prototype.setIndex = function (n) {
    this.index = n;
}

Carousel.prototype.updateTotal = function () {
    this.total = $('[id*=stillsImage]').length;
}

// when this is emitted, the Carousel has began to slide into a new image
Carousel.prototype.emitSlide = function () {
    $( this.id ).trigger( "carousel:slide", [this.index, this.total] );
}

var stillsCarousel = new Carousel({
    "id": "#stills",
    "images": {
        "faster": 28,
        "live": 5,
        "media": 44,
        "slip":6
    },
    "total": $('[id*=stillsImage]').length
});

$('#stills-left').on('click', function() {
    var img = $('#stillsImage.dtc');
    img.removeClass('dtc').addClass('dn');
    if (stillsCarousel.index > 0) {
        img.prev().addClass('dtc').removeClass('dn');
        stillsCarousel.decIndex();
    } else {
        $('[id*=stillsImage]').last().addClass('dtc').removeClass('dn');
        stillsCarousel.decIndex();
    }
    stillsCarousel.emitSlide();
});

$('#stills-right').on('click', function() {
    var img = $('#stillsImage.dtc');
    img.removeClass('dtc').addClass('dn');
    if (stillsCarousel.index < stillsCarousel.total - 1) {
        img.next().addClass('dtc').removeClass('dn');
        stillsCarousel.incIndex();
    } else {
        $('[id*=stillsImage]').first().addClass('dtc').removeClass('dn');
        stillsCarousel.incIndex();
    }
    stillsCarousel.emitSlide();
});

// prep for loading in images
$("#stills").on("carousel:slide", function(event, arg1, arg2) {
    console.log(arg1 + " " + arg2);
})