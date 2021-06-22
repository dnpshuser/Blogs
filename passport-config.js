const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy ; 
const User = require('./models/user');

function initialize(passport) {
  passport.use(new LocalStrategy(  async (username, password,done) => {
     const user = await User.findOne({username : username});
     if(!user) { 
       return done(null, false, {message : 'No user Found with that username'});
     } 
     try {
       if(await bcrypt.compare(password, user.password)) {
        return done(null, user, {message : 'Successfully Logged In.'});
       } else {
         return done(null, false, {message : 'Incorrect Password, Try Again...'});
       }
     } catch (err) {
       done(err);
     }
  }))

  passport.serializeUser( (user,done) => {
    done(null, user.id);
  })

  passport.deserializeUser( (id,done) => {
     User.findById(id, (err,user) => {
       done(err,user);
     })
  })
}

module.exports = initialize ;