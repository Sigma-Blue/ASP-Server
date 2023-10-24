const crypto = require('crypto');
const userModel = require('./../models/userModel');

exports.createOtpToken = async () => {
	const otpToken = crypto.randomBytes(32).toString('hex');
	const passwordResetToken = crypto
		.createHash(process.env.OTP_ALGO)
		.update(otpToken)
		.digest('hex');

	return passwordResetToken.slice(0, 10);
};
