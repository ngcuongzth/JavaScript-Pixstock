

"use strict";

/**
 * 
 * Import 
 */
import { ripple } from "./utils/ripple.js";

/**
 * 
 * @param {NodeElement} $card card object 
 */

export const collectionCard = (collection) => {
    const /**{String} */ root = window.location.origin;

    const {
        id,
        title,
        media_count
    } = collection;

    const /*{NodeElement}*/  $card = document.createElement("div");
    $card.classList.add("grid-card", "list-item", "two-line");
    $card.setAttribute("title", title);

    $card.innerHTML = `
        <div>
            <h3 class="body-large">${title}</h3>
            <p class="body-medium label">${media_count} media</p>
        </div>
        <a href="${root}/pages/collections/collection_detail.html?collectionId=${id}&title=${title}" class="state-layer"></a>
    `;

    ripple($card);
    return $card;

}