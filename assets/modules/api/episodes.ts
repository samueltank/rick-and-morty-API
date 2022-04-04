"use strict";

class Episodes {
  private _urlBase: string = "https://rickandmortyapi.com/api/episode";

  public constructor(id?: number | number[]) {

  }

  public async getEpisodeByID(id: number): Promise<object>  {
    const url: string        = this._urlBase;
    const stringId: string   = "/" + id.toString(); 
    const urlConcat: string  = url.concat(stringId);
    const response: Response = await fetch(urlConcat);
    const jsonData: object   = await response.json(); 


    return jsonData; // porquice; converter o obj da forma correta.
  }

  public async getEpisodePage(page: | 1 | 2 | 3): Promise<object> {
    let url: string;
    let response: Response;
    let jsonData: object;

    url      = this._urlBase + `?page=${page}`;
    response = await fetch(url);
    jsonData = await response.json();
    
    return jsonData; 
  }
  
  public async getAllEpisodes() {
    const { info: { pages } } = await this.getEpisodePage(1) as any;


    // for () {

    // }
    // const  { results } = await this.getEpisodePage(1) as any;
    // const 

    return pages;
  }

}

const teste = new Episodes();
teste.getEpisodeByID(5).then(response => console.log(response));
teste.getEpisodePage(3).then(response => console.log(response));
teste.getAllEpisodes().then(response => console.log(response));