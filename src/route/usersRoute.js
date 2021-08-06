const express = require('express');
const router = express.Router();
const usersService = require('../service/usersService');

router.get('/users', async function (req, res, next) {
	try {
		const users = await usersService.getUsers();
		res.json(users);
	} catch (e) {
		next(e);
	}
});

router.post('/users', async function (req, res, next) {
	const user = req.body;
	try {
		const newUser = await usersService.saveUser(user);
		res.status(201).json(newUser);
	} catch (e) {
		next(e);
	}
});

router.put('/users/:id', async function (req, res, next) {
	const user = req.body;
	try {
		await usersService.updateUser(req.params.id, user);
		res.status(204).end();
	} catch (e) {
		next(e);
	}
});

router.delete('/users/:id', async function (req, res, next) {
	try {
		await usersService.deleteUser(req.params.id);
		res.status(204).end();
	} catch (e) {
		next(e);
	}
});

module.exports = router;
