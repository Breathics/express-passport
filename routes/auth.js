const path = require('path');


module.exports = function(app, passport) {
  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  })

  app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
  })

  app.post('/login', 
    passport.authenticate('local', {
      successRedirect: '/profile',
      failureRedirect: '/signup'
    })
  );

  app.get('/signup', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'public', 'signup.html'));
  })

  app.post('/signup', 
    passport.authenticate('local', {
      successRedirect: '/profile',
      failureRedirect: '/login'
    })
  )

  app.get('/profile', isLoggedIn, function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'public', 'profile.html'));
  })

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  })
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/');
}