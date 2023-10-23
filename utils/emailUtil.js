const mailer = require('nodemailer');
const fs = require('fs');
// Creates a mailer transporter object with authentication and base config

const transport = mailer.createTransport({
	host: 'smtp.gmail.com',
	port: 587,
	secure: false,
	service: 'gmail',
	auth: {
		user: process.env.USER,
		pass: process.env.APP_PASSWORD,
	},
});

exports.registrationMailer = (toMailId, userName) => {
	try {
		const message = {
			to: toMailId,
			subject: 'Registration Successful - Alumni Student Platform reg',
			html: fs
				.readFileSync(__dirname + '/mailInfo/registration.html')
				.toString()
				.replace(/&lt;&lt;Name&gt;&gt;/g, userName),
		};

		transport.sendMail(message, (err, info) => {
			if (err) {
				return {
					result: 'Failure: REGISTRATION mail NOT sent',
					error: err.message,
				};
			} else {
				return {
					result: `Success: REGISTRATION mail sent - ${info}`,
					error: null,
				};
			}
		});

		return { result: true, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

exports.resetPasswordMailer = (toMailId, userName, otp) => {
	try {
		const message = {
			to: toMailId,
			subject: 'OTP for Resetting Password - Alumni Student Platform reg',
			html: fs
				.readFileSync(__dirname + '/mailInfo/resetPassword.html')
				.toString()
				.replace(/&lt;&lt;Name&gt;&gt;/g, userName)
				.replace(/&lt;&lt;OTP&gt;&gt;/g, otp),
		};

		transport.sendMail(message, (err, info) => {
			if (err) {
				return {
					result: 'Failure: OTP mail NOT sent',
					error: err.message,
				};
			} else {
				return {
					result: `Success: OTP mail sent - ${info}`,
					error: null,
				};
			}
		});

		return { result: true, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};
