const express = require('express')
require('dotenv').config()
const appRoute = require('./routes/appRoutes')
const interestsRoute = require('./routes/interestsRoute')
const {setProvider} = require('./services/movieDataProvider')
const TmdbProvider = require('./services/providers/tmdbProvider')
const {errorHandler} = require("./utils/errorHandler");

const app = express()

setProvider(new TmdbProvider())

app.use(express.json())
app.use(errorHandler)
app.use('/', appRoute)
app.use('/interests', interestsRoute)

module.exports = app
