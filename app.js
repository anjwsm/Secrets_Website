//for server
const express = require('express');
// for data base
// const mongoose = require("mongoose");
const server = express();

//Custom middleware
server.use((req,res,next)=>{
    console.log('server hit');
    next();
  });

// body parser  
server.use(express.json()); 
server.use(express.urlencoded({ extended: true}));
// set static file's folder
server.use(express.static('public'));
// ssr view engine 
server.set('view engine', 'ejs');

// connect to db
// mongoose.connect("mongodb://127.0.0.1:27017/secretDB").then(() => {
//     console.log("Connected to db");
//   })
//   .catch((e) => {
//     console.log("Error connecting to DB", e);
//   });

server.get('/' ,(req,res)=>{
// landing page
    res.sendFile(__dirname + '/views/homepage.html')
});
server.get('/login',(req,res)=>{
  //login page
  res.sendFile(__dirname+'/views/login.html')
});
server.get('/register',(req,res)=>{
  // register page
  res.sendFile(__dirname+'/views/register.html')
});
server.get('/home',(req,res)=>{
  // 
  res.sendFile(__dirname+'/views/create.html');
});

server.get('/secrets',(req,res)=>{
  res.sendFile(__dirname+'/views/secrets.html');

});
c

server.listen(3000,() => {
    console.log("Server running on port 3000");
  });
  