//for server
const express = require('express');
// for data base
const mongoose = require("mongoose");
const server = express();

const { User, Secret} = require("./models");

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
mongoose.connect("mongodb://127.0.0.1:27017/secretDB").then(() => {
    console.log("Connected to db");
  })
  .catch((e) => {
    console.log("Error connecting to DB", e);
  });

server.get('/' ,(req,res)=>{
// landing page
    res.sendFile(__dirname + '/views/homepage.html')
});
server.get('/login',(req,res)=>{
  //login page
  res.sendFile(__dirname+'/views/login.html')
});


server.post('/login', async(req,res)=>{
  const { email, password } = req.body;
  User.findOne({email:email}).then((result)=>{
    if(result && result.password==password){
      res.render('create',{user:result.username,userId:result._id});
    }
  }).catch(()=>{
   res.status(404).send('Invalid password')
  })

});

server.get('/register',(req,res)=>{
  // register page
  res.sendFile(__dirname+'/views/register.html')
});
server.post('/register',(req,res)=>{
  console.log(req.body);
  User.create({username:req.body.name, email:req.body.email,
     password:req.body.password}).then((result)=>{

      res.render('create',{user:req.body.name,userId:result._id});

     }).catch((e)=>{
      res.send('Could not register')
     });
});
server.get('/home',(req,res)=>{
  // 
  res.sendFile(__dirname+'/views/create.html');
});

server.get('/secrets',(req,res)=>{
  const userId =req.query.userId;
  User.findOne({_id:userId}).then((user)=>{

    Secret.find({userId:userId})
    .then((result)=>{
      console.log({allSecrets:result,userId:userId,user:user.username})
      res.render('secrets',
      {allSecrets:result,userId:userId,user:user.username})})
    .catch((err)=>{
     res.send(err);
    })

  }).catch((err)=>{
    res.send(err);
  })
  
  // res.sendFile(__dirname+'/views/secrets.html');

});


server.post('/secrets',(req,res)=>{
  console.log(req.body);
 Secret.create({title:req.body.title, secret:req.body.secret,userId:req.body.userId})
 .then((result)=>{
  console.log(result);
  res.send("Your secret created")
 }).catch((e)=>{
  res.status(404).send("Secret cannot be created"+ e);
 })
})


server.listen(3000,() => {
    console.log("Server running on port 3000");
  });
  