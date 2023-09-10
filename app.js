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
const roleroutes = require('./routes/roleRoutes')
const communityroutes = require('./routes/communityRoutes')
const memberroutes = require('./routes/memberRoutes')


app.use('/v1/auth', userroutes);
app.use('/v1', roleroutes);
app.use('/v1', communityroutes);
app.use('/v1', memberroutes);


// middleware for Error 
app.use(errorMiddleware)


module.exports = app