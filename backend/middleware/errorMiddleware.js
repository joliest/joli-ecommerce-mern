
/**
 * Handles invalid url
 */
export const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}

/**
 * Converts HTML error into JSON response
 */
export const errorHandler = (err, req, res, next) => {
    const statusCode = res.status === 200 ? 500 : res.statusCode

    res.status(statusCode)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    })
}