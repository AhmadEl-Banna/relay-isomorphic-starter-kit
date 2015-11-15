import React from "react";
import ReactDOM from "react-dom";
import createBrowserHistory from "history/lib/createBrowserHistory";
import {Router, match} from "react-router";
// import RouterRelay from "react-router-relay";
import {
	IsomorphicRelayRouter,
	storePreloadedData,
} from "isomorphic-relay-router";

import routes from "./routes";

const {pathname, search} = window.location;
const location = pathname + search;
const history = createBrowserHistory();

let render = () => {
	const mountNode = document.getElementById("react-root");

	ReactDOM.render((
		<Router createElement={RouterRelay.createElement} history={history} routes={routes} />
	), mountNode);
};


match({routes, location: pathname + search}, (err, redirectLocation, renderProps) => {
	if (renderProps) {
		const data = JSON.parse(document.getElementById("preloadedData").textContent);

		storePreloadedData(renderProps, data).then(render, render);
	} else {
		render();
	}
});
