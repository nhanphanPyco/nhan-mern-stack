const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

const routes = require('./routes')



const app = express()
const router = express.Router()
const url = process.env.MONGODB_URL || 'mongodb://localhost:27017/mern'

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

try {
    mongoose.connect(url, {

    })
} catch (error) {
    console.log(error)
}

let port = 8000 || process.env.PORT

routes(router)

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', router)

app.listen(port, () => {
    console.log('server started at port: ', port)
})
