const express = require('express');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');


const app = express();
const PORT = 8000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded());

app.use(session({ secret: 'racecarracecar' }));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

require('./config/passport')(passport);
require('./routes/auth.js')(app, passport);


function errorHandler (err, req, res, next) {
	if (res.headersSent) {
	  return next(err);
	}
	res.status(500);
	res.send('Error, something broke!');
}

app.listen(PORT, () => {
	console.log("Yo check it out we're on PORT", PORT);
});