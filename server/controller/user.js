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
             console.log(data)
             res.status(200).json(data)
         }) 
         .catch(err =>{
             console.log(err)
             res.status(500).json({
                 message : err.message
             })
         })
    }
    static createRepo(req,res){
        instanceAX
         .post('/user/repos', {
             name : req.body.repoName
            
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
    static getStarredRepos(req, res) {
        instanceAX
         .get("/user/starred")
         .then(({ data }) => {
          res.status(200).json(data)
        })
         .catch(err => {
          res.status(500).json(err)
        })
      }
    
      static searchStarredRepos(req, res) {
        instanceAX
          .get("/user/starred")
          .then(({ data }) => {
          let regex = new RegExp(req.query.q, "gi");
          let filtered = data.filter(starredRepo => starredRepo.repoName.match(regex) || starredRepo.description.match(regex) || starredRepo.full_name.match(regex))
          res.status(200).json(filtered)
        })
          .catch(err => {
          res.status(500).json(err)
        })
      }
    
      static starRepos(req, res) {
        instanceAX.defaults.headers.common["Content-Length"] = 0
        instanceAX
         .put(`/user/starred/${req.params.owner}/${req.params.repoName}`)
         .then(({ data }) => {
          res.status(201).json(data)
        })
          .catch(err => {
          res.status(500).json(err)
        })
      }
    
      static unstarRepos(req, res) {
        instanceAX
          .delete(`/user/starred/${req.params.owner}/${req.params.repoName}`)
          .then(({ data }) => {
          res.status(200).json(data)
        })
          .catch(err => {
          res.status(500).json(err)
        })
      }
      static findSomeonesRepos(req, res) {
        instanceAX
          .get(`/users/${req.params.username}/repos`)
          .then(({ data }) => {
          res.status(200).json(data)
        })
          .catch(err => {
          res.status(500).json(err)
        })
      }
}


module.exports = userController