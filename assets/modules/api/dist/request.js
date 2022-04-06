"use strict";
class FetchApi {
    constructor(url) {
        this._url = url;
    }
    async getBodyJSON() {
        const response = await fetch(this._url);
        response.parsedBody = await response.json();
        /* error handling */
        if (!response.ok)
            throw new Error(response.statusText);
        return response;
    }
}
