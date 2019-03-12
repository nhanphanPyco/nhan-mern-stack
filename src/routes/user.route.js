
const userController = require('../controllers/user.controller')
const jwtAuthMiddleware = require('../middleware/jwtAuthen.middleware')
module.exports = router => {
    router
        .route('/user/:id')
        .get(jwtAuthMiddleware, userController.getUser)

    // post method
    router
        .route('/user')
        .post(jwtAuthMiddleware, userController.addUser)

    router
        .route('/users')
        .get(jwtAuthMiddleware, userController.getAllUsers)
    router
        .route('/test')
        .get((req, res, next) => {
            res.send('dainhan yeu mam rat nhieu')

        })
}