
"use strict";


// import 

import { addEventOnElements } from './utils/event.js';

/**
 * Add menu functon 
 * @param {NodeElement} $menuWrapper // khối lọc 
 * @param {Function} callback  // function callback
 */

export const menu = function ($menuWrapper, callback) {
    const /**{NodeElement} */ $menu = $menuWrapper.querySelector("[data-menu]"); //menu box 
    const /**{NodeList} */ $menuTogglers = $menuWrapper.querySelectorAll("[data-menu-toggler]"); // click vào để open menu, click lại để đóng menu
    const /*{NodeList} */ $menuItems = $menuWrapper.querySelectorAll("[data-menu-item]"); // menu items list 


    // handle toggler when clicked on a menu item
    addEventOnElements($menuTogglers, 'click', () => {
        // tham số thứ nhất là toggler button open/close menu 
        // tham số thứ 2 là tên sự kiện
        // tham số thư 3 là callback function handler 
        $menu.classList.toggle("menu-expanded"); // active css
    })

    // handle close menu box when clicked on a item 

    addEventOnElements($menuItems, "click", function () {
        $menu.classList.remove("menu-expanded");
        // this ở đây là menuItem , tức là cái ta click vào khi chọn một lựa chọn của một menu 
        // vì là sử dụng hàm để map qua từng phần tử xử lý bên addEventOnElements nên this ở đây là 
        // menuIte -> thằng đang thực hiện click  

        // kiểm tra xem có callback được truyền vào khi gọi menu ở bên filter hay không
        // nếu có thì thực hiện lấy nội dung của cái cần lọc và truyền lại cho callback để callback thực hiện tiếp 

        if (callback) {
            callback(this.dataset.menuItem); // nội dung của biến data.menuItem của mỗi cái item
        }
    })
}

// 5:00