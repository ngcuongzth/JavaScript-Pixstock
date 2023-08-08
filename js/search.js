"use strict";

/**
 * Import
 */

import { addEventOnElements } from "./utils/event.js";
import { ripple } from "./utils/ripple.js";
import { segment } from "./segment_btn.js";
import { updateUrl } from "./utils/updateUrl.js";
import { urlDecode } from "./utils/urlDecode.js";

/*
 * search view toggle in small solution devices
 */

const /** {NodeList}  */ $searchTogglers = document.querySelectorAll(
    "[data-search-toggler]"
);

const /** {NodeElement}* */ $searchView =
    document.querySelector("[data-search-view]");

addEventOnElements($searchTogglers, "click", () => {
    $searchView.classList.toggle("show");
});

/*
 * Search Clear
 */

const /** {NodeElement} */ $searchField = document.querySelector(
    "[data-search-field]"
);

const /** {NodeElement} */ $searchClearBtn = document.querySelector(
    "[data-search-clear-btn]"
);

$searchClearBtn.addEventListener("click", () => {
    $searchField.value = "";
});

/*
 * Search type
 */

const /** {NodeElement}* */ $searchSegment = document.querySelector(
    "[data-segment='search']"
);

const /** {NodeElement}* */ $activeSegmentBtn = $searchSegment.querySelector(
    "[data-segment-btn].selected"
);

window.searchType = $activeSegmentBtn.dataset.segmentValue;
// init global variable

segment($searchSegment, (segmentValue) => {
    window.searchType = segmentValue;
});

/*
 * Search Submit
 */

const /** {NodeElement}* */ $searchBtn =
    document.querySelector("[data-search-btn]");

$searchBtn.addEventListener("click", () => {
    const /** {NodeElement} */ $searchValue = $searchField.value.trim();
    if ($searchValue) {
        updateSearchHistory($searchValue);
        window.filterObj.query = $searchValue;
        updateUrl(window.filterObj, window.searchType);
    }
});

/**
 * Submit search when press on "enter"
 */

$searchField.addEventListener("", (e) => {
    if (e.key === "Enter" && $searchField.value.trim()) {
        $searchBtn.click();
    }
})


/*
 * Search History
 */
// initial search history
let /** {Object} */ searchHistory = {
    items: [],
};

if (localStorage.getItem("search_history")) {
    searchHistory = JSON.parse(localStorage.getItem("search_history"));
} else {
    localStorage.setItem("search_history", JSON.stringify(searchHistory));
}

// update search history
const updateSearchHistory = (searchValue) => {
    if (searchHistory.items.includes(searchValue)) {
        searchHistory.items.splice(searchHistory.items.indexOf(searchValue), 1);
        // nếu đã tồn tại thì nó sẽ xóa phần tử cũ
    }
    searchHistory.items.unshift(searchValue); // có phần tử mới thì đẩy lên đầu mảng
    localStorage.setItem("search_history", JSON.stringify(searchHistory));
};

/*
 * Render the search history
 */

const /** {NodeElement}* */ $searchList =
    document.querySelector("[data-search-list]");

const /** {Number} */ historyLength = searchHistory.items.length;

for (let i = 0; i < historyLength & i <= 6; i++) {
    const /** {NodeElement} */ $listItem = document.createElement("button");
    $listItem.classList.add("list-item");

    $listItem.innerHTML = `
    <span class="material-symbols-outlined leading-icon" aria-hidden="true">history</span>
    <span class="body-large text">${searchHistory.items[i]}</span>
    <div class="state-layer"></div>
    `;
    ripple($listItem);

    $listItem.addEventListener("click", () => {
        $searchField.value = $listItem.children[1].textContent;
        $searchBtn.click();
    })

    $searchList.appendChild($listItem);
}


/**
 * Show searched value in search field after reload
 */
const /*{Object} */ search = urlDecode(window.location.search.slice(1));
if (search.query) {
    $searchField.value = search.query;
}


