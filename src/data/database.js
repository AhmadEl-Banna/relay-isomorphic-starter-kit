export class User extends Object {};

export function getUser(id) {
	let user = new User();
	user.id = id;
	return user;
};
