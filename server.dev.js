var path = require("path");

require("dotenv").load();
require("babel/register")({
	stage: 0
});

global.isClient = false;
global.isServer = true;

process.env.DIST_URL = "http://localhost:8000";

if(require("piping")({hook: true})) {
	require("./src/server");
}
