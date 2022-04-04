"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Episodes {
    constructor(id) {
        this._urlBase = "https://rickandmortyapi.com/api/episode";
    }
    getEpisodeByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this._urlBase;
            const stringId = "/" + id.toString();
            const urlConcat = url.concat(stringId);
            const response = yield fetch(urlConcat);
            const jsonData = yield response.json();
            return jsonData; // porquice; converter o obj da forma correta.
        });
    }
    getEpisodePage(page) {
        return __awaiter(this, void 0, void 0, function* () {
            let url;
            let response;
            let jsonData;
            url = this._urlBase + `?page=${page}`;
            response = yield fetch(url);
            jsonData = yield response.json();
            return jsonData;
        });
    }
    getAllEpisodes() {
        return __awaiter(this, void 0, void 0, function* () {
            const { info: { pages } } = yield this.getEpisodePage(1);
            // for () {
            // }
            // const  { results } = await this.getEpisodePage(1) as any;
            // const 
            return pages;
        });
    }
}
const teste = new Episodes();
teste.getEpisodeByID(5).then(response => console.log(response));
teste.getEpisodePage(3).then(response => console.log(response));
teste.getAllEpisodes().then(response => console.log(response));
