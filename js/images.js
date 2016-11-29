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
// NAMED PHOTO LAZY LOAD
// for every image found in an array [specifies order]

// NUMERICAL PHOTO LAZY LOAD
// for the diary, load 10 images first.
// for every image we have, append an img tag to the child of that image section
// once we're on the ith photo, grab the next 10.
// make sure you don't go past all the images up until a point (conditional check)