const express = require("express");
const Category = require('./../../models/category');
const router = express.Router();

router.get('/', (req,res) => {
  res.render('addCategory', {title : 'Category'});
})

router.post('/', async (req,res) => {
  const category = await Category.findOne({name : req.body.category});
  if(category) {
    req.flash('error', 'This Category is already added. Try a different One...');
    return res.redirect('/add/category');
  }
  const newCategory = new Category({
    name : req.body.category
  })
  const result = await newCategory.save();
  res.redirect('/add/category');
})

module.exports = router;
