import React from "react";
import Router from "react-router";

import routes from "./views/Routes";

import {
	UserRoute
} from "./routes";

Router.run(routes, Router.HistoryLocation, (Handler) => {
	React.render(
		<Relay.RootContainer
			Component={Main}
			route={}
		/>
	);
});
