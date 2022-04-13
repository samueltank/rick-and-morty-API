"use strict";

import { Episode } from "../api/models/episode.js";
import { Character } from "../api/models/character.js";
import { Console } from "console";

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
      throw new Error("A variável é diferente de HTMLElement");
    }
  }
};

{ await applyEpisodeList(".opt-group"); }

// criação dos cards:

// pegar número do episodeo pela string query:
const getEpisodeByQuery = function (): string | null {
  const urlParams = new URLSearchParams(
    window.location.search
  );
  const myParam = urlParams.get("episode");
  
  return myParam;
} 

const creatCards = async function () {
  const episode    = getEpisodeByQuery();
  const characters = new Character();

  if (episode != null) {
    const chars = await characters.getAllCharacters(
      episode
    );
    
    if (chars != undefined) {
      const arrCards = chars.map(element => {
        const div = document.createElement("div");
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
              type 
              <span>${element?.type}</span>
              gender 
              <span>${element?.gender}</span>
              origin 
              <span>${element?.origin}</span>
            </div>
          </div>
        </div>
      </div>
        `;
      });

      return arrCards;
    }
  }
}

const applyCard = async function () {
  const container = document.querySelector(".container-cards");
  const arrCards  = await creatCards();

}