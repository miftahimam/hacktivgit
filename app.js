require('dotenv').config()
const express = require('express')
const app = express()
const port = 4000
const user = require('./routes/user')


app.use(express.urlencoded({extended : false}))
app.use(express.json())

app.use('/users', user)



app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
    
})

