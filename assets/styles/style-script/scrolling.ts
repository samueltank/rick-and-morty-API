"use strict";

const container: Element | null = document.querySelector(
  ".carousel-itens-container"
);
const btnLeft: Element | null = document.querySelector(
  ".btn-left"
);
const btnRight: Element | null = document.querySelector(
  ".btn-right"
);

btnLeft?.addEventListener("click", () => {
  console.log("clicou esquerda!");
  container?.scrollBy(-1050, 0);
});
btnRight?.addEventListener("click", () => {
  console.log("clicou direita");
  container?.scrollBy(1050, 0);
});