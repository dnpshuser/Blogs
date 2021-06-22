const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');
const Comment = require('../models/comments');

router.get('/:id', async (req,res) => {
  const blog = await  Blog.findById(req.params.id);
  const comments = await Comment.find({blogId : req.params.id});
  res.render('show', {blog : blog , title : blog.title, comments : comments});
})

router.post('/comment/:id', async (req,res) => {
  const newComment = new Comment({
    blogId : req.params.id , 
    comment : req.body.comment , 
    writer : req.user.username
  });
  const result = await newComment.save();
  // console.log(result);
  res.redirect(`/show/${req.params.id}`);
})
 

module.exports = router;