const crypto = require('crypto');
const axios = require('axios');
const usersService = require('../service/usersService');

const generate = function () {
	return crypto.randomBytes(20).toString('hex');
};

const request = function (url, method, data) {
	return axios({ url, method, data, validateStatus: false });
};

test('Should get users', async function () {
	const user1 = await usersService.saveUser({ username: generate(), password: generate(), email: generate() });
	const user2 = await usersService.saveUser({ username: generate(), password: generate(), email: generate() });
	const user3 = await usersService.saveUser({ username: generate(), password: generate(), email: generate() });
	const response = await request('http://localhost:3000/users', 'get');
	expect(response.status).toBe(200);
	const users = response.data;
	expect(users).toHaveLength(3);
	await usersService.deleteUser(user1.user_id);
	await usersService.deleteUser(user2.user_id);
	await usersService.deleteUser(user3.user_id);
});

test('Should save a user', async function () {
	const data = { username: generate(), password: generate(), email: generate() };
	const response = await request('http://localhost:3000/users', 'post', data);
	expect(response.status).toBe(201);
	const user = response.data;
	expect(user.username).toBe(data.user);
	expect(user.password).toBe(data.password);
	expect(user.email).toBe(data.email);
	await usersService.deleteUser(user.user_id);
});

test('Should not save a user', async function () {
	const data = { username: generate(), password: generate(), email: generate() };
	const response1 = await request('http://localhost:3000/users', 'post', data);
	const response2 = await request('http://localhost:3000/users', 'post', data);
	expect(response2.status).toBe(409);
	const user = response1.data;
	await usersService.deleteUser(user.user_id);
});

test('Should update a user', async function () {
	const user = await usersService.saveUser({ username: generate(), password: generate(), email: generate() });
	user.username = generate();
	user.password = generate();
	user.email = generate();
	const response = await request(`http://localhost:3000/users/${user.user_id}`, 'put', user);
	expect(response.status).toBe(204);
	const updateUser = await usersService.getUser(user.user_id);
	expect(updateUser.username).toBe(user.username);
	expect(updateUser.password).toBe(user.password);
	expect(updateUser.email).toBe(user.email);
	await usersService.deleteUser(user.user_id);
});

test('Should not update a user', async function () {
	const user = {
		user_id: 1
	};
	const response = await request(`http://localhost:3000/users/${user.user_id}`, 'put', user);
	expect(response.status).toBe(404);
});

test('Should delete a user', async function () {
	const user = await usersService.saveUser({ username: generate(), password: generate(), email: generate() });
	const response = await request(`http://localhost:3000/users/${user.user_id}`, 'delete');
	expect(response.status).toBe(204);
	const users = await usersService.getUsers();
	expect(users).toHaveLength(0);
});