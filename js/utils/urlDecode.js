
"use strict";


/**
 * Convert Url to Object 
 * @param {String} urlString Url string 
 * @return {Object} Url Object
 */

export const urlDecode = (urlString) => {

    return Object.fromEntries(urlString.replace(/%23/g, "#").replace(/%20/g, " ").split("&").map(i => i.split("=")));

}

