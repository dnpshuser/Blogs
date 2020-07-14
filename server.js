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
const indexRouter = require('./routes/index');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const expressEjsLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');

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


app.use("*",(req,res,next) => {
  if(req.isAuthenticated()) {
    res.locals.user = req.user;
  } else {
    res.locals.user = null;
  }
  next();
})


app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/', indexRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`listening to the port ${port}`);
})
