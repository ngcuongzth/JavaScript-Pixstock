

"use strict";

/**
 * Import 
 */

import { ripple } from './utils/ripple.js';
import { favorite } from './favorite.js';

/**
 * Create photo card 
 * @param {Object} photo Photo object 
 * @return Photo Card - Photo card component
 */

export const photoCard = photo => {
    const /**{String} */ root = window.location.origin;
    const { alt, avg_color: backgroundColor,
        width,
        height,
        id,
        src: { large }
    } = photo;


    const /**NodeElement */ $card = document.createElement("div");
    $card.classList.add("card", "grid-item");
    $card.style.backgroundColor = backgroundColor;


    const /*Object */ favoriteObj = JSON.parse(localStorage.getItem("favorite"));
    const isFavorite = favoriteObj.photos.filter(photo => photo.id === id).length > 0;

    $card.innerHTML = `
        <figure class="card-banner" style="--width: ${width}; --height: ${height};">
            <img src="${large}" width="${width}" height="${height}" loading="lazy" class="card-content" alt="${alt}">
        </figure>
        <div class="card-content">
            <button class="icon-btn small ${isFavorite ? "active" : ""}" aria-label="Add to favorite" data-ripple data-favorite-btn>
                <span class="material-symbols-outlined" aria-hidden="true">favorite</span>
                <div class="state-layer"></div>
            </button>
        </div>
        <a href="${root}/pages/photos/photo_detail.html?id=${id}" class="state-layer"></a>
    `;

    const $cardBanner = $card.querySelector("img");
    $cardBanner.style.opacity = 0;
    $cardBanner.addEventListener("load", function () {
        this.animate({ opacity: 1 }, { duration: 400, fill: "forwards" });
    })

    const /**{NodeList} */ $rippleElements = [$card, ...$card.querySelectorAll("[data-ripple]")];

    $rippleElements.map($rippleElement => {
        ripple($rippleElement);
    })

    const /**{NodeElement} */ $favoriteBtn = $card.querySelector("[data-favorite-btn]");
    // favorite function được call khi click vào favorite button 
    favorite($favoriteBtn, "photos", id);
    return $card;
}


