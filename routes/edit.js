const express = require('express');
const router = express.Router();
const Blog = require('./../models/blog');
const Comment = require('./../models/comments');
const multer = require('multer');
const upload = multer({dest : './public/images'});

router.get('/:id', async (req,res) => {
  const blog = await Blog.findById(req.params.id);
  res.render('edit',{blog : blog , title : blog.title});
});

router.put('/:id',upload.single('image'), async (req,res) => { 
  const blog = await Blog.findById(req.params.id);
  if(req.body.title) {
    blog.title = req.body.title;
  }
  if(req.body.category) {
    blog.category = req.body.category;
  }
  blog.description = req.body.description;
  if(req.file) {
    blog.image = req.file.filename;
  } 
  const result = await blog.save();
  // console.log(req.file);
  // console.log(result);
  const comments = await Comment.find({blogId : req.params.id});
  res.render('show', {blog : blog , title : blog.title, comments : comments});
});

router.delete('/:id', async (req,res) => {
  const result = await Blog.deleteOne({_id : req.params.id});
  res.redirect('/');
});

module.exports = router;