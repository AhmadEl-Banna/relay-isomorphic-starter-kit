import path from "path";
import webpack from "webpack";

import config from "./webpack.client";

let hostname = process.env.HOSTNAME || "localhost";
let port  = process.env.PORT ? parseInt(process.env.PORT) : 8000;

config.cache = true;
config.debug = true;
config.watch = true;
config.devtool = "eval";

config.entry.unshift(
	"webpack-dev-server/client?http://" + hostname + ":" + port,
	"webpack/hot/only-dev-server"
);

config.output.publicPath = "http://" + hostname + ":" + port + "/dist/";
config.output.hotUpdateMainFilename = "update/[hash]/update.json";
config.output.hotUpdateChunkFilename = "update/[hash]/[id].update.js";

config.plugins = [
	new webpack.DefinePlugin({
		isClient: true,
		isServer: false
	}),
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoErrorsPlugin()
];

config.module = {
	loaders: [
		{
			include: /\.json$/,
			loaders: ["json-loader"]
		},
		{
			inclide: /\.js$/,
			exclude: /node_modules/,
			loaders: [
				"react-hot-loader",
				"babel-loader?stage=0&optional=runtime&plugins[]=" + encodeURIComponent(path.join(__dirname, "scripts", "babelRelayPlugin"))
			]
		}
	]
};

config.devServer = {
	publicPath: "http://" + hostname + ":" + port + "/dist/",
	contentBase: "./static",
	hot: true,
	inline: true,
	lazy: false,
	quiet: true,
	noInfo: false,
	headers: {
		"Access-Control-Allow-Origin": "*"
	},
	stats: {
		colors: true
	},
	host: hostname,
	port: port
};

export default config;
