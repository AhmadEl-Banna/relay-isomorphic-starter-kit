import React from "react";
import {Route, IndexRoute} from "react-router";

import {
	App, 
	User
} from "./views";

import {
	AppQuery,
	UserQuery
} from "./queries";

export default (
	<Route path="/" component={App} queries={AppQuery} >
		<Route path="user/:userId" component={User} queries={UserQuery} />
	</Route>
);
