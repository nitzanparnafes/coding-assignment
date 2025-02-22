const express = require('express')
const services = require("../services/movieService")
const {asyncHandler} = require("../utils/errorHandler");
const {getProvider} = require("../services/movieDataProvider");

const router = express.Router()

router.get('/moviesPerActor', asyncHandler(async (req, res, next) => {
    const result = await services.getMoviesPerActor()
    res.json(result)
}))

router.get('/actorsWithMultipleCharacters', asyncHandler(async (req, res, next) => {
    const movieProvider = getProvider()
    const cleanNameFn = movieProvider.constructor.cleanCharacterName || ((name) => name)
    const result = await services.getActorsWithMultipleCharacters(cleanNameFn)
    res.json(result)
}))

router.get('/charactersWithMultipleActors', asyncHandler(async (req, res, next) => {
    const movieProvider = getProvider()
    const cleanNameFn = movieProvider.constructor.cleanCharacterName || ((name) => name)
    const result = await services.getCharactersWithMultipleActors(cleanNameFn)
    res.json(result)
}))

module.exports = router