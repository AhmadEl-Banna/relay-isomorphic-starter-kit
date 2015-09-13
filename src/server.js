import express from "express";
import expressGraphQL from "express-graphql";

import Schema from "./data/schema";

let debug = process.env.DEBUG == "true";
let port = process.env.PORT ? parseInt(process.env.PORT) : 8080;

let server = express();
server.use("/", expressGraphQL({
	schema: Schema,
	pretty: debug
}));
server.listen(port);

export default server;
