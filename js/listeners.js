/**
 * Site navigation listeners
 */

/*
 * Back Button
 */
$("#backButton").on("click", function () {
    showNewSection(getBackElement(currentPage));
    changeFooter("white", "black", "black", "class2c");
});

/*
 * New
 */

$("#newToSplashButton").on("click", function() { 
    showNewSection("#splash");
    changeFooter("white", "black", "black", "class2c" );
}); 

$("#newToSplashButton2").on("click", function() { 
    showNewSection("#splash");
    changeFooter("white", "black", "black", "class2c" );
});

/*
 * Splash
 */
$("#splashToMenuButton").on("click", function() { 
    showNewSection("#menu");
    changeFooter("white", "black", "black", "class2c" );
});

$("#splashToMenuButton2").on("click", function() { 
    showNewSection("#menu");
    changeFooter("white", "black", "black", "class2c");
});
$("#splashToMenuButton3").on("click", function() { 
    showNewSection("#menu");
    changeFooter("white", "black", "black", "class2c");
});
$("#splashToMenuButton4").on("click", function() { 
    showNewSection("#menu");
    changeFooter("white", "black", "black", "class2c");
});

$("#toSplashButton").on("click", function() { 
    showNewSection("#splash")
    changeFooter("white", "black", "black", "class2c");
});

/*
 * Menu
 */

$("#menuToWordsButton").on("click", function() { 
    showNewSection("#words");
    changeFooter("white", "white", "black", "class2c");
});

$("#menuToMusicButton").on("click", function() { 
    showNewSection("#music");
    changeFooter("white", "#00ffff", "#00ffff", "class2c");
});
$("#menuToSightButton").on("click", function() { 
    showNewSection("#sight")
    changeFooter("white", "magenta", "magenta", "class2c");
});
$("#menuToInfoButton").on("click", function() {
    showNewSection("#info")
    changeFooter("white", "yellow", "yellow", "class2c");
});

$("#toMenuButton").on("click", function() {
    showNewSection("#menu")
    changeFooter("white", "black", "black", "class2c");
});

/*
 * Sight
 */

$("#sightToMenuButton").on("click", function() {
    showNewSection("#menu")
    changeFooter("white", "black", "black", "class2c");
});

$("#sightToVideoButton").on("click", function() { 
    showNewSection("#video")
    changeFooter("white", "black", "black", "class2c");
});

$("#sightToVideoButton2").on("click", function() { 
    showNewSection("#video")
    changeFooter("white", "black", "black", "class2c");
});

$("#sightToStillButton").on("click", function() { 
    showNewSection("#still")
    changeFooter("white", "black", "black", "class2c");
});

$("#sightToStillButton2").on("click", function() { 
    showNewSection("#still")
    changeFooter("white", "black", "black", "class2c");
});

/*
 * Info
 */

$("#infoToMenuButton").on("click", function() { 
    showNewSection("#menu")
    changeFooter("white", "black", "black", "class2c");
});

$("#infoToMapButton").on("click", function() { 
    showNewSection("#sitemap")
    changeFooter("white", "black", "black", "class2c");
});

/*
 * Words
 */
$("#wordsToDiaryButton").on("click", function() { 
    showNewSection("#diary")
    changeFooter("white", "black", "black", "class2c");
});

$("#wordsToBlogButton").on("click", function() { 
    showNewSection("#blog")
    changeFooter("white", "black", "black", "class2c");
});

$("#wordsToLoopButton").on("click", function() { 
    showNewSection("#loop")
    changeFooter("white", "black", "black", "class2c");
});

/*
 * Map
 */

$("#mapToMapButton").on("click", function() { 
    showNewSection("#sitemap")
    changeFooter("white", "black", "black", "class2c");
});

$("#mapToMapButtonSmall").on("click", function() { 
    showNewSection("#sitemap")
    changeFooter("white", "black", "black", "class2c");
});

$("#mapToMusicButton").on("click", function() { 
    showNewSection("#music")
    changeFooter("white", "#00ffff", "#00ffff", "class2c");
});

$("#mapToBlogButton").on("click", function() { 
    showNewSection("#blog")
    changeFooter("white", "black", "black", "class2c");
});

$("#mapToDiaryButton").on("click", function() { 
    showNewSection("#diary")
    changeFooter("white", "black", "black", "class2c");
});

$("#mapToVideoButton").on("click", function() { 
    showNewSection("#video")
    changeFooter("white", "black", "black", "class2c");
});

$("#mapToStillButton").on("click", function() { 
    showNewSection("#still")
    changeFooter("white", "black", "black", "class2c");
});

$("#mapToInfoButton").on("click", function() { 
    showNewSection("#info")
    changeFooter("white", "yellow", "yellow", "class2c");
});


/**
 * Image Loading listeners
 */

// Utility
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
                if (displayblock !== -1 ) { // && $("#diary").css("display") !== "block"
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

// listen for next set
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