const express = require('express');
const passport = require('passport');
const logger = require('morgan');
const session = require('express-session');


const app = express();
const PORT = 8000;

app.use(logger('dev')); 
app.use(express.json());
app.use(express.urlencoded());

app.use(session({ secret: 'racecarISracecar' }));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

require('./config/passport')(passport);
require('./routes/auth.js')(app, passport);

app.listen(PORT, () => {
  console.log("Yo check it out we're on PORT", PORT);
});