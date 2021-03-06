
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const SOURCE_DIR= path.resolve('./src');
const BUILD_DIR= path.resolve('./public/js');

const _s= filename => path.join(SOURCE_DIR, filename + '.js');

const webpackConfig= {

	target: 'web',

	entry: {
		script: [ 'main.client' ].map(k => _s(k)),
		// serviceworker: [ _s('serviceworker') ],
	},

	output: {
		path: BUILD_DIR,
		filename: '[name].js',
		publicPath: '/js/',
	},

	resolve: {
		extensions: ['.js'],
	},

	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
		]
	},

	devtool: 'source-map',

	plugins: [
		// new webpack.ProvidePlugin({
		// 	'Promise': 'es6-promise',
		// 	'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
		// }),
		// function() {
		// 	this.plugin('done', function(stats) {

		// 		const assets = stats.toJson().assets.filter(f => /\.js$/.test(f.name));

		// 		const bundleStats = {
		// 			assets
		// 		};

		// 		fs.writeFileSync(
		// 			path.join(__dirname, 'client', 'bundle-stats.json'),
		// 			JSON.stringify(bundleStats)
		// 		);
		// 	});
		// },
	],
};


// For production builds
if(process.argv.indexOf('-p') !== -1) {

	webpackConfig.plugins.push(
		new webpack.optimize.UglifyJsPlugin()
	);

	webpackConfig.plugins.push(
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"',
				ENV: '"node"',
			}
		})
	);

	webpackConfig.devtool= false;
} else {
	webpackConfig.plugins.push(
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"development"',
				ENV: '"browser"',
			}
		})
	);
}

module.exports= webpackConfig;
