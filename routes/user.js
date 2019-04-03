const express = require('express')
const router = express.Router()
const userController = require('../controller/user')

router.get('/', userController.getRepos)
router.post('/', userController.createRepo)
router.delete('/:owner/:repoName', userController.deleteRepos)
router.put('/:owner/:repoName', userController.starringRepo)
router.delete('/:owner/:repoName', userController.unstarringRepo)
router.get('/:username/starred', userController.listStarredRepo)


module.exports = router