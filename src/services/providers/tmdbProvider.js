const MovieProvider = require("./movieProvider")
const axios = require("axios")
const {memoize} = require("../../utils/cache")

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.TMDB_API_KEY;

class TmdbProvider extends MovieProvider {

    async _fetchMovieCast(movieId) {
        const url = `${TMDB_BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
        return memoize(url, () => axios.get(url).then(res => res.data.cast))
    }

    static cleanCharacterName(name) {
        return name
            .replace(/\([^)]*\)/g, '')        // Remove text inside parentheses
            .replace(/'[^']*'/g, '')           // Remove text inside quotes
            .replace(/\bthe\b/gi, '')          // Remove the word 'the'
            .replace(/\b[A-Za-z]+\./g, '')     // Remove shortened words (like Lt.)
            .replace(/-/g, ' ')                // Replace hyphens with spaces
            .replace(/\s+/g, ' ')              // Replace multiple spaces with a single space
            .trim()                            // Remove leading and trailing spaces
            .split(' / ')                      // Split if there is a / in the name
            .sort()                            // Sort to keep a consistent order
            .join(' / ')                       // Combine to string again
    }

}

module.exports = TmdbProvider