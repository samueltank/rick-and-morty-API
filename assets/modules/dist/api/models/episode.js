"use strict";
import { FetchApi } from "./model.js";
// função para validação de retorno correto:
export const validateNotUndefined = async function (value) {
    if (value !== undefined) {
        return value;
    }
    else {
        throw new Error("variável indefinida!");
    }
};
// variável montadora, para o corpo da resposta:
let response;
// classe para episodios e páginas de episodios:
export class Episode {
    constructor() {
        this._fetch = new FetchApi(Episode._url);
    }
    async getBodyJson() {
        return this._fetch.getBodyJSON();
    }
    async getPageNumberPromise() {
        var _a;
        const response = (_a = (await this.getBodyJson()).parsedBody) === null || _a === void 0 ? void 0 : _a.info.pages;
        return validateNotUndefined(response);
    }
    async getEpisodeById(id) {
        const url = Episode._url + `/${id}`;
        const fetch = new FetchApi(url);
        const response = (await fetch.getBodyJSON()).parsedBody;
        return validateNotUndefined(response);
    }
    async getPageByNumber(pageID) {
        const url = Episode._url + `?page=${pageID}`;
        const fetch = new FetchApi(url);
        const response = (await fetch.getBodyJSON()).parsedBody;
        return validateNotUndefined(response);
    }
    async getAllPagesPromise() {
        const pages = await this.getPageNumberPromise();
        let arrPag = [];
        for (let i = 1; i <= pages; i++) {
            const page = await this.getPageByNumber(i);
            arrPag.push(page);
        }
        if (Array.isArray(arrPag)) {
            const bigPromise = await Promise.all(arrPag);
            return bigPromise;
        }
        else {
            throw new Error("variável não é um array!");
        }
    }
    async getNumberOfEpisodes() {
        var _a;
        const fetch = (_a = (await this._fetch.getBodyJSON()).parsedBody) === null || _a === void 0 ? void 0 : _a.info.count;
        return validateNotUndefined(fetch);
    }
    async getAllEpisodes() {
        const resolve = await this.getAllPagesPromise();
        const allArr = resolve.map(item => { return item.results; });
        const allEpisodes = allArr.flat();
        return allEpisodes;
    }
}
Episode._url = "https://rickandmortyapi.com/api/episode";
