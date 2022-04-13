"use strict";
import { Episode } from "../api/models/episode.js";
import { Character } from "../api/models/character.js";
import { addLink } from "../styles/click-hover.js";
// função para criação de lista numérica para select:
const applyEpisodeList = async function (selector) {
    const episode = new Episode();
    const episodeList = document.querySelector(selector);
    const episodeAmount = await episode.getNumberOfEpisodes();
    for (let i = 1; i <= episodeAmount; i++) {
        const option = document.createElement("option");
        option.innerHTML = i.toString();
        if (episodeList instanceof HTMLElement) {
            episodeList.appendChild(option);
        }
        else {
            throw new Error("A variável é diferente de HTMLElement");
        }
    }
};
{
    await applyEpisodeList(".opt-group");
}
// criação dos cards:
// pegar número do episodeo pela string query:
const getEpisodeByQuery = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get("episode");
    return myParam;
};
const creatCards = async function () {
    const episode = getEpisodeByQuery();
    console.log(episode);
    const characters = new Character();
    let arrCards;
    if (episode != null) {
        const chars = await characters.getAllCharacters(episode);
        if (chars != undefined) {
            arrCards = chars.map((element) => {
                const div = document.createElement("div");
                div.className = "flip-container";
                div.innerHTML = `
        <div class="flipper">
        <div class="front">
          <!-- imagem do personagem, proveniente da API -->
          <img
            src="${element === null || element === void 0 ? void 0 : element.image}"
            width="50"
            alt=""
            class="img-front-card"
          />
        </div>
  
        <div class="back">
          <!-- status do personagem -->
          <h3 class="title-card">${element === null || element === void 0 ? void 0 : element.name}</h3>
          <div class="infos-container">
            <!-- todo: descrever as características do personagem -->
            <div class="info">
              status
              <span>${element === null || element === void 0 ? void 0 : element.status}</span>
              species
              <span>${element === null || element === void 0 ? void 0 : element.species}</span>
              type 
              <span>${element === null || element === void 0 ? void 0 : element.type}</span>
              gender 
              <span>${element === null || element === void 0 ? void 0 : element.gender}</span>
              origin 
              <span>${element === null || element === void 0 ? void 0 : element.origin}</span>
            </div>
          </div>
        </div>
      </div>
        `;
                return div;
            });
            return arrCards;
        }
    }
};
const applyCard = async function () {
    const container = document.querySelector(".container-cards");
    const arrCards = await creatCards();
    console.log(arrCards);
    arrCards === null || arrCards === void 0 ? void 0 : arrCards.map((element) => {
        container === null || container === void 0 ? void 0 : container.appendChild(element);
    });
};
await applyCard();
// alterar o número do episódio:
const applyEpisodeNumber = () => {
    const title = document.querySelector(".main-content > .title-main-content");
    if (title != null) {
        title.textContent = `Episode ${getEpisodeByQuery()}`;
    }
};
applyEpisodeNumber();
addLink(); // fazer funcionar 
