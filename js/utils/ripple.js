"use strict";

// custom ripple effect on an element 

export const ripple = ($rippleElement) => {
    $rippleElement.addEventListener("pointerdown", function (e) {
        // console.log(this); // this is $rippleElêmnt
        // block bubble event
        e.stopImmediatePropagation()

        const /***{NodeElement} */ $ripple = document.createElement("div");
        $ripple.classList.add("ripple"); // add css
        this.appendChild($ripple);

        const removeRipple = () => {
            $ripple.animate({
                opacity: 0
            }, { fill: "forwards", duration: 200 });

            setTimeout(() => {
                $ripple.remove();
            }, 1000)
        }

        this.addEventListener("pointerup", removeRipple)
        this.addEventListener("pointerleave", removeRipple)

        const /**{Boolean} */ isNotIconButton = !this.classList.contains("icon-btn");
        // nếu có attribute "data-ripple" mà không chứa class "icon-btn"
        if (isNotIconButton) {
            const /** {Number} */ rippleSize = Math.max(this.clientWidth, this.clientHeight);

            $ripple.style.top = `${e.layerY}px`;
            $ripple.style.left = `${e.layerX}px`;
            $ripple.style.width = `${rippleSize}px`;
            $ripple.style.height = `${rippleSize}px`;
        }
    })
}

