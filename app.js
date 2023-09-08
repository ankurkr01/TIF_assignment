const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const dotenv = require("dotenv");


const errorMiddleware = require('./middleware/error')

// config
dotenv.config();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser())


// routes import 
const userroutes = require('./routes/userRoutes')


app.use('/v1/auth', userroutes);


// middleware for Error 
app.use(errorMiddleware)


module.exports = app