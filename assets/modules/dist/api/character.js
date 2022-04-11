"use strict";
import { FetchApi } from "./connection.js";
import { validateNotUndefined, Episode } from "./episode.js";
export class Character extends Episode {
    constructor() {
        super();
    }
    static async getBodyJsonChar(url) {
        const fetchChar = new FetchApi(url);
        return fetchChar.getBodyJSON();
    }
    async getAllCharactersPerEpisode(id) {
        const episode = await this.getEpisodeById(id);
        const allChars = episode.characters;
        return validateNotUndefined(allChars);
    }
    async getAllCharacters(episode) {
        const arrLinks = await this.getAllCharactersPerEpisode(episode);
        // utilizar futuramente para buscar com matriz:
        const arrIds = arrLinks
            .map((item) => {
            return item.toString().match(/([\d]+)$/gi);
        })
            .flat();
        const arrPromise = arrLinks.map(async (item) => {
            const response = await Character.getBodyJsonChar(item);
            return response.parsedBody;
        });
        const arrCharacters = await Promise.all(arrPromise);
        if (arrCharacters != undefined) {
            return arrCharacters;
        }
        else {
            throw new Error("Não foi possível encontrar os personagens!");
        }
    }
}
// testes
const test = new Character();
test.getAllCharactersPerEpisode(1).then((item) => console.log(item));
test.getAllCharacters(1).then((item) => console.log(item));
