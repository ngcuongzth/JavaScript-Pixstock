"use strict";
// convert object to string url


export const urlEncode = (urlObj) => {
    return Object.entries(urlObj).join("&").replace(/,/g, "=").replace(/#,/g, "%23");
    // return to string
    // array.entries(): chuyển đối tượng thành một mảng các cặp khóa-giá trị
    // { query: 'mountain', category: 'nature' } => [['query', 'mountain'], ['category', 'nature']]
    // join(&): nối các cặp element => 
    // replace(/,/g, "=").replace(/#,/g, "%23"): thay thế dấu phẩy (,) thành (=) query=mountain&category=nature
    // replace(/#,/g, "%23") thay thế dấu (#) thành %23

    // eg : "?query=mountain"
}