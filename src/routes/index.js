const user = require('./user.route')
const post = require('./post.route')
const auth = require('./auth.route')

module.exports = router => {
    user(router)
    post(router)
    auth(router)
}

