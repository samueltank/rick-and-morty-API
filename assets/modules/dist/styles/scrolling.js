"use strict";
const container = document.querySelector(".carousel-itens-container");
const btnLeft = document.querySelector(".btn-left");
const btnRight = document.querySelector(".btn-right");
btnLeft === null || btnLeft === void 0 ? void 0 : btnLeft.addEventListener("click", () => {
    console.log("clicou esquerda!");
    container === null || container === void 0 ? void 0 : container.scrollBy(-1050, 0);
});
btnRight === null || btnRight === void 0 ? void 0 : btnRight.addEventListener("click", () => {
    console.log("clicou direita");
    container === null || container === void 0 ? void 0 : container.scrollBy(1050, 0);
});
