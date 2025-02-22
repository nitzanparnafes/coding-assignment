const express = require('express')
require('dotenv').config()
const appRoute = require('./routes/appRoutes')
const interestsRoute = require('./routes/interestsRoute')
const { setProvider } = require('./services/movieDataProvider')
const TmdbProvider = require('./services/providers/tmdbProvider')
const {errorHandler} = require("./utils/errorHandler");

const app = express()

app.use(express.json())
app.use(errorHandler)
app.use('/api', appRoute)
app.use('/interests', interestsRoute)

setProvider(new TmdbProvider())

app.listen(9400, () => {
    console.log('Server running')
})