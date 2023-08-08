



"use strict";


/**
 * Imports
 */



import { client } from '../../js/api_configure.js'
import { ripple } from './../../js/utils/ripple.js';
import { gridInit, updateGrid } from './../../js/utils/masonry_grid.js';
import { videoCard } from './../../js/video_card.js';
import { menu } from './../../js/menu.js';
import { favorite } from '../../js/favorite.js';



/****
 * Add ripple effect
 * 
 */

const /**NodeElement */ $rippleElements = document.querySelectorAll("[data-ripple]");

$rippleElements.forEach($rippleElement => {
    ripple($rippleElement);
})



/**
 * Page transition  
 */

window.addEventListener("loadstart", () => {
    document.body.style.opacity = "0";
})

window.addEventListener("DOMContentLoaded", () => {
    document.body.style.opacity = "1";
})


/**
 * Initial favorite object in local storage
 */

if (!localStorage.getItem("favorite")) {
    const /*Object */ favoriteObj = {
        photos: [],
        videos: []
    };
    localStorage.setItem("favorite", JSON.stringify(favoriteObj));
}



/**
 * Menu toogle
 * 
 */


const /**{NodeList} */ $menuWrappers = document.querySelectorAll("[data-menu-wrapper]");

[...$menuWrappers].map($menuWrapper => {
    menu($menuWrapper);
})





/**
 * Add to favorite
 */

const /**{Object} */ favoriteVideos = JSON.parse(localStorage.getItem("favorite")).videos;

const /**{NodeElement} */ $favoriteBtn = document.querySelector("[data-add-favorite]");

const /*{String} */ videoId = window.location.search.split("=")[1];

const isSaved = Boolean(favoriteVideos.filter(video => video.id === Number(videoId))[0]);
if (isSaved) {
    $favoriteBtn.classList.add('active');
} else {
    $favoriteBtn.classList.remove('active');
}

favorite($favoriteBtn, 'videos', Number(videoId))




/**
 * Render detail data 
 */


const /**{NodeElement} */ $detailWrapper = document.querySelector("[data-detail-wrapper]");
const /**{NodeElement} */ $downloadLink = document.querySelector("[data-download-link]");
const /**{NodeElement} */ $downloadMenu = document.querySelector("[data-download-menu]");




// load detail data image 
client.videos.detail(videoId, (data) => {
    const {
        width, height, image, user: { name: author },
        video_files
    } = data;

    const /*{Object} */ hdVideo = video_files.find(item => item.quality === "hd");
    const { file_type, link } = hdVideo;

    $downloadLink.href = link;

    const menuItems = video_files.map(item => {
        const {
            width,
            height,
            quality,
            link
        } = item;
        return `
        <a href="${link}" class="menu-item" >
            <span class="label-large text">${quality.toUpperCase()}</span>
            <span className="label-large trailing-text">${width}x${height}</span>
            <div class="state-layer"></div>
        </a>`;
    }).join(' ');

    $downloadMenu.innerHTML = menuItems;

    $detailWrapper.innerHTML = `
        <div class="detail-banner" style="aspect-ratio: calc(${width}/${height});">
                <video poster="" controls class="img-cover" data-video>
                    <source src="${link}" type="${file_type}">
                </video>
        </div>
        <p class="title-small">Video by 
            <span class="color-primary">${author}</span>
        </p>
    `;
});



