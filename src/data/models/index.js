import {default as User} from "./User";

User.sync().then(function() {
	User.create({
		name: "User A"
	});
	User.create({
		name: "User B"
	});
	User.create({
		name: "User C"
	});
	User.create({
		name: "User D"
	});
});

export {User};
