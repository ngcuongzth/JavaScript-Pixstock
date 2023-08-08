

"use strict";


/**
 * @param {NodeElement} $card 
 */

export const hoverOnPlay = ($card) => {
    const /*{NodeElement} */ $cardVideo = $card.querySelector("[data-video]");
    const /*{NodeElement} */ $cardBadge = $card.querySelector("[data-card-badge]");

    let /*{Boolean} */ isPlaying = false;
    let /*{Function} */ playTimeout;

    $card.addEventListener("pointerover", function () {
        playTimeout = setTimeout(() => {
            $cardBadge.style.display = "none";
            // promise
            $cardVideo.play().then(res => {
                isPlaying = true;
            }).catch(err => isPlaying = false);
        }, 500)
    })

    $card.addEventListener("pointerout", () => {
        playTimeout && clearTimeout(playTimeout);
        $cardBadge.style.display = "grid";
        if (isPlaying) {
            $cardVideo.pause();
        }
    })
}

