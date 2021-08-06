const express = require('express');
const app = express();
const port = 3000;

const usersRoute = require('./route/usersRoute');

app.use(express.json());

app.use('/', usersRoute);

app.use(function (error, req, res, next) {
	if (error.message === 'User already exists') {
		return res.status(409).send(e.message);
	}
	if (error.message === 'User not found') {
		return res.status(404).send(e.message);
	}
	res.status(500).send(e.message);
});

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`)
});