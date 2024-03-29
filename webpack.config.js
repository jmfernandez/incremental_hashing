const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
	app: path.resolve(__dirname,'app'),
	dist: path.resolve(__dirname,'dist')
};

function escapeRegExpString(str) { return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"); }
function pathToRegExp(p) { return new RegExp("^" + escapeRegExpString(p)); }

module.exports = {
	mode: "none",
	entry: {
		path: path.join(PATHS.app, 'code.js')
	},
	output: {
		filename: 'bundle.js',
		path: PATHS.dist
	},
	plugins:[
//		new webpack.ProvidePlugin({
//			// Parts here are needed to have bootstrap working properly
//			$: 'jquery',
//			jQuery: 'jquery',
//			'window.$': 'jquery',
//			'window.jQuery': 'jquery',
//			Popper: ['popper.js', 'default'],
//	//		// In case you imported plugins individually, you must also require them here:
//	//		//Util: "exports-loader?Util!bootstrap/js/dist/util",
//	//		//Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
//		}),
		//new HtmlWebpackPlugin({
		//	title: 'BSC Comorbidities web site',
		//	filename: path.join(PATHS.dist,'index-test.html')
		//}),
		new CopyWebpackPlugin({
			patterns: [
		//		{
		//			context: PATHS.app,
		//			from: 'json/*.json',
		//		},
				{
					context: PATHS.app,
					from: '*.html',
				}
			]
		})
	],
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.js$/,
				include: pathToRegExp(PATHS.app),
				loader: 'webpack-loader-denolint'
			},
			{
				test: /\.css$/,
				use: ['style-loader','css-loader']
			},
			{
				test: /\.png$/,
				use: [
					{
						loader: "file-loader",
						options: {
							outputPath: 'images/'
						}
					}
				]
				//loader: "url-loader?prefix=images/&limit=100000"
			},
			{
				test: /\.jpg$/,
				use: [
					{
						loader: "file-loader",
						options: {
							outputPath: 'images/'
						}
					}
				]
				//loader: "file-loader?prefix=images/"
			},
			{
				test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: "file-loader",
						options: {
							outputPath: 'styles/'
						}
					}
				]
				//loader: 'url-loader?prefix=styles/&limit=10000&mimetype=application/font-woff'
			},
			{
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: "file-loader",
						options: {
							outputPath: 'styles/'
						}
					}
				]
				//loader: 'url-loader?prefix=styles/&limit=10000&mimetype=application/octet-stream'
			},
			{
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: "file-loader",
						options: {
							outputPath: 'styles/'
						}
					}
				]
				//loader: 'file-loader?prefix=styles/'
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: "file-loader",
						options: {
							outputPath: 'images/'
						}
					}
				]
				//loader: 'url-loader?prefix=images/&limit=10000&mimetype=image/svg+xml'
			}
		]
	}
};
