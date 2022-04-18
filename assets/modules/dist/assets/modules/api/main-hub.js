"use strict";
import { Episode } from "./models/episode.js";
// função geradora de portais:
const creatPortal = async function (numEpi, parentSelector) {
    const parent = document.querySelector(parentSelector);
    const article = document.createElement("article");
    article.className = "item";
    const span = document.createElement("span");
    span.className = "number-episode";
    span.textContent = numEpi.toString();
    article.appendChild(span);
    if (parent instanceof HTMLElement) {
        parent.appendChild(article);
    }
    else {
        throw new Error("'parent' está nula!");
    }
};
const creatAllPortals = async () => {
    const episode = new Episode();
    const episodeAmount = await episode.getNumberOfEpisodes();
    // criação dos portais:
    for (let i = 1; i <= episodeAmount; i++) {
        creatPortal(i, ".all-itens-container");
    }
};
{
    await creatAllPortals();
}
// links para cada portal:
function linkThis() {
    const index = this.children[0].textContent;
    window.location.href = `
    ${window.location.origin}/assets/pages/showcase.html?episode=${index}
  `;
}
const applylinks = function () {
    const allPortals = document.querySelectorAll(".item"); // a lista esta vazia!
    allPortals.forEach((element) => {
        element.addEventListener("click", linkThis);
    });
};
{
    applylinks();
}
