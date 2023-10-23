const bcrypt = require('bcryptjs');

const hashPassword = (password) => {
	let salt = bcrypt.genSaltSync(10);
	let hash = bcrypt.hashSync(password, salt);
	return hash;
};

const verifyPassword = (userPassword, dbPassword) => {
	return bcrypt.compareSync(userPassword, dbPassword);
};

module.exports = {
	hashPassword,
	verifyPassword,
};
