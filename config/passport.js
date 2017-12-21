const LocalStrategy = require('passport-local').Strategy;
const localConfig = require('./strategies/local');

const mysql = require('mysql');
const credentials = require('./database');
const connection = mysql.createConnection(credentials);

function userSearchSQL(email) {
	let sql = "SELECT * FROM ?? WHERE ?? = ?";
	let inserts = ['users', 'email', email];
	return mysql.format(sql, inserts);
}

function userCreateSQL(email, password) {
	let sql = "INSERT INTO ?? (??, ??, ??) VALUES (?, ?, ?)";
	let inserts = ['users', 'id', 'email', 'password', null, email, password];
	return mysql.format(sql, inserts);
}

module.exports = function (passport) {
	passport.serializeUser(function (user, done) {
		done(null, user);
	});

	passport.deserializeUser(function (user, done) {
		let sql = "SELECT * FROM ?? WHERE ?? = ?";
		let inserts = ['users', 'id', user.insertId];
		sql = mysql.format(sql, inserts);
		
		connection.query(sql, 
			function (err, results, fields) {
				done(err, results)
			}
		);	
	});

	passport.use('local-signup', new LocalStrategy(localConfig,
		function (req, email, password, done) {
			process.nextTick(function () {
				let sql = userSearchSQL(email);

				connection.query(sql, function (err, results, fields) {
					if (err) { return done(err) }

					if (results[0]) {
						return done(null, false);
					} else {
						let sql = userCreateSQL(email, password);

						connection.query(sql, function (err, results, fields) {
							if (err) throw err;

							return done(null, results);
						});
					}

				});
			});
		}));

	passport.use('local-signin', new LocalStrategy(localConfig,
		function (req, email, password, done) { // callback with email and password from our form
			let sql = userSearchSQL(email);

			connection.query(sql, function (err, results, fields) {

				if (err) { return done(err); }

				if (!results[0]) { return done(null, false); }

				if (!results[0].password) { return done(null, false); }

				return done(null, results);
			});
		}));
	
};