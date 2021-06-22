const express = require('express');
const router = express.Router();



router.get('/',(req,res) => {
  res.render('index', {title : 'Home'});
})
 
router.delete('/logout', (req,res) => {
  req.logOut();
  res.redirect('/login');
})


module.exports = router;