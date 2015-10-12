import React from "react";
import {Route, IndexRoute} from "react-router";

import {
	App, 
	Main
} from "./views";

import {
	AppQuery,
	UserQuery
} from "./queries";

export default (
	<Route path="/" component={App} queries={AppQuery} >
		<Route path="user/:userId" component={Main} queries={UserQuery} prepareParams={(params, route) => ({...params, userId: parseInt(params.userId)})} />
	</Route>
);
