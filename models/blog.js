const mongoose = require('mongoose');
 
const blogSchema = mongoose.Schema({
  title : String,
  category : String ,
  image : String ,
  description : String , 
  author : String , 
})

module.exports = mongoose.model('blog', blogSchema);

