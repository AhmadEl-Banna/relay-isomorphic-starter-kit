import React from "react";
import ReactDOM from "react-dom";
import {Router} from "react-router";
import RouterRelay from "react-router-relay";
import createBrowserHistory from "history/lib/createBrowserHistory";

import routes from "./views/Routes";

const history = createBrowserHistory();

const mountNode = document.createElement("div");
document.body.appendChild(mountNode);

ReactDOM.render((
	<Router createElement={RouterRelay.createElement} history={history} routes={routes} />
), mountNode);
