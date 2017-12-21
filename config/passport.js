const LocalStrategy = require('passport-local').Strategy;
const credentials = require('./database');
const mysql = require('mysql');

const connection = mysql.createConnection(credentials);


function searchForUser(email) {
  let sql = "SELECT * FROM ?? WHERE ?? = ?";
  let inserts = ['users', 'email', email];
  sql = mysql.format(sql, inserts);
  connection.query(sql, function(err, results, fields) {
    if (err) { return done(err); }
    if (results.length < 0) { return done(null, false) } 
    console.log("Results from our query", results[0]);
  });
}

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
    searchForUser(email);
    console.log("inside the auth", email);
    console.log("inside the auth", password);

  }));

};