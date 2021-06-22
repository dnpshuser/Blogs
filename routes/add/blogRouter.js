const express = require("express");
const Blog = require('./../../models/blog');
const multer = require('multer');
const upload = multer({dest : './public/images'})

const router = express.Router();
 
router.get('/', (req,res) => {
  res.render('addBlog', {title : 'Blogs'});
});
 
router.post('/', upload.single('image'), async (req,res) => {
  const newBlog = new Blog({
    title : req.body.title , 
    category : req.body.category , 
    description : req.body.description, 
    image : req.file.filename , 
    author : req.user.username
  });

  const result = await newBlog.save();
  // console.log(result);
  res.redirect('/');
})
module.exports = router;