const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost/nodeblogPractice', {
  useNewUrlParser : true, 
  useUnifiedTopology : true
})
.then( () => {
  console.log('Connected to the database...');
})
.catch( (err) => {
  console.log('Error connecting the database...');
})


router.get('/',  (req,res) => {
  res.render('register',{title : 'Register'});
})

router.post('/', async (req,res) => {

  const user = await User.findOne({username : req.body.username});
  if(user) {
    req.flash('error', 'Username is already taken, Try using another username');
    console.log('Already user');
    console.log(user);
    return res.redirect('/register');
  } else {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      username : req.body.username , 
      password : hashedPassword
    })
    const result = await newUser.save();
    // console.log(result);
    req.flash('success','Wolaa...! Successfully Registered, You can Login now.');
    res.redirect('/login');
  }
})
 


module.exports = router;