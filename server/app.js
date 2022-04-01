const express = require('express')
const app = express()
const admin = require('./router/admin')
const mongoose = require('mongoose')
const cors=require("cors");
require('dotenv').config()

const mongo = process.env.MONGO_CONNECT
const port = process.env.PORT_APP

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }

mongoose.connect(mongo,
    (error) => {
        if (error) {
            console.log("Deu Error")
        }else{
            console.log("MongoDB Connect")
        }

    })

app.use(cors(corsOptions))
app.use("/", express.json(), admin)
app.use("/", express.urlencoded({extended: true}) , admin)







app.listen(port, () => {
    console.log('Running on Server ' + port)
})