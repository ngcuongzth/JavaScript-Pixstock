"use strict";

const /** {NodeElement} */ $HTML = document.documentElement;
let /** {Boolean} */ isDark = window.matchMedia("(pref-color-scheme: dark)").matches;

if (sessionStorage.getItem("theme")) {
    $HTML.dataset.theme = sessionStorage.getItem("theme");
} else {
    sessionStorage.setItem("theme", "light");
    $HTML.dataset.theme = isDark ? "dark" : "light";
}

const changeTheme = () => {
    isDark = sessionStorage.getItem("theme");
    sessionStorage.setItem("theme", isDark === "light" ? "dark" : "light");
    $HTML.dataset.theme = sessionStorage.getItem("theme");
}

window.addEventListener("load", () => {
    const /** {NodeElement} */ $themeBtn = document.querySelector("[data-theme-toggler]");
    $themeBtn.addEventListener("click", changeTheme)
})
