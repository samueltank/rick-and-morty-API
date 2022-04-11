"use strict";

import { FetchApi, IHttpResponse } from "./connection.js";
import { validateNotUndefined, Episode } from "./episode.js";

interface Icharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: { name: string; url: RequestInfo };
  location: { name: string; url: RequestInfo };
  image: RequestInfo;
}

export class Character extends Episode {
  public constructor() {
    super();
  }

  public static async getBodyJsonChar(
    url: RequestInfo
  ): Promise<IHttpResponse<Icharacter>> {
    const fetchChar: FetchApi = new FetchApi(url);
    return fetchChar.getBodyJSON<Icharacter>();
  }

  public async getAllCharactersPerEpisode(id: number): Promise<RequestInfo[]> {
    const episode = await this.getEpisodeById(id);
    const allChars = episode.characters;

    return validateNotUndefined<RequestInfo[]>(allChars);
  }

  public async getAllCharacters(episode: number) {
    const arrLinks = await this.getAllCharactersPerEpisode(episode);

    // utilizar futuramente para buscar com matriz:
    const arrIds = arrLinks
      .map((item) => {
        return item.toString().match(/([\d]+)$/gi);
      })
      .flat();

    const arrPromise = arrLinks.map(async item => {
      const response = await Character.getBodyJsonChar(item);
      return response.parsedBody;
    })

    const arrCharacters = await Promise.all(arrPromise);

    if (arrCharacters != undefined) {
      return arrCharacters;
    } else {
      throw new Error("Não foi possível encontrar os personagens!");
    }
  }
}

// testes

const test = new Character();
test.getAllCharactersPerEpisode(1).then((item) => console.log(item));
test.getAllCharacters(1).then((item) => console.log(item));
