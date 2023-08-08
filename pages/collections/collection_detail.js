
"use strict";


/** 
 * Imports 
 */

import { client } from "../../js/api_configure.js";
import { gridInit, updateGrid } from '../../js/utils/masonry_grid.js';
import { photoCard } from '../../js/photo_card.js';
import { videoCard } from '../../js/video_card.js';
import { urlDecode } from "../../js/utils/urlDecode.js";


/**
 * Render collection medias
 */

const /**{NodeElement} */ $collectionGrid = document.querySelector("[data-collection-grid]");
const /*{NodeElement} */ $title = document.querySelector("[data-title]");
const /**{Object} */ collectionGrid = gridInit($collectionGrid);
const /**{Number} */ perPage = 30;
let /** {Number} */ currentPage = 1;
let /** {Number} */ totalPage = 0;

const /*{Object} */ collectionObj = urlDecode(window.location.search.slice(1));

$title.textContent = `${collectionObj.title} collections`;
document.title = `${collectionObj.title} collections`;



/**
 * @param {Number} page Current page 
 */
const loadCollection = (page) => {
    client.collections.detail(collectionObj.collectionId, { per_page: perPage, page: page }, (data) => {

        totalPage = Math.ceil(data.total_results / perPage);
        data.media.map(item => {
            let $card;
            switch (item.type.toLowerCase()) {
                case "photo":
                    $card = photoCard(item);
                    break;
                case "video":
                    $card = videoCard(item)
                    break;

            }
            updateGrid($card, collectionGrid.columnsHeight, collectionGrid.$columns);
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
    })
}

loadCollection(currentPage)


/**
 * Load more collection 
 */

const /**{NodeElement} */ $loader = document.querySelector("[data-loader]");

let /**{Boolean} */ isLoaded = true;

window.addEventListener("scroll", () => {
    // getBoundingClientRect trả về đối tượng DOMRect, chứa các thuộc tính liên quan
    // đến kích thước, vị trí của phần tử trong cửa sổ hiển thị
    // console.log($loader.getBoundingClientRect().top);
    // console.log(window.innerHeight);
    if ($loader.getBoundingClientRect().top < (window.innerHeight * 2) && currentPage <= totalPage && isLoaded) {
        // điều kiện: khoảng cách từ top của loader element nhỏ hơn chiều dài của cửa sổ window 
        currentPage++;
        loadCollection(currentPage)
        isLoaded = false;

    }

})