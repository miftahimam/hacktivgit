# hacktivgit

## List of routes

### users

| Route | HTTP | Params | Body | Description |
| ----- | ---- | --------- | ---- | ----------- |
| `/users` | GET | `none` | `none` | Get all repos info |
| `/users` | POST | `none` | `name:STRING`, `description : String`, `homepage : Strig`, `private : Boolean`, `has_issues : Boolean`, `has_project : Boolean` | Create a Repos |
| `/users/:owner/:repoName` | DELETE | `owner : String`, `repoName : String` | `none` | Delete a repos by its owner and repoName |
| `/users/:owner/:repoName` | PUT | `owner : String`, `repoName : String` | `none` | Starring repos by its owner and repoName |
| `/users/:username/starred` | GET | `username : String` | `sort : String`, `direction : String` | Get info a list starred repos |
| `/users/:owner/:repoName` | DELETE | `owner : String`, `repoName : String` | `none` | Delete a repos by its owner and repoName |


## Usage

Make sure you have Node.js and npm installed on your computer, then run these commands:

``` 
npm install express
npm install dotenv
npm install axios
npm run dev / nodemon app.js
```

Access the  on `http://localhost:4000/`