
"use strict";

/**
 * Import 
 */

import { addEventOnElements } from "./utils/event.js";


export const segment = function ($segment, callback) {
    const /** {NodeList} */ $segmentBtns = $segment.querySelectorAll("[data-segment-btn]");
    let /** {NodeList} */  $lastSelectedSegmentBtn = $segment.querySelector("[data-segment-btn].selected");


    addEventOnElements($segmentBtns, "click", function () {
        $lastSelectedSegmentBtn.classList.remove("selected"); // xóa tất cả active
        this.classList.add("selected"); // this = segmentBtn được click
        $lastSelectedSegmentBtn = this; // gán lastSelectedSegment = NÚT VỪA CHỌN
        callback(this.dataset.segmentValue) // gọi callback để gán biến global
    })
}
