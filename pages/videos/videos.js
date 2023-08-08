
"use strict";

import { client } from "../../js/api_configure.js";
import { gridInit, updateGrid } from "../../js/utils/masonry_grid.js";
import { updateUrl } from "../../js/utils/updateUrl.js"
import { urlDecode } from '../../js/utils/urlDecode.js';
import { filter } from "../../js/filter.js";
import { videoCard } from './../../js/video_card.js';


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
        updateUrl(newObj, "videos");
        // console.log(window.filterObj);
    })

})





/**
 * Render popular or searched videos 
 * If searched something then render searched videos 
 * Otherwise render popular videos 
 */

const  /**{NodeElement} */ $videoGrid = document.querySelector("[data-video-grid");
const /**{NodeElement} */ $title = document.querySelector("[data-title]");
const /**{Object} */ videoGrid = gridInit($videoGrid);
const /**{Number} */ perPage = 30;
let /** {Number} */ currentPage = 1;
let /** {Number} */ totalPage = 0;
const /**{String} */ searchUrl = window.location.search.slice(1);

let /**{Object} */ searchObj = searchUrl && urlDecode(searchUrl);
const /**{String} */ title = searchObj ? `${searchObj.query} videos` : "Popular videos";


$title.textContent = title;
document.title = title;


/**
 * Render all videos
 */

/**
 * 
 * @param {Number} currentPage current page number
 */

const renderVideos = (currentPage) => {
    client.videos[searchObj ? "search" : "popular"]({ ...searchObj, per_page: perPage, page: currentPage }, (data) => {
        // "https://api.pexels.com/v1/search/?page=1&per_page=30&query=nature"

        totalPage = Math.ceil(data.total_results / perPage);
        data.videos.map(video => {
            const /*{NodeElement} */ $videoCard = videoCard(video);
            updateGrid($videoCard, videoGrid.columnsHeight, videoGrid.$columns)
        });

        // when videos loaded 
        isLoaded = true;

        // when no more videos found, hide loader 
        if (currentPage >= totalPage) {
            $loader.style.display = "none";
        }
        else {
            $loader.style.display = "block";
        }
    });

}

renderVideos(currentPage);



/**
 * Load more videos 
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
        renderVideos(currentPage);
        isLoaded = false;

    }

})




// 5:54