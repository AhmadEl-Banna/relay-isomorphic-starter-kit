import React from "react";
import {Route, IndexRoute} from "react-router";

import {
	App, 
	Main
} from "./index";

import {
	UserQuery
} from "../queries";

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Main} queries={UserQuery} />
	</Route>
);