#!/usr/bin/env node
require('dotenv').config();
const app = require('express')();
const mongo = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/user.routes');


//=================================================================
// Connect Database
//=================================================================
mongo.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
},(err)=>{
    if(err)
        console.log(err);
    else
        console.log("Database Connected!");
});


//=================================================================
// Setup Middlewares
//=================================================================
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded())


//=================================================================
// Setup Home Page
//=================================================================
app.get('/',(req,res)=>{
    console.log(path.join(__dirname,'default.html'));
    res.sendFile(path.join(__dirname,'default.html'))
});

//=================================================================
// Setup Routes
//=================================================================
app.use('/accounts', userRoutes);



//=================================================================
// Launch Server
//=================================================================
app.listen(process.env.SERVER_PORT,()=>{
    console.log("Server Started on PORT ",process.env.SERVER_PORT)
});