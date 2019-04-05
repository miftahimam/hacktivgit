require('dotenv').config()
const express = require('express')
const app = express()
const port = 10000
const cors = require('cors')
const user = require('./routes/user')


app.use(express.urlencoded({extended : false}))
app.use(express.json())

app.use(cors())

app.use('/users', user)



app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
    
})

