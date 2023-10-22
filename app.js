const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const exampleRouter = require('./routes/v1/exampleRouter');

const app = express();

// MIDDLEWARES

app.use(cors());

app.use(express.json());

if (process.env.NODE_ENV == 'development') {
	app.use(morgan('dev'));
}

app.use((req, res, next) => {
	console.log('Hello from the middleware 👋');
	next();
});

app.use((req, res, next) => {
	req.requestTime = new Date().toISOString();
	next();
});

// Routes
app.use('/api/v1/example', exampleRouter);

app.get('/', (req, res) => {
	res.send(
		'<center><h1> Alumni Student Platform API created By Metta Surendhar </h1><center>'
	);
});

module.exports = app;
