

"use strict";



/**
 * Import 
 */

import { urlEncode } from "./urlEncode.js";

export const updateUrl = (filterObj, searchType) => {
    setTimeout(() => {
        const /**{String} */ root = window.location.origin;
        const /**{String} */ searchQuery = urlEncode(filterObj);

        window.location = `${root}/pages/${searchType}/${searchType}.html?${searchQuery}`;
    }, 500)
}

