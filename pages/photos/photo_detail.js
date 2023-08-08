



"use strict";


/**
 * Imports
 */



import { client } from '../../js/api_configure.js'
import { ripple } from './../../js/utils/ripple.js';
import { gridInit, updateGrid } from './../../js/utils/masonry_grid.js';
import { photoCard } from './../../js/photo_card.js';
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

const /**{Object} */ favoritePhotos = JSON.parse(localStorage.getItem("favorite")).photos;

const /**{NodeElement} */ $favoriteBtn = document.querySelector("[data-add-favorite]");

const /*{String} */ photoId = window.location.search.split("=")[1];

const isSaved = Boolean(favoritePhotos.filter(photo => photo.id === Number(photoId))[0]);
if (isSaved) {
    $favoriteBtn.classList.add('active');
} else {
    $favoriteBtn.classList.remove('active');
}

favorite($favoriteBtn, 'photos', Number(photoId))




/**
 * Render detail data 
 */


const /**{NodeElement} */ $detailWrapper = document.querySelector("[data-detail-wrapper]");
const /**{NodeElement} */ $downloadLink = document.querySelector("[data-download-link]");
const /**{NodeElement} */ $downloadMenu = document.querySelector("[data-download-menu]");




// load detail data image 
client.photos.detail(photoId, (data) => {
    const {
        avg_color,
        height,
        width,
        photographer,
        alt,
        src,
    } = data;

    $downloadLink.href = src.original;
    const menuItems = Object.entries(src).map(item => {
        const [key, value] = item;
        return `
        <a href="${value}" class="menu-item" download data-ripple data-menu-item>
            <span class="label-large text">${key}</span>
            <div class="state-layer"></div>
        </a>`;
    }).join(' ');

    $downloadMenu.innerHTML = menuItems;

    $detailWrapper.innerHTML = `
        <figure class="detail-banner img-holder" style="aspect-ratio: calc(${width}/${height}); background-color: ${avg_color}">
            <img src="${src.large2x}" alt=${alt} height=${height} width=${width} class="img-cover">
        </figure>
        <p class="title-small">Photo graph by
            <span class="color-primary">${photographer}</span>
        </p>
    `;

    const /**{NodeElement} */ $detailImg = $detailWrapper.querySelector("img");
    $detailImg.style.opacity = 0;
    $detailImg.addEventListener("load", () => {
        $detailImg.animate({
            opacity: 1
        }, { duration: 400, fill: "forwards" });

        if (alt) {
            client.photos.search({ query: alt, page: 1, per_page: 30 }, (data) => {
                loadSimilar(data);
            })
        }
        else {
            $loader.style.display = "none";
            $photoGrid.innerHTML = "<p style='text-align: center'>No similar photo found.</p>"
        }
    })
})



/**
 * Load similar more 
 * @param {Object} data Photo data  
 */

const /**{NodeElement} */ $photoGrid = document.querySelector("[data-photo-grid]");
const /**{Object} */ photoGrid = gridInit($photoGrid);
const /**{NodeElement} */  $loader = document.querySelector("[data-loader]");


const loadSimilar = (data) => {
    data.photos.map(photo => {
        const /*{NodeElement} */ $card = photoCard(photo);
        updateGrid($card, photoGrid.columnsHeight, photoGrid.$columns);
        $loader.style.display = "none";
    })
}

