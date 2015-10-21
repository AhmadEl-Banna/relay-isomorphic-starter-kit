import path from "path";
import http from "http";
import https from "https";
import dotenv from "dotenv";
import winston from "winston";
import express from "express";
import expressWinston from "express-winston";
import expressGraphQL from "express-graphql";
import bodyParser from "body-parser";
import React from "react";
import ReactDOM from "react-dom/server";
import createLocation from "history/lib/createLocation";
import {RoutingContext, match} from "react-router";
import ReactRouterRelay from "react-router";

import routes from "./routes";
import Schema from "./data/schema";

dotenv.load();

const config = {
	debug: process.env.NODE_ENV !== "production",
	log: path.join(__dirname, "..", "logs", "server.log"),

	port: process.env.PORT || 8080,
	https: process.env.HTTPS === true || process.env.HTTPS === "true",
	httpsOptions: {},

	distURL: process.env.DIST_URL || "",

	isomorphic: process.env.ISOMORPHIC === true || process.env.ISOMORPHIC === "true"
};

const log = new winston.Logger({
	transports: [
		new winston.transports.Console({
			colorize: true,
			timestamp: true,
			level: config.debug ? "debug" : "info"
		}),
		new winston.transports.DailyRotateFile({
			filename: config.log,
			timestamp: true,
			level: "debug"
		})
	]
});

let app = express();

app.disable("x-powered-by");

app.use(express.static(path.join(__dirname, "..", "public")));

app.use(expressWinston.logger({
	winstonInstance: log,
	level: "info",
	expressFormat: true,
	meta: false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use("/graphql", expressGraphQL({
	schema: Schema,
	pretty: config.debug,
	graphiql: true
}));

app.use((req, res, next) => {
	// Isomorphic rendering is disabled until it actually works
	if(false && config.isomorphic) {
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
	} else {
		let render = [
			`<!DOCTYPE html>
			<html>
				<head>
					<title>relay-isomorphic-starter-kit</title>
					<meta charset="utf-8" />
				</head>
				<body>
					<div id="react-root"></div>
					<script type="text/javascript" src="${config.distURL}/dist/client.js"></script>
				</body>
			</html>`
		].join("");

		res.type("text/html");
		res.send(render);
	}
});

app.use(expressWinston.errorLogger({
	winstonInstance: log
}));

let server = null;
if(config.https) {
	server = https.createServer(config.httpsOptions, app);
} else {
	server = http.createServer(app);
}

server.listen(config.port);

log.info("Server started listening on port " + config.port);

export default server;
