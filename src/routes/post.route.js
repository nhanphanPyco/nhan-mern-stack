const postController = require('../controllers/post.controller')

module.exports = router => {
    router
        .route('/post/:id')
        .get(postController.getPost)

    // post method
    router
        .route('/post')
        .post(postController.addPost)

    router
        .route('/posts')
        .get(postController.getAllPosts)

    router
        .route('/savetag')
        .post(postController.savePostAndTag)
}