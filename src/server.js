import path from "path";
import express from "express";
import expressGraphQL from "express-graphql";
import ReactDOM from "react-dom/server";
import createLocation from "history/lib/createLocation";
import {RoutingContext, match} from "react-router";

import routes from "./views/Routes";
import Schema from "./data/schema";

let debug = process.env.DEBUG == "true";
let port = process.env.PORT ? parseInt(process.env.PORT) : 8080;

let server = express();

server.disable("x-powered-by");

server.use(express.static(path.join(__dirname, "public")));

server.use("/", expressGraphQL({
	schema: Schema,
	pretty: debug
}));

server.use((req, res, next) => {
	let location = createLocation(req.url);

	match({routes, location}, (err, redirectionLocation, renderProps) => {
		if(redirectionLocation) {
			return res.redirect(redirectionLocation.pathname);
		}
		if(err) {
			return next(err);
		}
		if(!renderProps) {
			return next(new Error("No render props"));
		}

		let rendered = ReactDOM.renderToString(<RoutingContext {...renderProps} />);
		let helmet = Helmet.rewind();
		let html = [
			`<!DOCTYPE html>`,
			`<html>`
				`<head>`,
					`<title>${helmet.title}</title>`,
					helmet.meta,
					helmet.link,
					`<meta charset="utf-8" />`
				`</head>`,
				`<body>`,
					`<div id="app">${rendered}</div>`
					`<script type="text/javascript" src="/dist/client.js">`
				`</body>`
			`</html>`
		].join("");
	});
});

server.listen(port);

export default server;