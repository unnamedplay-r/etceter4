/**
 * @file Handles image loading & processing.
 * @author gabriel
 */ 

/**
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
        element.append('<div class="item">' + 
                            '<img src="' + srcContents + start + fileExtension + '"/>' + 
                            '</div>');
        start++;
    }
}

/**
 * @summary Replaces the placeholders of any images within a page
 * 
 * @param {string} element - html element to search
 */

// replaces the placeholders of any images on a page
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
(function(){
    var target = document.getElementById('diary');
    var observer = new MutationObserver( function (mutations) {
        mutations.forEach( function (mutation) {
            // prevents an error for searching a null value
            if (mutation.oldValue) {
                var displayblock = mutation.oldValue.search(/block/g);
                if (displayblock !== -1 ) {
                    replacePlaceholders("#diary");
                    appendImagesTo("#diaryCarouselInner", "img/photos/diary/", "diary", ".jpg", 2, 10);
                    observer.disconnect();
                }
            }
        });
    });

    var config = { attributes: true, attributeOldValue: true, attributeFilter: ["style"] }
    observer.observe(target, config);
})();

// NAMED PHOTO LAZY LOAD
// for every image found in an array [specifies order]

// NUMERICAL PHOTO LAZY LOAD
// for the diary, load 10 images first.
// for every image we have, append an img tag to the child of that image section
// once we're on the ith photo, grab the next 10.
// make sure you don't go past all the images up until a point (conditional check)

/**
 * Image Loading listeners
 * 
 * @summary listens after initial loading of stills, and gets next set
 */
$('.carousel').on('slid.bs.carousel', function () {
    // tie this event to a custom event so you can turn it off after it's done
    // this might help if you apply it to the carosel event https://learn.jquery.com/events/introduction-to-custom-events/
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