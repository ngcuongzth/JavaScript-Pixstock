"use strict";



/***
 * Import files 
 */

import { ripple } from "./utils/ripple.js";
import { addEventOnElements } from './utils/event.js'
import { urlDecode } from "./utils/urlDecode.js";




/***** 
 * Header on-scroll state
 */

const /**{NodeElement} */ $header = document.querySelector("[data-header]");

window.addEventListener("scroll", () => {
    // classList is an array 
    // includes some classes 
    // $header.classList[window.scrollY > 50 ? "add" : "remove"]("scroll");
    // classList returns a DOMTokenList, "add" and "remove" are method with "active" is argument
    if (window.scrollY > 50) {
        $header.classList.add("scroll");
    } else {
        $header.classList.remove("scroll");
    }
})

/****
 * Add ripple effect
 * 
 */

const /**NodeElement */ $rippleElements = document.querySelectorAll("[data-ripple]");

$rippleElements.forEach($rippleElement => {
    ripple($rippleElement);
})

/**
 * Navbar toggler 
 */

const /**{NodeElement} */ $navTogglers = document.querySelectorAll("[data-nav-toggler]");

const /**{NodeElement} */ $navbar = document.querySelector("[data-navigation]");

const /**{NodeElement} */ $scrim = document.querySelector("[data-scrim]");

addEventOnElements($navTogglers, "click", () => {
    $navbar.classList.toggle("show");
    $scrim.classList.toggle("active");
})


/**
 *  Filter functionality
 */

window.filterObj = {};



/**
 * 
 * Show all filtered options after reload 
 */

if (window.location.search.slice(1)) {
    // ?query=vietnam
    // convert string to object 
    const /** */ search = urlDecode(window.location.search.slice(1));


    Object.entries(search).map(item => {
        const /** {String}*/ filterKey = item[0];
        const /** {String} */ filterValue = item[1];
        window.filterObj[filterKey] = filterValue;

        if (filterKey !== "query") {
            const $filterItem = document.querySelector(`[data-filter="${filterKey}"]`);

            $filterItem?.querySelector("[data-filter-chip]").classList.add("selected");

            if ($filterItem) {
                if ($filterItem.dataset.filter === "color") {
                    $filterItem.querySelector("[data-filter-value]").innerText = "#" + filterValue;
                }
                else {
                    $filterItem.querySelector("[data-filter-value]").innerText = filterValue;
                }
            }
        }
    })

}


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
 * Page transition  
 */

window.addEventListener("loadstart", () => {
    document.body.style.opacity = "0";
})

window.addEventListener("DOMContentLoaded", () => {
    document.body.style.opacity = "1";
})