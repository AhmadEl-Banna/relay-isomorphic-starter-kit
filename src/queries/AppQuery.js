import Relay from "react-relay";

export default {
	user: () => Relay.QL`
		query {}
	`
};

// export default class AppQuery extends Relay.Route {
// 	static queries = {
// 		user: () => Relay.QL`
// 			query {}
// 		`
// 	};
// 	static paramDefinitions = {};
// 	static routeName = "AppQuery";
// };
