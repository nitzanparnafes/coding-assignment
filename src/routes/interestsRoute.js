const express = require("express");
const {addMovie, addActor} = require("../services/interestService");

const router = express.Router()

router.post('/movies', (req, res, next) => {
    try {
        const { movie } = req.body
        const updatedInterests = addMovie(movie)
        res.json(updatedInterests)
    } catch (error) {
        error.status = 400
        next(error)
    }
})

router.post('/actors', (req, res, next) => {
    try {
        const { actor } = req.body
        const updatedInterests = addActor(actor)
        res.json(updatedInterests)
    } catch (error) {
        error.status = 400
        next(400)
    }
})

module.exports = router