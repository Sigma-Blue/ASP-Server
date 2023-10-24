const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const userRouter = require('./routes/v1/userRouter');

const app = express();

// MIDDLEWARES

app.use(cors());

app.use(express.json());

if (process.env.NODE_ENV == 'development') {
	app.use(morgan('dev'));
}

app.use((req, res, next) => {
	console.log('Hello from the middleware 👋');
	console.log(req.body);
	next();
});

app.use((req, res, next) => {
	req.requestTime = new Date().toISOString();
	next();
});

// Initial page

app.get('/', (req, res) => {
	res.send(
		'<center><h1> Alumni Student Platform API created By Metta Surendhar </h1><center>'
	);
});

// Routes

app.use('/api/v1/user', userRouter);

module.exports = app;
