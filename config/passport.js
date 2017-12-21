const LocalStrategy = require('passport-local').Strategy;
const credentials = require('./database');
const mysql = require('mysql');

const connection = mysql.createConnection(credentials);

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
      done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
          done(err, user);
      });
  });


  passport.use('local', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true 
  },
  function(req, email, password, done) { // callback with email and password from our form
    connection.query(`SELECT * FROM users WHERE email=${email}`, function(err, results, fields) {
      console.log("These are the results", results);
    })
    console.log("inside the auth", email);
    console.log("inside the auth", password);

  }));

};