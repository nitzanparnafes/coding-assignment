const MovieProvider = require("./providers/movieProvider");
let provider = new MovieProvider()

function setProvider(newProvider) {
    provider = newProvider;
}

function getProvider() {
    if (!provider) throw new Error("No movie data provider set.");
    return provider;
}

module.exports = {setProvider, getProvider};