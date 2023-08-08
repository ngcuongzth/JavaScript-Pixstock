

"use strict";

/**
 * Import 
 */

import { client } from "./api_configure.js";

/**
 * Add to favorite or remove from favorite
 * @param {NodeElement} $element 
 * @param {String} type  item type eg. 'photos' or 'videos'
 * @param {Number} id Item ID
 */

export const favorite = ($element, type, id) => {
    $element.addEventListener("click", () => {
        // khi favorite button được click

        // lấy favorite object 
        const /*{Object} */ favoriteObj = JSON.parse(localStorage.getItem("favorite"));

        const isFavorite /*Number to Boolean Logical*/ = favoriteObj[type].filter(element => element.id === id).length > 0;
        if (isFavorite) {

            $element.classList.toggle("active");
            // mảng mới, loại bỏ đi card có id với id trong array data
            const newDataArray = favoriteObj[type].filter((obj) => {
                return obj.id !== id;
            })

            favoriteObj[type] = newDataArray;

            localStorage.setItem("favorite", JSON.stringify(favoriteObj));
        } else {
            // add to favorites 
            client[type].detail(id, (data) => {
                // lấy dữ liệu mới sau đó thực hiện thêm active và thêm dữ liệu vào localStorage
                $element.classList.toggle("active");
                favoriteObj[type] = [...favoriteObj[type], data];
                localStorage.setItem("favorite", JSON.stringify(favoriteObj));
            })
        }


    });
}

