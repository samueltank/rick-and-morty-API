"use strict";
const container = document.querySelector(".carousel-itens-container");
const btnLeft = document.querySelector(".btn-left");
const btnRight = document.querySelector(".btn-right");
// scroll ao click:
let inMotion = true;
btnLeft === null || btnLeft === void 0 ? void 0 : btnLeft.addEventListener("click", () => {
    container === null || container === void 0 ? void 0 : container.scrollBy(-200, 0);
}, true);
btnRight === null || btnRight === void 0 ? void 0 : btnRight.addEventListener("click", () => {
    console.log("clicou direita");
    container === null || container === void 0 ? void 0 : container.scrollBy(200, 0);
});
// scroll ao rolar do rodinha do mouse ou deslizar do dedo:
container === null || container === void 0 ? void 0 : container.addEventListener("wheel", (event) => {
    console.log(event);
    if (event.deltaY > 0) {
        event.preventDefault();
        container.scrollBy(1000, 0);
    }
    else {
        event.preventDefault();
        container.scrollBy(-1000, 0);
    }
});
