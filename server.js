if(process.env.NODE_ENV != 'production'){
  require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');
const expressEjsLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');

const indexRouter = require('./routes/index');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const addBlogRouter = require('./routes/add/blogRouter');
const addCategoryRouter = require('./routes/add/categoryRouter');
const showRouter = require('./routes/show');
const editRouter = require('./routes/edit');

const Blog = require('./models/blog');
const Category = require('./models/category');
const { reverse } = require('dns');

const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended : true}));
app.use(expressEjsLayouts);
app.use(express.static('public'));
app.use(methodOverride('_method'));


app.use(session({
  secret : process.env.secret,
  resave : false ,  // do not resave if nothing is changed
  saveUninitialized : false // no empty sessions
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());


app.use("*",async (req,res,next) => {
  app.locals.blogs = await Blog.find();
  app.locals.categories = await Category.find();
  if(req.isAuthenticated()) {
    app.locals.user = req.user;
  } else {
    app.locals.user = null;
  }
  next();
})
app.locals.truncateText = function(text,length) {
  return text.substring(text,length);
}


const checkAuthenticated = function(req,res,next) {
  if(req.isAuthenticated()) {
    return next();
  }
  req.flash('error', 'Please Login First.!');
  res.redirect('/login');
}

const checkNotAuthenticated = function(req,res,next) {
  if(req.isAuthenticated()) {
    req.flash('info', 'Already Logged In.');
    return res.redirect('/');
  }
  next();
}
app.use('/edit', checkAuthenticated , editRouter);
app.use('/show', checkAuthenticated , showRouter);
app.use('/add/blog',checkAuthenticated, addBlogRouter);
app.use('/add/category',checkAuthenticated, addCategoryRouter);
app.use('/register',checkNotAuthenticated, registerRouter);
app.use('/login',checkNotAuthenticated, loginRouter);
app.use('/',checkAuthenticated, indexRouter);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening to the port ${port}`);
})
 