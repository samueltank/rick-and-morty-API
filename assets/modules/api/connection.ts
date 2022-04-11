"use strict";
 
/* arquivo base para consumo e tipagem de corpo JSON */

export interface IHttpResponse<T> extends Response {
  parsedBody?: T;
}

export class FetchApi {
  private readonly _url: RequestInfo;

  public constructor(url: RequestInfo) {
    this._url = url;
  }

  public async getBodyJSON<T>(): Promise<IHttpResponse<T>> {
    const response: IHttpResponse<T> = await fetch(this._url);
    response.parsedBody = await response.json();  

    /* error handling */
    if (!response.ok)
      throw new Error(response.statusText)
      
    return response;
  } 
}
