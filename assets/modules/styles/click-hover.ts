"use strict";

export const applyRotate = function (element: HTMLElement) {
  element.addEventListener("click", function () {
    const children = element.children[0];
    children.classList.toggle("click-rotate");
  });
}