const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const initializePassport = require('../passport-config');

initializePassport(passport);

const CheckNotAuthenticated = function(req,res,next) {
  if(req.isAuthenticated()) {
    return res.redirect('/');
  }
  next();
}
router.get('/', CheckNotAuthenticated ,(req,res) => {
  res.render('login', {title : 'Login'});
})

router.post('/', passport.authenticate('local', {
  failureRedirect : '/login', 
  failureFlash : true , 
  successFlash : true , 
  successRedirect : '/'
}))



module.exports = router;