const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const {StatusCodes} = require('http-status-codes');
const bodyParser = require('body-parser');
require('dotenv').config()
const connectDb = require('./database/dbConnect.js')


const PORT = process.env.PORT

const app = express()

//middlewares
    //body parser -> string query (form data)
    app.use(express.urlencoded({ extended: true }))
    //body parser -> to accept json
 app.use(express.json())
    //cors - cross origin resource sharing
 app.use(cors())
   //cookie parser -> with access secret (secured cookie) & without access secret(in-secure)
 app.use(cookieParser(process.env.ACCESS_SECRET)) 
 app.use(bodyParser.json({ extended: true }))
 app.use(bodyParser.urlencoded({ extended: true }))

 //index route
 app.get(`/`, async(req, res) =>{
    res.status(StatusCodes.OK).json({msg: `Welcome to REST API`})
})

//custom routes
 app.use(`/api/patient`, require('./routes/patientRoute.js'))
//default (not found) route
app.all(`/**`,async(req,res) =>{
    res.status(StatusCodes.NOT_FOUND).json({msg : `Requested Path Not Found`});
})

//port listener
app.listen(PORT, async() =>{
    await connectDb()
    console.log(`Server is running @ http://localhost:${PORT}`);
})