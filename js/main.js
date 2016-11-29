/*
 * 
 * Considering following the idiomatic style guide
 * https://www.npmjs.com/package/eslint-config-idiomatic
 * https://github.com/rwaldron/idiomatic.js
 * 
 */


/**
 * @global {String} currentPage - string containing the element tag of the page you're on 
 * @global {Boolean} pageIsLoading - is true if an animation loading a section is in progress 
 */
var currentPage = "";
var pageIsLoading = false;

/**
 * Navigates from the currently loaded section to the section provided (loading section).
 * It performs an animation that fades out the current section, then fades in the loading section.
 *
 * @param {String} loadingSection - another div to be fading in
 * @returns {Boolean} true if successful
 * 
*/

function showNewSection (loadingSection) {
    if (!loadingSection) {
        return false; // loadingSection isn't defined
    } else if (pageIsLoading) {
        return false; // Page is already loading
    } else if (currentPage !== loadingSection) {
        fadeOutPage(currentPage);
        fadeInPage(loadingSection);
    }
    return true;
}

/**
 *  Fades in a section
 * 
 * @param {String} page - section to be faded in
 * @returns {Boolean} true if successful
 */

function fadeInPage (page, _cb) {
    if (pageIsLoading === false) {
        // make sure opacity is 0 & then the object is there
        $(page).css("opacity", 0);
        // $(page).css("display", "block");

        // fade in next section
        $(page).velocity("fadeIn", {
            delay: 70,
            duration: 500,
            easing: "easeInSine",
            begin: function () {
                pageIsLoading = true;
            },
            complete: function () {
                // console.log("Finished Fade In")
                window.pageIsLoading = false;
                window.currentPage = page;
                if (_cb) { _cb(); return true; } else { return true; }
            }
        });
    } else {
        // prevents fast clicking of the buttons from overloading the function
        return false;
    }
}


/**
 *  Fades out a section
 * 
 * @param {String} page - section to be faded out
 * @returns {Boolean} true if successful
 */

function fadeOutPage (page, _cb) {
    if (pageIsLoading === false) {
        var displayOfPage = $(page).css("display");
        // make sure it's not fading out a hidden or non existant element
        if ( displayOfPage !== undefined && displayOfPage !== "none") {
            $(page).velocity("fadeOut", {
                delay: 60,
                duration: 450,
                begin: function () {
                    pageIsLoading = true;
                },
                // hide the current section when faded out
                complete: function () {
                    $(page).css("display", "none");
                    window.pageIsLoading = false;
                    if (_cb) { _cb(); return true; } else { return true; }
                },
                easing: "ease-out"
            });
        } else {
            pageIsLoading = false;
            return false; // Page isn't loaded
        }
    } else {
        return false; // Page is already loading
    }
}

/**
 * Changes the footer style
 * 
 * @param a color that will be applied to the element
 * @param {string} aClass - a HTML element, class, or id.
 * @returns {boolean} true if successful
 * 
 */

function changeFooter(bgColor, fillColor, fontColor, aClass) {
    var footer = $("footer");
    footer.css("background-color", bgColor);
    footer.find("#backButton").css("color", fillColor);
    footer.find("svg").css("fill", fillColor);
    footer.find("input").css("border", "2px " + fillColor + " solid");
    footer.find("input").css("color", fillColor);

    var aChildren = $("footer").find("a");
    aChildren.css("color", fontColor);
    aChildren.removeClass();
    aChildren.addClass(aClass);

    return true;
}

// LOOPHOLE RANDOMIZER
function randomlinks() {
    var myrandom = Math.round(Math.random() * 12)
    var links = new Array()
    links[0] = "labyrinth/040615.html"
    links[1] = "labyrinth/040715.html"
    links[2] = "labyrinth/040815.html"
    links[3] = "labyrinth/040915.html"
    links[4] = "labyrinth/041015.html"
    links[5] = "labyrinth/041315.html"
    links[6] = "labyrinth/041415.html"
    links[7] = "labyrinth/041715.html"
    links[8] = "labyrinth/042115.html"
    links[9] = "labyrinth/042215.html"
    links[10] = "labyrinth/051815.html"
    links[11] = "labyrinth/072716.html"
    window.location = links[myrandom]
}

/**
 * Changes the background image positions for OGOD pages
 */

var s = false;

function r() {
    $("#bgi").width($(window).width() * 21);
    $("#bgi").height($(window).height() * 21);
}

$("#bgi").on("load", (function () {
    $("#bgi").css("visibility", "visible");
    r();
    var f = 0;
    setInterval(function () {
        $("#bg").css("left", "-" + ((f % 21) * $(window).width()) + "px");
        $("#bg").css("top", "-" + ((Math.floor(f / 21)) * $(window).height()) + "px");
        f = f + 1;
        if (f == 410) f = 0;
    }, 120);
}));

$(window).resize(function () { r(); });


/**
 * Document on load functions
 */

$(document).ready(function () {
    // Goes to the section in the URL
    if (window.location.hash) {
        $(window.location.hash).css("display", "block");
        currentPage = window.location.hash;
    } else {
        $("#new").css("display", "block");
        currentPage = "#new";
    }
});