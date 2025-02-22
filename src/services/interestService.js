const path = require("path");
const {readFileSync, existsSync, writeFileSync} = require("fs");

const INTERESTS_FILE = path.join(__dirname, '../data/interests.json')

function loadInterests() {
    try {
        if (!existsSync(INTERESTS_FILE)) {
            return { movies: [], actors: [] }
        }
        const data = readFileSync(INTERESTS_FILE, "utf8")
        return JSON.parse(data)
    } catch (error) {
        throw new Error("Failed to load interests")
    }
}

function saveInterests(interests) {
    try {
        writeFileSync(INTERESTS_FILE, JSON.stringify(interests, null, 2), "utf8");
    } catch (error) {
        console.error("Failed to save interests:", error.message);
    }
}

function addMovie(movie) {
    const interests = loadInterests()
    if (typeof movie !== "string" || movie.trim() === "") {
        throw new Error("Invalid movie name.")
    }
    if (interests.movies.includes(movie)) {
        throw new Error("Movie already exists in interests.")
    }

    interests.movies.push(movie)
    saveInterests(interests)
    return interests
}

function addActor(actor) {
    const interests = loadInterests()
    if (typeof actor !== "string" || actor.trim() === "") {
        throw new Error("Invalid actor name.")
    }
    if (interests.actors.includes(actor)) {
        throw new Error("Actor already exists in interests.")
    }

    interests.actors.push(actor)
    saveInterests(interests)
    return interests
}

module.exports = { loadInterests, addMovie, addActor }