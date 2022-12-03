const express = require('express');
const app = express();
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


const rootRoute = require('./routes/index')

//app.use(express.json());

app.use('/',rootRoute)

app.listen(8080,()=>{
    console.log("ok")
})