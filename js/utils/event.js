

"use strict";

/**
 * 
 * @param {*} $elements 
 * @param {*} eventType 
 * @param {*} callback 
 */


export const addEventOnElements = ($elements, eventType, callback) => {
    $elements.forEach(element => {
        element.addEventListener(eventType, callback);
    })
}