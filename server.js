const app = require('./app');
require('dotenv-flow').config();

const port = process.env.PORT || 5000;

app.listen(port, async () => {
	console.log(`✅ Server listening on port ${port}`);
});
