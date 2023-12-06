// Load .env file contents into process.env by defalut
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./Routes/router')
require('./DB/connection')


//create express application
const newsServer = express()

newsServer.use(cors())
newsServer.use(express.json())
newsServer.use(router)
const PORT = 4000 || process.env.PORT

newsServer.listen(PORT,()=>{
    console.log(`news Server started at port : ${PORT} and waiting for client requests!!!!`);
})


// http get request resolving to http://localhost:400/
newsServer.get('/',(req,res)=>{
    res.send(`<h1>News Server Started and waiting for client request!!!!!!</h1>`)
})
