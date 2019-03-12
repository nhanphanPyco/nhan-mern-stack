const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')

// content
const app = express()

const project = require('./src/routes/project.route')
// set up morgan
app.use(logger('dev'))
// set up bodyParser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Routes
app.use('/project', project)

app.use((req, res, next) => {
    const err = new Error('Not found!')
    err.status = 404
    next(err)
})

app.use((req, res, next) => {
    const error = app.get('evn') === 'devlopment' ? err : {}
    const status = err.status || 500
    res.status(status).json({
        error: {
            message: error.message
        }
    })
})

module.exports = app

















