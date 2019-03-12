const express = require('express')
const router = express.Router()
const projectController = require('../controllers/project.controller')
router.get('/', projectController.project)

module.exports = router
