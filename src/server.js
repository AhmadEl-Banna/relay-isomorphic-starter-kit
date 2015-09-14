import path from "path";
import express from "express";
import expressGraphQL from "express-graphql";

import Schema from "./data/schema";

let debug = process.env.DEBUG == "true";
let port = process.env.PORT ? parseInt(process.env.PORT) : 8080;

let server = express();

server.use(express.static(path.join(__dirname, "static")));

server.use("/", expressGraphQL({
	schema: Schema,
	pretty: debug
}));

server.get("*", function(req, res, next) {
	response.sendFile(path.resolve(__dirname, "public", "index.html"));
});

server.listen(port);

export default server;
