"use strict";

// necessário tipar pois, infer = element e não HTMLElement
const flipContainer: NodeListOf<HTMLElement> = document.querySelectorAll(
  ".flip-container"
);

const applyRotate = function (element: HTMLElement): boolean {
  try {
    const children = element.children[0];
    children.classList.toggle("click-rotate");

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

flipContainer.forEach(element => { 
  element.addEventListener("click", () => applyRotate(element));
});