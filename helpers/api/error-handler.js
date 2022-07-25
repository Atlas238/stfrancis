export { errorHandler };

// Catch-all Error handler, will send to unknown page or notify of invalid token
function errorHandler(err, res) {
    if (typeof (err) === 'string') {
        return res.status(400).json({ message: err })
    }

    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ message: 'Invalid Token' })
    }

    return res.status(500).json({ message: err.message })
}