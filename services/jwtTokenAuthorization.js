const jwt = require('jsonwebtoken');

exports.createToken = (id, userName, email) => {
	var token = jwt.sign(
		{ id: id, userName: userName, email: email },
		process.env.JWT_SECRET,
		{
			algorithm: process.env.SIGNING_ALGO,
		}
	);

	return token;
};

exports.verifyToken = (token) => {
	let isVerified;
	try {
		isVerified = jwt.verify(token, process.env.JWT_SECRET);
	} catch (err) {
		return { result: null, error: err };
	}
	return { result: isVerified, error: null };
};
