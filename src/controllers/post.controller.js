const Post = require('../models/Post.model')
const Tag = require('../models/Tag.model')

module.exports = {
    addPost: (req, res, next) => {
        console.log('ADD USER: ', req.body)
        const savePost = req.body
        const post = new Post(savePost)
        if (!savePost._id) {
            post.save((err, newPost) => {
                if (err)
                    res.send(err)
                else if (!newPost)
                    res.send(400)
                else
                    res.send(newPost)
                next()
            })
        } else {
            Post.findById(req.body._id, (err, post) => {
                if (err) return handleError(err)
                post.set(savePost)
                post.save((err, updatePost) => {
                    if (err)
                        res.send(err)
                    else if (!updatePost)
                        res.send(400)
                    else
                        res.send(updatePost)
                    next()
                })
            })
        }


    },
    getPost: (req, res, next) => {
        // console.log('GET USER: ', req.params.id)
        const postid = req.params.id
        Post.findById(postid)
            .populate('author')
            .exec((err, post) => {
                if (err)
                    res.send(err)
                else if (!post)
                    res.send(400)
                else
                    res.send(post)
                next()
            })
    },
    getAllPosts: (req, res, next) => {
        console.log('GET ALL USERS: ')
        Post.find()
            .populate('author')
            .populate({ path: 'comments.author', select: 'name' })
            .exec((err, posts) => {
                if (err)
                    res.send(err)
                else if (!posts)
                    res.send(400)
                else
                    res.send(posts)
                next()
            })
    },
    savePostAndTag: (req, res, next) => {
        const request = req.body
        const tags = request.tags.map((item, index) => {
            return { title: item }
        })

        Tag.insertMany(tags, { ordered: false }, (err, saveTag) => {
            if (err) {
                if (err.code == '11000') {
                    console.log('object');
                    Tag.find({ 'title': { "$in": request.tags } })
                        .then(data => {
                            const post = new Post(request)
                            post.tags = data.map((item, index) => { return item._id })
                            post.save((err, savepost) => {
                                if (err)
                                    res.send(err)
                                else
                                    res.send({ post: savepost, tags: data })
                            })
                        })

                } else {
                    res.send(err)
                }
            } else {
                const post = new Post(request)
                post.tags = saveTag.map((item, index) => { return item._id })
                post.save((err, savepost) => {
                    if (err)
                        res.send(err)
                    else
                        res.send({ post: savepost, tags: saveTag })
                })
            }

        })
    }
}