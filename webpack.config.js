var path = require('path');

module.exports = {
	entry: './src/app-demo.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename:'app.bundle.js'
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
			  loader: 'babel-loader'
			}
		}]
	}
};
