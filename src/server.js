import path from "path";
import express from "express";
import expressGraphQL from "express-graphql";
import React from "react";
import ReactDOM from "react-dom/server";
import createLocation from "history/lib/createLocation";
import {RoutingContext, match} from "react-router";
import ReactRouterRelay from "react-router";

import routes from "./views/Routes";
import Schema from "./data/schema";

let debug = process.env.DEBUG == "true";
let port = process.env.PORT ? parseInt(process.env.PORT) : 8080;

let server = express();

server.disable("x-powered-by");

server.use(express.static(path.join(__dirname, "..", "public")));

server.use("/graphql", expressGraphQL({
	schema: Schema,
	pretty: debug
}));

server.use((req, res, next) => {
	let render = [
		`<!DOCTYPE html>
		<html>
			<head>
				<title>relay-isomorphic-starter-kit</title>
				<meta charset="utf-8" />
			</head>
			<body>
				<div id="react-root"></div>
				<script type="text/javascript" src="/dist/client.js"></script>
			</body>
		</html>`
	].join("");

	res.type("text/html");
	res.send(render);


	// let location = createLocation(req.originalUrl);

	// TODO: fix this after Relay server-side rendering gets fixed

	// match({routes, location}, (err, redirectionLocation, renderProps) => {
	// 	if(redirectionLocation) {
	// 		return res.redirect(redirectionLocation.pathname);
	// 	}
	// 	if(err) {
	// 		return next(err);
	// 	}
	// 	if(!renderProps) {
	// 		return next();
	// 	}

	// 	let rendered = ReactDOM.renderToString(
	// 		<RoutingContext {...renderProps} createElement={ReactRouterRelay.createElement} />
	// 	);
	// 	let helmet = Helmet.rewind();
	// 	let html = [
	// 		`<!DOCTYPE html>,
	// 		<html>
	// 			<head>
	// 				<title>${helmet.title}</title>`,
	// 				helmet.meta,
	// 				helmet.link,
	// 				`<meta charset="utf-8" />
	// 			</head>
	// 			<body>
	// 				<div id="react-root">${rendered}</div>
	// 				<script type="text/javascript" src="/dist/client.js">
	// 			</body>
	// 		</html>`
	// 	].join("");
	//
	// 	res.type("text/html");
	// 	res.send(html);
	// });
});

server.listen(port);

export default server;