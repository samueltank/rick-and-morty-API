"use strict";

import { Episode } from "../api/models/episode.js";
import { Character } from "../api/models/character.js";

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

applyEpisodeList(".opt-group");


// função para montagem dos cards:
const creatCards = () => {
  
};