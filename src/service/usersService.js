const usersData = require('../data/usersData');

exports.getUsers = function () {
	return usersData.getUsers();
};

exports.getUser = async function (user_id) {
	const user = await usersData.getUser(user_id);
	if (!user) throw new Error('User not found!');
	return user;
};

exports.saveUser = async function (user) {
	const existingUser = await usersData.getUserByUsername(user.username);
	if (existingUser) throw new Error('User already exists');
	return usersData.saveUser(user);
};

exports.deleteUser = function (user_id) {
	return usersData.deleteUser(user_id);
};

exports.updateUser = async function (user_id, user) {
	await exports.getUser(user_id);
	return usersData.updateUser(user_id, user);
};
