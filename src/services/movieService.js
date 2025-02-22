const { getProvider } = require("./movieDataProvider")
const { loadInterests } = require('../services/interestService')

const shortestString = (arr) => arr.reduce((min, str) => (str.length < min.length ? str : min), arr[0])
async function getMoviesDataPerActor() {
    const provider = getProvider()
    const actorToMovies = {}
    const { movies, actors } = loadInterests()

    for (const [movieName, movieId] of Object.entries(movies)) {
        const castData = await provider.fetchMovieCast(movieId)
        for (const actor of castData) {
            if (!actors.includes(actor.name)) continue
            if (!actorToMovies[actor.name]) {
                actorToMovies[actor.name] = []
            }
            actorToMovies[actor.name].push({
                movieName: movieName,
                castData: actor
            })
        }
    }

    return actorToMovies
}

async function getMoviesPerActor() {
    const movieDatas = await getMoviesDataPerActor()
    return Object.fromEntries(
        Object.entries(movieDatas).map(([key, value]) => [
            key,
            value.map(item => item.movieName)
        ])
    )
}

async function getActorsWithMultipleCharacters(cleanNameFn) {
    const movieDatas = await getMoviesDataPerActor()
    return Object.fromEntries(
        Object.entries(movieDatas).filter(([_, movies]) => {
            const cleanedCharacterNames = new Set(movies.map(movie => cleanNameFn(movie.castData['character'])))
            const uniqueCleanedCharacterNames = [...cleanedCharacterNames].reduce((acc, name) => {
                if (!acc.some(existing => existing.includes(name) || name.includes(existing))) {
                    acc.push(name)
                }
                return acc
            }, [])
            return uniqueCleanedCharacterNames.length > 1
        }
        ).map(([actor, movies]) => [
            actor,
            movies.map(movie => ({
                movieName: movie.movieName,
                character: cleanNameFn(movie.castData['character'])
            }))
        ])
    )
}

async function getCharactersWithMultipleActors(cleanNameFn) {
    const movieDatas = await getMoviesDataPerActor()
    const characterMap = new Map()

    const updateCharacterMap = (character, movieName, actor) => {
        const cleanedUpNewChar = cleanNameFn(character);
        for (const [existingName, data] of characterMap) {
            if (existingName.includes(cleanedUpNewChar) || cleanedUpNewChar.includes(existingName)) {
                data.names.push(cleanedUpNewChar)
                data.actors.push({ movieName, actorName: actor })
                return
            }
        }
        const cleanedUpChar = cleanNameFn(character)
        characterMap.set(cleanedUpChar, { names: [cleanedUpChar], actors: [{ movieName, actorName: actor }]})
    }

    for (const [actor, movieData] of Object.entries(movieDatas)) {
        movieData.forEach(({movieName, castData}) => {
            updateCharacterMap(castData['character'], movieName, actor)
        })
    }
    // Filter characters played by multiple actors
    return Object.fromEntries(
        [...characterMap.entries()]
            .map(([_, data]) => [shortestString(data.names), data.actors])
            .filter(([_, actors]) => {
                const uniqueActors = new Set(actors.map(a => a.actorName))
                return uniqueActors.size > 1
            })
    )
}


module.exports = {
    getMoviesPerActor,
    getActorsWithMultipleCharacters,
    getCharactersWithMultipleActors
}
