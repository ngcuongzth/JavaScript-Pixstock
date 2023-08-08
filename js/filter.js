
"use strict";


import { menu } from "./menu.js";


/**
 * Add filter functionality
 * 
 * @param {Node} $filterWrapper Filter wrapper  
 * @param {Object } filterObj Filter object 
 * @param {Function} callback Callback function
 */

export const filter = ($filterWrapper, filterObj, callback) => {

    const /*{NodeElement} Nút clear  */ $filterClearBtn = $filterWrapper.querySelector("[data-filter-clear]"); // nút clear nằm trong filter chip (box filter)
    const /**{NodeElement}  */ $filterValue = $filterWrapper.querySelector("[data-filter-value"); // element chứa nội dung danh mục lọc eg: color, size, orientation... <span> => nữa sẽ dùng để thay đổi nội dung 
    const /**{NodeElement} */ $filterChip = $filterWrapper.querySelector("[data-filter-chip]"); // box filter 
    const /**{NodeElement} */ $filterColorField = $filterWrapper.querySelector("[data-color-field]"); // input color field 
    const /**{String} */ filterKey = $filterWrapper.dataset.filter; // loại filter (category)
    const /**{Object} */ newObj = filterObj; // gán giá trị mới newObj = đối tượng filter được tuyền vào(global value)  {} 

    menu($filterWrapper, (filterValue) => {
        // callback này thực hiện thay đổi nội dung text của category 
        $filterValue.innerText = filterValue;
        // thêm class cho filterChip
        $filterChip.classList.add("selected");
        newObj[filterKey] = filterValue;
        // {
        //     "orientation": "square",
        //         "size": "small"
        // }

        //callback, hàm được truyền từ photos.js 
        callback(newObj);

    })
    // bấm vào nút clear btn 
    $filterClearBtn.addEventListener("click", () => {
        // clear class from filter chip 
        $filterChip.classList.remove("selected");
        // remove filter text replace by origin filter text
        $filterValue.innerText = $filterValue.dataset.filterValue;
        // remove filter key 
        delete newObj[filterKey];

        // re-callback 
        callback(newObj);
    })


    $filterColorField?.addEventListener("change", (e) => {

        const /**String */ filterValue = $filterColorField.value.toLowerCase().replace("#", "");
        $filterValue.innerText = `#${filterValue}`;
        $filterChip.classList.add("selected");
        newObj[filterKey] = filterValue;
        callback(newObj)
        $filterClearBtn.addEventListener("click", () => {
            // clear class from filter chip 
            $filterChip.classList.remove("selected");
            // remove filter text replace by origin filter text
            $filterValue.innerText = $filterValue.dataset.filterValue;
            // remove filter key 
            delete newObj[filterKey];

            // re-callback 
            callback(newObj);
        })
    })
}


