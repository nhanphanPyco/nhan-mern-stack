const jwt = require('jsonwebtoken')
const config = require('../config/config')

module.exports = (req, res, next) => {
    if (!req.headers) {
        return res.status(401).send({ auth: false, message: 'No token provide' })
    }
    const token = req.headers['x-access-token']
    if (!token) {
        return res.status(401).send({ auth: false, message: 'No token provide' })
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err)
            res.status(500).send({ auth: false, message: 'Faile to authentication' })
        next()
    })
}