import path from "path";
import webpack from "webpack";

let config = {
	target: "web",
	cache: false,
	context: __dirname,
	entry: ["./src/client"],
	output: {
		path: path.join(__dirname, "static", "dist"),
		filename: "client.js",
		chunkFilename: "[name].[id].js",
		publicPath: "dist/"
	},
	plugins: [
		new webpack.DefinePlugin({
			isClient: true,
			isServer: false
		}),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin()
	],
	module: {
		loaders: [
			{
				include: /\.json$/,
				loader: "json-loader"
			},
			{
				include: /\.js$/,
				exclude: /node_modules/,
				loaders: [
					"babel-loader?stage=0&optional=runtime&plugins[]=" + encodeURIComponent(path.join(__dirname, "scripts", "babelRelayPlugin")
				]
			}
		]
	},
	resolve: {
		moduleDirectories: [
			"src",
			"node_modules",
			"web_modules"
		],
		extensions: ["", ".json", ".js"]
	},
	node: {
		__dirname: true,
		fs: "empty"
	}
};

export default config;
