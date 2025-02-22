exports.errorHandler = (err, req, res, next) => {
    if (err.response && err.response >= 400 && err.response < 500) {
        return res.status(err.response.status).json({error: err.message})
    } else {
        return res.status(500).json({error: 'Internal server error'})
    }
}

exports.asyncHandler = (fn) => {
    return function (req, res, next) {
        Promise.resolve(fn(req, res, next)).catch(next)
    }
}

// module.exports = {errorHandler, asyncHandler}