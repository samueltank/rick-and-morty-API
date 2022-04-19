"use strict";

import { Episode } from "../api/models/episode.js";
import { Character, Icharacter } from "../api/models/character.js";
import { applyRotate } from "../styles/click-hover.js";

// função para criação de lista numérica para select:
const applyEpisodeList = async function (selector: string) {
  const episode = new Episode();
  const episodeList = document.querySelector(selector);
  const episodeAmount = await episode.getNumberOfEpisodes();

  for (let i = 1; i <= episodeAmount; i++) {
    const option = document.createElement("option");
    option.innerHTML = i.toString();

    if (episodeList instanceof HTMLElement) {
      episodeList.appendChild(option);
    } else {
      throw new Error("O type da variável é diferente de HTMLElement");
    }
  }
};

await applyEpisodeList(".episode-select");

// criação dos cards:

// pegar número do episodeo pela string query:
const getEpisodeByQuery = function (): string | null {
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get("episode");

  return myParam;
};

const checkNull = function (
  prop: string | undefined,
  elem: Icharacter | undefined
): string | Icharacter | undefined {
  if (prop != "") {
    return `type <span>${elem?.type}</span>`;
  } else {
    return "";
  }
};

const creatCards = async function () {
  const episode = getEpisodeByQuery();

  console.log(episode);
  const characters = new Character();
  let arrCards: HTMLElement[];

  if (episode != null) {
    const chars = await characters.getAllCharacters(episode);

    if (chars != undefined) {
      arrCards = chars.map((element) => {
        const div: HTMLElement = document.createElement("div");
        div.className = "flip-container";
        div.innerHTML = `
        <div class="flipper">
        <div class="front">
          <!-- imagem do personagem, proveniente da API -->
          <img
            src="${element?.image}"
            width="50"
            alt=""
            class="img-front-card"
          />
        </div>
  
        <div class="back">
          <!-- status do personagem -->
          <h3 class="title-card">${element?.name}</h3>
          <div class="infos-container">
            <!-- todo: descrever as características do personagem -->
            <div class="info">
              status
              <span>${element?.status}</span>
              species
              <span>${element?.species}</span>
              ${checkNull(element?.type, element)}
              gender 
              <span>${element?.gender}</span>
              origin 
              <span>${element?.origin.name}</span>
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

const applyCard = async function (): Promise<void> {
  const container = document.querySelector(".container-cards");
  const arrCards = await creatCards();
  console.log(arrCards);

  arrCards?.map((element) => {
    applyRotate(element);
    container?.appendChild(element);
  });
};

await applyCard();

// alterar o número do episódio no título da página:

const applyEpisodeNumber = () => {
  const title = document.querySelector(".main-content > .title-main-content");
  if (title != null) {
    title.textContent = `Episode ${getEpisodeByQuery()}`;
  }
};

applyEpisodeNumber();

// carrega uma página específica caso uma opt do select seja selecionada:

type fnSelect = (elem: HTMLSelectElement) => string;
type getElem  = (elemClass: string) => HTMLSelectElement;

function openPageBySelect(
  nbSelect: fnSelect,
  el: getElem
) { 
  const element = el(".episode-select")

  element.addEventListener("change", () => {
    const index = nbSelect(element)
    window.location.href = `
    ${window.location.origin}/rick-and-morty-API/assets/pages/showcase.html?episode=${ index }
  `;
  });
}

function getSelectText(el: HTMLSelectElement): string {
  const value = el.options[el.selectedIndex].text;

  console.log(value)

  if (value != null) {
    return value
  } else {
    throw new Error("Variável vazia!")
  }
}

function getElement(elmClass: string): HTMLSelectElement {
  const element: HTMLSelectElement | null = document.querySelector(elmClass);
  if (element != null) {
    return element;
  } else {
    throw new Error("A variável está nula ou não é um elemento HTML");
  }
}

  // função responsável por abrir a página de acordo com o valor da opt:
openPageBySelect(getSelectText, getElement);
