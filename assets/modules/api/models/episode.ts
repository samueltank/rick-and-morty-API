"use strict";

import { IHttpResponse, FetchApi } from "./model.js";

/* Data: 10/04/2022;
 * Autor: Samuel Tank;
 * Nota: Todas as funções foram testadas e retornam o esperado;
 * Descrição: module for 
 */

// tipagem dos objetos retornados:
export interface IresultsPage {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: RequestInfo[];
}

export interface IPageDataEpisode extends IresultsPage {
  info: {
    count: number;
    pages: number;
    next: RequestInfo;
    prev: null | number;
  };
  results: Array<IresultsPage>;
}
  
  
// função para validação de retorno correto:
export const validateNotUndefined = async function <T>(
  value: T | undefined
): Promise<T> {
  if (value !== undefined) {
    return value;
  } else {
    throw new Error("variável indefinida!");
  }
};

// variável montadora, para o corpo da resposta:
let response: IHttpResponse<IPageDataEpisode>;

// classe para episodios e páginas de episodios:
export class Episode {
  private static readonly _url: RequestInfo =
    "https://rickandmortyapi.com/api/episode";

  private readonly _fetch: FetchApi;

  public constructor() {
    this._fetch = new FetchApi(Episode._url);
  }

  private async getBodyJson(): Promise<IHttpResponse<IPageDataEpisode>> {
    return this._fetch.getBodyJSON<IPageDataEpisode>();
  }

  public async getPageNumberPromise(): Promise<number> {
    const response = (await this.getBodyJson()).parsedBody?.info.pages;

    return validateNotUndefined<number>(response);
  }

  public async getEpisodeById(id: string): Promise<IresultsPage> {
    const url: RequestInfo = Episode._url + `/${id}`;
    const fetch: FetchApi = new FetchApi(url);
    const response = (await fetch.getBodyJSON<IresultsPage>()).parsedBody;

    return validateNotUndefined<IresultsPage>(response);
  }

  public async getPageByNumber(pageID: string): Promise<IPageDataEpisode> {
    const url: RequestInfo = Episode._url + `?page=${pageID}`;
    const fetch: FetchApi = new FetchApi(url);

    const response = (await fetch.getBodyJSON<IPageDataEpisode>()).parsedBody;

    return validateNotUndefined<IPageDataEpisode>(response);
  }

  public async getAllPagesPromise(){
    const pages: number = await this.getPageNumberPromise();
    let arrPag = [];

    for (let i = 1; i <= pages; i++) {
      const page = await this.getPageByNumber(i.toString());
      arrPag.push(page);
    }

    if (Array.isArray(arrPag)) {
      const bigPromise = await Promise.all(arrPag);
      return bigPromise;
    } else {
      throw new Error("variável não é um array!");
    }
  }

  public async getNumberOfEpisodes(): Promise<number> {
    const fetch = (await this._fetch.getBodyJSON<IPageDataEpisode>()).parsedBody
      ?.info.count;

    return validateNotUndefined<number>(fetch);
  }

  public async getAllEpisodes(): Promise<IresultsPage[]> {
    const resolve = await this.getAllPagesPromise();
    const allArr = resolve.map(item => { return item.results }); 
    const allEpisodes = allArr.flat();

    return allEpisodes;
  }
}