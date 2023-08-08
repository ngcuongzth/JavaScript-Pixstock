
"use strict";

import { client } from "../../js/api_configure.js";
import { gridInit, updateGrid } from "../../js/utils/masonry_grid.js";
import { updateUrl } from "../../js/utils/updateUrl.js"
import { photoCard } from "../../js/photo_card.js";
import { urlDecode } from '../../js/utils/urlDecode.js';
import { filter } from "../../js/filter.js";


/**
 * Show filter bar if searched anything 
 */

const /**{NodeElement} */ $filterBar = document.querySelector("[data-filter-bar]");

if ($filterBar) {
    $filterBar.style.display = window.location.search ? "flex" : "none";
}


/**
 * Init filter 
 */

const /**{NodeList} */ $filterWrappers = document.querySelectorAll("[data-filter]");
// các elements bộ lọc 

[...$filterWrappers].map(($filterWrapper) => {
    // tham số thứ nhất là các filterWrapper item 
    // tham số thứ hai là biến global window.filterObj
    // tham số thứ ba là một callback function 
    filter($filterWrapper, window.filterObj, (newObj) => {

        // newObj = {
        //     "orientation": "square",
        //         "size": "small",
        // "color" : "#fff"
        // }

        window.filterObj = newObj;
        updateUrl(newObj, "photos");
        // console.log(window.filterObj);
    })

})





/**
 * Render curated or searched photos 
 * If searched something then render searched photos 
 * Otherwise render curated photos 
 */

const  /**{NodeElement} */ $photoGrid = document.querySelector("[data-photo-grid");
const /**{NodeElement} */ $title = document.querySelector("[data-title]");
const /**{Object} */ photoGrid = gridInit($photoGrid);
const /**{Number} */ perPage = 30;
let /** {Number} */ currentPage = 1;
let /** {Number} */ totalPage = 0;
const /**{String} */ searchUrl = window.location.search.slice(1);

let /**{Object} */ searchObj = searchUrl && urlDecode(searchUrl);
const /**{String} */ title = searchObj ? `${searchObj.query} photos` : "Curated photos";


$title.textContent = title;
document.title = title;


/**
 * Render all photos
 */

/**
 * 
 * @param {Number} currentPage current page number
 */

const renderPhotos = (currentPage) => {
    client.photos[searchObj ? "search" : "curated"]({ ...searchObj, per_page: perPage, page: currentPage }, (data) => {
        // "https://api.pexels.com/v1/search/?page=1&per_page=30&query=nature"

        totalPage = Math.ceil(data.total_results / perPage);
        data.photos.map(photo => {
            const /*{NodeElement} */ $photoCard = photoCard(photo);
            updateGrid($photoCard, photoGrid.columnsHeight, photoGrid.$columns)
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
    });

    // ...curated
}

renderPhotos(currentPage);



/**
 * Load more photos 
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
        renderPhotos(currentPage);
        isLoaded = false;

    }

})