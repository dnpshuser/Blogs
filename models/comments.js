const mongoose = require('mongoose');
 
const commentSchema = new mongoose.Schema({
  blogId : String , 
  comment : String ,
  writer : String 
});

module.exports = mongoose.model('comment', commentSchema);