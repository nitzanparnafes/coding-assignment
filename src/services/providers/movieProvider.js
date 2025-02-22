class MovieProvider {

    async fetchMovieCast(movieId){
        return this.safeRequest(`fetchMovieCast`, () => this._fetchMovieCast(movieId))
    }
    async _fetchMovieCast(movieId) {
        throw new Error("_fetchMovieCast must be implemented by subclass");
    }

    async safeRequest(methodName, requestFn) {
        try {
            return await requestFn()
        } catch (error) {
            console.log(`Error in ${this.constructor.name}.${methodName}:`, error.message)
            throw new Error(`API Error: ${error.response.status} - ${error.response.data?.status_message || error.message }`)
        }
    }
}

module.exports = MovieProvider;