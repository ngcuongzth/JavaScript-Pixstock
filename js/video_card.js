
"use strict";

/**
 * Import 
 */


import { ripple } from './utils/ripple.js';
import { favorite } from './favorite.js';
import { hoverOnPlay } from './utils/hoverOnPlay.js';


/**
 * 
 * @param {Object} video 
 * @return Video Card - Video card component
 */

export const videoCard = video => {
    const /**{String} */ root = window.location.origin;

    const {
        height,
        width,
        id,
        image,
        video_files
    } = video;


    const /*{Object} */ sdVideo = video_files.find(item => item.quality === "sd" && item.width < 1000);
    const { file_type, link } = sdVideo;

    const /* {NodeElement} */ $card = document.createElement("div");
    $card.classList.add("card", "video", "grid-item");

    const /*Object */ favoriteObj = JSON.parse(localStorage.getItem("favorite"));
    const isFavorite = favoriteObj.videos.filter(video => video.id === id).length > 0;


    $card.innerHTML = `
    <div class="card-banner" style="--width: ${width}; --height: ${height}">
        <video poster="${image}" muted loop preload ="none" class="img-cover" data-video>
            <source src="${link}" type="${file_type}">
        </video>
    </div>
    <div class="card-content">
            <button class="icon-btn small ${isFavorite ? "active" : ""}" aria-label="Add to favorite" data-ripple data-favorite-btn>
                <span class="material-symbols-outlined" aria-hidden="true">favorite</span>
                <div class="state-layer"></div>
            </button>
    </div>
    <div class="card-badge" data-card-badge>
        <span class="material-symbols-outlined" aria-hidden="true">play_arrow</span>
    </div>
    <a href = "${root}/pages/videos/video_detail.html?id=${id}" class="state-layer"></a>
    `;


    const /**{NodeList} */ $rippleElements = [$card, ...$card.querySelectorAll("[data-ripple]")];

    $rippleElements.map($rippleElement => {
        ripple($rippleElement);
    })

    const /**{NodeElement} */ $favoriteBtn = $card.querySelector("[data-favorite-btn]");
    // favorite function được call khi click vào favorite button 
    favorite($favoriteBtn, "videos", id);

    hoverOnPlay($card);

    return $card;

}