
"use strict";


/**
 * 
 * import 
 */
import { urlEncode } from './utils/urlEncode.js'


const /**{String} */ API_KEY = "GOAVXfJtbuKUbycqcRC7DTun0JQ4LZOYFR3HzoZoL83nzlfHkUI3lCWf";

const /**{Function} */ headers = new Headers();
headers.append("Authorization", API_KEY);

const /**{Object} */ requestOptions = { headers };

/**
 * Fetch data from Pexels 
 * @param {* string} url :fetch url
 * @param {* function} successCallback :success callback function
 */

const fetchData = async (url, successCallback) => {
    const /**{Object} */ res = await fetch(url, requestOptions);

    if (res.ok) {
        const /** {Object} */ data = await res.json();
        // console.log(data)
        successCallback(data);
    }
}

let requestUrl = "";
const /** {Object} */ root = {
    default: "https://api.pexels.com/v1/",
    videos: "https://api.pexels.com/v1/videos/"
}


export const /**{Object} */ client = {
    photos: {
        /**
         * search photos
         * @param {obj} parameters : url object 
         * @param {function} callback " callback function"
         */
        search: (parameters, callback) => {
            requestUrl = `${root.default}search?${urlEncode(parameters)}`;
            fetchData(requestUrl, callback);
        },

        /** curated photos 
         * @param {*obj} parameters : URL object 
         * @param {*function} callback " callback function"
         */
        curated: (parameters, callback) => {
            fetchData(`${root.default}curated?${urlEncode(parameters)}`, callback)
        },


        /** get single photo detail 
       * @param {*string} id : Photo ID
       * @param {*function} callback " callback function"
       */
        detail: (id, callback) => {
            fetchData(`${root.default}photos/${id}`, callback)
        }
    },

    videos: {
        /**
         * search videos
         * @param {obj} parameters : url object 
         * @param {function} callback " callback function"
         */
        search: (parameters, callback) => {
            requestUrl = `${root.videos}search?${urlEncode(parameters)}`;
            fetchData(requestUrl, callback);
        },

        /** popular videos
         * @param {*obj} parameters : URL object 
         * @param {*function} callback " callback function"
         */
        popular: (parameters, callback) => {
            fetchData(`${root.videos}popular?${urlEncode(parameters)}`, callback)
        },


        /** get single videos detail
       * @param {*string} id : videos ID
       * @param {*function} callback " callback function"
       */
        detail: (id, callback) => {
            fetchData(`${root.videos}videos/${id}`, callback)

        }
    },

    collections: {
        /**
         * get Featured Collections
         * @param {obj} parameters : url object 
         * @param {function} callback " callback function"
         */
        featured: (parameters, callback) => {
            requestUrl = `${root.default}collections/featured?${urlEncode(parameters)}`;
            fetchData(requestUrl, callback);
        },


        /** get a collection  medias
       * @param {*string} id : collection ID
       * @param {*obj} parameters : url object 
       * @param {*function} callback " callback function"
       */
        detail: (id, parameters, callback) => {
            requestUrl = `${root.default}/collections/${id}?${urlEncode(parameters)}`;
            fetchData(requestUrl, callback)

        }
    }
}
