const User = require('../models/User.model')
const bcrypt = require('bcryptjs')
module.exports = {
    addUser: (req, res, next) => {
        if (req.body.password) {
            const hashedPassword = bcrypt.hashSync(req.body.password, 8)
            req.body.password = hashedPassword
        }
        const saveUser = req.body
        const user = new User(saveUser)
        if (!saveUser._id) {
            user.save((err, newUser) => {
                if (err) {
                    res.send(err)
                }
                else if (!newUser) {
                    res.send(400)

                } else {
                    newUser.password = undefined
                    res.send(newUser)
                }
                next()
            })
        } else {
            User.findById(req.body._id, (err, user) => {
                if (err) return handleError(err)
                user.set(saveUser)
                user.save((err, updateUser) => {
                    if (err) {
                        res.send(err)
                    }
                    else if (!updateUser) {
                        res.send(400)
                    }
                    else {
                        updateUser.password = undefined
                        res.send(updateUser)
                    }

                    next()
                })
            })
        }


    },
    getUser: (req, res, next) => {
        User.findById(req.params.id, { password: 0 })
            .then((err, user) => {
                console.log(err, user);
                if (err)
                    res.send(err)
                else if (!user)
                    res.send(400)
                else
                    res.send(user)
                next()
            })
    },
    getAllUsers: (req, res, next) => {
        User.find({}, { password: 0 })
            .then((err, users) => {
                if (err)
                    res.send(err)
                else if (!users)
                    res.send(400)
                else
                    res.send(users)
                next()
            })
    }
}