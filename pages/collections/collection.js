

"use strict";



/**
 * Imports
 */

import { client } from '../../js/api_configure.js';
import { collectionCard } from './../../js/collection_card.js';


/**
 * Render featured collections 
 */

const /**{NodeElement} */ $collectionGrid = document.querySelector("[data-collection-grid]");

const /**{Number} */ perPage = 30;
let /**{Numner} */ currentPage = 1;
let /**{Numner} */ totalPage = 0;


/**
 * @param {Number} page Page number 
 */
const loadCollections = (page) => {
    client.collections.featured({ perPage: perPage, page: page }, (data) => {
        totalPage = Math.ceil(data.total_results / perPage);
        data.collections.map(collection => {
            const /**NodeElement */ $collectionCard = collectionCard(collection);

            $collectionGrid.appendChild($collectionCard);
        });

        // when photos loaded 
        isLoaded = true;

        // when no more photos found, hide loader 
        if (currentPage >= totalPage) {
            $loader.style.display = "none";
        }
        else {
            $loader.style.display = "block";
        }
    })
}


loadCollections(currentPage);



/**
 * Load more collections 
 */

/**
 * Load more photos 
 */


const /**{NodeElement} */ $loader = document.querySelector("[data-loader]");

let /**{Boolean} */ isLoaded = false;

window.addEventListener("scroll", () => {
    // getBoundingClientRect trả về đối tượng DOMRect, chứa các thuộc tính liên quan
    // đến kích thước, vị trí của phần tử trong cửa sổ hiển thị
    // console.log($loader.getBoundingClientRect().top);
    // console.log(window.innerHeight);
    if ($loader.getBoundingClientRect().top < (window.innerHeight * 2) && currentPage <= totalPage && isLoaded) {
        // điều kiện: khoảng cách từ top của loader element nhỏ hơn chiều dài của cửa sổ window 
        currentPage++;
        loadCollections(currentPage);
        isLoaded = false;

    }

})