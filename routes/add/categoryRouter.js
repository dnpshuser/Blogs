const express = require("express");
const Category = require('./../../models/category');
const router = express.Router();

router.get('/', (req,res) => {
  res.render('addCategory', {title : 'Category'});
})

router.post('/', async (req,res) => {
  const newCategory = new Category({
    name : req.body.category
  })
  const result = await newCategory.save();
  console.log(result);
  res.redirect('/');
})

module.exports = router;
