"use strict"; 

/**
 * getBackElement
 * Takes a page and returns the name of the section that will bring you back
 * 
 * @param {string} page - the html element of the page your looking for the back for
 * 
 */

function getBackElement (page) {
	var pageObj;
    try {
        pageObj = getPage(page);
    } catch (e) {
        if (e) {
            console.error("getBackElement() : Can't find page given");
            return "";
        }
    }
	if (pageObj.trace) {
		return pageObj.trace;
	} else if (pageObj.upLinks[0]) {
		return getPage(pageObj.upLinks[0]).htmlElement;
	} else {
		return "";
	}
}

/**
 * getPage
 * Takes a page and returns the object if found
 * 
 * @param {string} page - the html element of the page your looking for
 * 
 */

function getPage (page) {
    var index = pages.findIndex (function (current) { return page === current.htmlElement; });
    if (index === -1) { throw "Can not find page"; }
    else { return pages[index] };
}

/**
 * PageTree
 * 
 */

var pages = [{
    "id": "#new",
    "htmlElement": "#new",
    "tier": 0,
    "downLinks": ["#splash"],
    "upLinks": [],
    "trace": ""
},
{
    "id": "#splash",
    "htmlElement": "#splash",
    "tier": 1,
    "downLinks": ["#menu"],
    "upLinks": ["#new"],
    "trace": ""
},
{
    "id": "#menu",
    "htmlElement": "#menu",
    "tier": 2,
    "downLinks": ["#words", "#music", "#sight"],
    "upLinks": ["#splash"],
    "trace": ""
},
{
    "id": "#music",
    "htmlElement": "#music",
    "tier": 3,
    "downLinks": [],
    "upLinks": ["#menu"],
    "trace": ""
},
{
    "id": "#sight",
    "htmlElement": "#sight",
    "tier": 3,
    "downLinks": [],
    "upLinks": ["#menu"],
    "trace": ""
},
{
    "id": "#words",
    "htmlElement": "#words",
    "tier": 3,
    "downLinks": ["#diary", "#blog"],
    "upLinks": ["#menu"],
    "trace": ""
},
{
    "id": "#blog",
    "htmlElement": "#blog",
    "tier": 4,
    "downLinks": [],
    "upLinks": ["#words"],
    "trace": ""
},
{
    "id": "#diary",
    "htmlElement": "#diary",
    "tier": 4,
    "downLinks": [],                                    // USE THIS DATA STRUCTURE FOR ALL FUTURE DECISIONS.
    "upLinks": ["#words"],                              // PLEASE. 
    "trace": "",                                        // THE INTEGRITY OF THE WEBSITE DEPENDS ON IT.
    "isVisible": false,
    "isLoaded": false,
    "isLoading": false,
    "hasAllData": false
},
{
    "id": "#video",
    "htmlElement": "#video",
    "tier": 4,
    "downLinks": [],
    "upLinks": ["#sight"],
    "trace": ""
},
{
    "id": "#still",
    "htmlElement": "#still",
    "tier": 4,
    "downLinks": [],
    "upLinks": ["#sight"],
    "trace": ""
}]

/**
 * Page object
 */
// example page object

function section () {
    
    this.id = ""
    this.htmlElement = ""
    this.tier = 0
    this.downLinks = []
    this.upLinks = []
    this.trace = ""
    this.isVisible = false
    this.isLoaded = false
    this.isLoading = false
    this.hasAllData = false

    // this.prototype.emitEvent

}