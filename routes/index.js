const express = require('express');
const router = express.Router();

const checkAuthenticated = function(req,res,next) {
  if(req.isAuthenticated()) {
    return next();
  }
  req.flash('error', 'Please Login First');
  res.redirect('/login');
}

router.get('/', checkAuthenticated ,(req,res) => {
  res.render('index');
})

router.delete('/logout', (req,res) => {
  req.logOut();
  res.redirect('/login');
})


module.exports = router;