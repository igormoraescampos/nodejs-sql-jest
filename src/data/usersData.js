const database = require('../infra/database');

exports.getUsers = function () {
	return database.query('select * from public.user');
};

exports.getUser = function (user_id) {
	return database.oneOrNone('select * from public.user where user_id = $1', [user_id]);
};

exports.getUserByUsername = function (username) {
	return database.oneOrNone('select * from public.user where username = $1', [username]);
};

exports.saveUser = function (user) {
	return database.one('insert into public.user (username, password, email) values ($1, $2, $3) returning *', [user.username, user.password, user.email]);
};

exports.updateUser = function (user_id, user) {
	return database.none('update public.user set (username, password, email) values ($1, $2, $3) where user_id = $4', [user.username, user.password, user.email, user_id]);
};

exports.deleteUser = function (user_id) {
	return database.none('delete from public.user where user_id = $1', [user_id]);
};
