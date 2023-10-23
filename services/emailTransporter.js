const mailer = require('nodemailer');

const transporter = mailer.createTransport({
	host: 'smtp.gmail.com',
	port: 587,
	secure: false,
	service: 'gmail',
	auth: {
		user: process.env.USER,
		pass: process.env.APP_PASSWORD,
	},
});

module.exports = transporter;
