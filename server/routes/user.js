const express = require('express')
const router = express.Router()
const userController = require('../controller/user')

router.get('/', userController.getRepos)
router.get('/searchStarredRepo', userController.searchStarredRepos)
router.post('/', userController.createRepo)
router.delete('/:owner/:repoName', userController.deleteRepos)
router.get('/starredRepo', userController.getStarredRepos)
router.put('/starRepo/:owner/:repoName', userController.starRepos)
router.delete('/:owner/:repoName', userController.unstarRepos)
router.get('/:username', userController.findSomeonesRepos)


module.exports = router