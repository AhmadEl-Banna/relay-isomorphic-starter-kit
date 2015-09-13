export default class UserRoute extends Relay.Route {
	static queries = {
		user: () => Relay.QL`
			query {
				user(id: $userId)
			}
		`
	};
	static paramDefinitions = {
		userId: {
			required: true
		}
	};
	static routeName = "UserRoute";
};
