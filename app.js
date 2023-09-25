//for server
const express = require('express');
// for data base
// const mongoose = require("mongoose");
const app = express();

//Custom middleware
server.use((req,res,next)=>{
    console.log('server hit');
    next();
  });

// body parser  
server.use(express.json()); 
server.use(express.urlencoded({ extended: true}));

// ssr view engine 
// app.set('view engine', 'ejs');

// connect to db
// mongoose.connect("mongodb://127.0.0.1:27017/secretDB").then(() => {
//     console.log("Connected to db");
//   })
//   .catch((e) => {
//     console.log("Error connecting to DB", e);
//   });

server.get('/' ,(req,res)=>{
    res.sendFile(__dirname + './homepage.html')
})
server.post('/submit',(req,res)=>{

    console.log(req.body);
    res.sendFile (__dirname + './page1.html');
})



server.listen(3000,() => {
    console.log("Server running on port 3000");
  });
  