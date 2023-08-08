/**
 * Lưới masonry là một phong cách bố trí trong thiết kế web, trong đó các phần tử được sắp xếp một cách linh hoạt và tự động điều chỉnh kích thước để tạo ra một giao diện tương tự như một lưới không đều. Phần tử trong lưới masonry có thể có chiều cao khác nhau, tạo ra sự hài hòa và sắp xếp không gian tốt hơn so với các lưới thông thường.
 */

"use strict";

/**
 * Initial columns
 * @param {NodeElement} $gridContainer 
 * @return {Object} column & column height array
 */


export const gridInit = ($gridContainer) => {
    const /**NodeList */ $columns = [];
    const /* {Array} */ columnsHeight = [];

    // getComponentStyle() : truyền vào là phần tử muốn lấy giá trị
    // trường hợp này là gridContainer 
    // lấy giá trị --column-count : số cột trong grid  , trong trường hợp này là 2 

    const /*{Number}*/ columnCount = Number(getComputedStyle($gridContainer).getPropertyValue("--column-count"));


    // sử dụng vòng lặp để tạo ra column tương ứng với countColumn
    for (let i = 0; i < columnCount; i++) {
        // create an element and add new class attribute
        const /*{NodeElement} */ $column = document.createElement("div");
        $column.classList.add("column");

        // insert column to gridContainer
        $gridContainer.appendChild($column);

        // push column to columns (array)
        $columns.push($column);

        // chưa hiểu đoạn này
        columnsHeight.push(0);
        // ??? 

    }

    return {
        $columns, columnsHeight
    }
    // {columns: [], columnsHeight: []}
}

/**
 * Update masonry grid 
 * @param {*NodeElement } $card Grid item
 * @param {*Array} columnHeight Height of all columns 
 * @param {*NodeList} $columns All columns
 */

export const updateGrid = ($card, columnsHeight, $columns) => {
    // min height of columns
    const /*Number*/ minColumnHeight = Math.min(...columnsHeight);
    // min column height 
    const /*Number*/ minColumnIndex = columnsHeight.indexOf(minColumnHeight);

    // mỗi lần lặp qua các phần tử (card) 
    // nó sẽ chèn vào cột có chiều dài nhỏ hơn 
    $columns[minColumnIndex].appendChild($card);

    // gán lại chiều cao của cột có chiều dài nhỏ hơn 
    // bằng với chiều dài mới sau khi được chèn một card mới
    columnsHeight[minColumnIndex] = $columns[minColumnIndex].offsetHeight;
}
