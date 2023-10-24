const otpGeneration = require('./../services/otpGeneration');
const userModel = require('./../models/userModel');
const moment = require('moment');

//	@route	/resetPassword/:userName
//	@desc		Generate an Otp token using otpGeneration service and store in db

exports.generateOtpToken = async (req, res, next) => {
	const otpToken = await otpGeneration.createOtpToken();
	const expiresIn = moment(new Date()).add(5, 'minutes').toISOString();

	console.log(expiresIn);
	const { result: createdToken, error: createdErr } =
		await userModel.createPasswordResetToken(otpToken, expiresIn);

	if (createdErr) {
		return res.status(500).json({
			status: 'Failure: CreatedErr',
			message: `Internal Server Error : ${createdErr}`,
		});
	}
	req.body.otpToken = otpToken;
	next();
};

//	@route	/resetPassword/:userName
//	@desc		remove the OTP Token in db based on the model condition

exports.removeOtpToken = async (req, res, next) => {
	const { result: deletedToken, error: deletedErr } =
		await userModel.deleteOtpTokenWithDate();
	if (deletedErr) {
		return res.status(500).json({
			status: 'Failure: CreatedErr',
			message: `Internal Server Error : ${deletedErr}`,
		});
	}
	next();
};
