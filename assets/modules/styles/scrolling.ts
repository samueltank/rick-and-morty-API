"use strict";

const container: HTMLElement | null = document.querySelector(
  ".carousel-itens-container"
);
const btnLeft: Element | null = document.querySelector(
  ".btn-left"
);
const btnRight: Element | null = document.querySelector(
  ".btn-right"
);

// scroll ao click:
let inMotion: boolean = true;



btnLeft?.addEventListener("click", () => {
  container?.scrollBy(-200, 0);
}, true);
btnRight?.addEventListener("click", () => {
  console.log("clicou direita");
  container?.scrollBy(200, 0);
});

// scroll ao rolar do rodinha do mouse ou deslizar do dedo:
container?.addEventListener("wheel", (event) => {
  
  console.log(event)
  if (event.deltaY > 0) {
    event.preventDefault();
    container.scrollBy(1000, 0);
  } else {
    event.preventDefault();
    container.scrollBy(-1000, 0);
  }
});