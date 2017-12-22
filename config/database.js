const bcrypt = require('bcrypt-nodejs');

module.exports = {
	db: {
		host: 'localhost',
		port: 3306,
		user: 'root',
		password: 'root',
		database: 'mangos'
	},

	createHash: function(password) {
		return bcrypt.hashSync(password,  bcrypt.genSaltSync(), null);
	},

	checkPassword: function(password) {
		return bcrypt.compareSync(password,  );
	}
}