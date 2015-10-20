import Relay from "react-relay";

export default {
	user: () => Relay.QL`
		query {
			user(id: $userId)
		}
	`
};

// export default class UserQuery extends Relay.Route {
// 	static queries = {
// 		user: () => Relay.QL`
// 			query {
// 				user(id: $userId) {
// 					id
// 				}
// 			}
// 		`
// 	};
// 	static paramDefinitions = {
// 		userId: {
// 			required: true
// 		}
// 	};
// 	static routeName = "UserQuery";
// };
