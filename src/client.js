import React from "react";
import ReactDOM from "react-dom";
import {Router} from "react-router";
import RouterRelay from "react-router-relay";
import createBrowserHistory from "history/lib/createBrowserHistory";

import routes from "./routes";

const history = createBrowserHistory();
const mountNode = document.getElementById("react-root");

ReactDOM.render((
	<Router createElement={RouterRelay.createElement} history={history} routes={routes} />
), mountNode);
