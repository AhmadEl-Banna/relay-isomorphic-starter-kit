var path = require("path");

require("babel/register")({
	stage: 0,
	plugins: ["./scripts/babelRelayPlugin"]
});

global.isClient = false;
global.isServer = true;

process.env.DEBUG = true;

if(process.env.NODE_ENV !== "production") {
	if(!require("piping")({hook: true})) {
		return;
	}
}

require("./src/server");
