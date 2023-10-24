const jwtTokenAuthorization = require('../services/jwtTokenAuthorization');

//	@route
//	@desc		Check Validity of  the JWT Token => if valid then call next()
//	@header	authorization

exports.protectedRoute = async (req, res, next) => {
	// Is Token exists in the header :

	const isAuthorizationExist =
		req.headers.authorization && req.headers.authorization.startsWith('Bearer');

	if (!isAuthorizationExist) {
		return res.status(403).json({
			status: 'Failure : isAuthorizationExist ',
			message: 'Forbidden response: No Token provided in the header',
		});
	}

	const token = req.headers.authorization.split(' ')[1];

	if (!token) {
		return res.status(401).json({
			status: 'Failure : token ',
			message: 'UnAuthorized : User is Not Logged In',
		});
	}

	// Is the token valid :

	const { result: isVerified, error: err } =
		jwtTokenAuthorization.verifyToken(token);

	if (err) {
		return res.status(401).json({
			status: 'Failure : isVerified ',
			message: 'UnAuthorized : Invalid Token',
		});
	}

	console.log(isVerified);

	req.body.tokenId = isVerified.id;

	next();
};
