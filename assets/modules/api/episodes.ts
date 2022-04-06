"use strict";

/* tipagem dos retornos */
interface IresultsPage {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: RequestInfo[];
}

interface IPageDataEpisode {
  info: {
    count: number;
    pages: number;
    next: RequestInfo;
    prev: null | number;
  };
  results: Array<IresultsPage>;
}

let response: IHttpResponse<IPageDataEpisode>;
try {
  const fetch = new FetchApi(
    "https://rickandmortyapi.com/api/episode"
  );
  
  fetch.getBodyJSON<IPageDataEpisode>()
  .then(body => { 
    console.log(body.parsedBody?.info.pages);
    response = body;
    console.log(response.parsedBody?.results)
  });
} catch (error) {
  console.log("Connect Error", error);
}