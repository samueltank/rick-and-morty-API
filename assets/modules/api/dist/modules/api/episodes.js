"use strict";
let response;
try {
    const fetch = new FetchApi("https://rickandmortyapi.com/api/episode");
    fetch.getBodyJSON()
        .then(body => {
        var _a, _b;
        console.log((_a = body.parsedBody) === null || _a === void 0 ? void 0 : _a.info.pages);
        response = body;
        console.log((_b = response.parsedBody) === null || _b === void 0 ? void 0 : _b.results[1].characters);
    });
}
catch (error) {
    console.log("Connect Error", error);
}
