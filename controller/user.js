const axios = require('axios')
let instanceAX = axios.create({
    baseURL : 'https://api.github.com'
})

instanceAX.defaults.headers.common['Authorization'] = `token ${process.env.TOKEN_GITHUB}`;


class userController {
    static getRepos(req,res){
        instanceAX
         .get('/user')
         .then(({ data })=>{
             res.status(200).json(data)
         }) 
         .catch(err =>{
             res.status(500).json(err)
         })
    }
    static createRepo(req,res){
        instanceAX
         .post('/user/repos', {
             name : req.body.repoName,
             description : req.body.description,
             homepage : req.body.homepage,
             private : req.body.private,
             has_issues : req.body.has_issues,
             has_projects : req.body.has_projects
         })
         .then(({ data })=>{
             res.status(201).json(data)
         })
         .catch(err =>{
             res.status(500).json(err)
         })
    }
    static deleteRepos(req,res){
        instanceAX
         .delete(`/repos/${req.params.owner}/${req.params.repoName}`)
         .then(({ data })=>{
             res.status(200).json(data)
         })
         .catch(err =>{
             res.status(500).json(err)
         })
    }
    static starringRepo(req,res){
        instanceAX
         .put(`user/starred/${req.params.owner}/${req.params.repoName}`)
         .then(({ data })=>{
             res.status(204).json(data)
         })
         .catch(err =>{
             res.status(500).json(err)
         })
    }
    static unstarringRepo(req,res){
        instanceAX
         .delete(`/user/starred/${req.params.owner}/${req.params.repoName}`)
         .then(({ data })=>{
             res.status(204).json(data)
         })
         .catch(err =>{
             res.status(500).json(err)
         })
    }
    static listStarredRepo(req,res){
        instanceAX
         .get(`users/${req.params.username}/starred`, {
             sort : req.body.created,
             dirction : req.body.asc
         })
         .then(({ data })=>{
             res.status(200).json(data)
         })
         .catch(err =>{
             res.status(err).json(err)
         })
    }
}


module.exports = userController