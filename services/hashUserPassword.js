const bcrypt = require('bcryptjs');

exports.hashPassword = (password) => {
	let salt = bcrypt.genSaltSync(10);
	let hash = bcrypt.hashSync(password, salt);
	return hash;
};

exports.verifyPassword = (userPassword, dbPassword) => {
	return bcrypt.compareSync(userPassword, dbPassword);
};
