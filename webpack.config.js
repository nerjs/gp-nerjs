const path = require('path');
const webpack = require('webpack');
var ETP = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');




const NODE_ENV = process.env.NODE_ENV || 'development';



const dirRoot = path.join(__dirname,'nerjs.github.io')
const src = path.join(__dirname,'src');


const conf = {
	context : src,
	entry : {
		core : ['fetch-polyfill','./index.js'],
		glob : ['fetch-polyfill','./glob.js']
	},
	output : {
		filename : './js/[name].js',
		path : dirRoot,
		publicPath : '/',
		// library : '_[name]App'
	},
	module : {}
}


//-- DEVTOOL -------------------
conf.devtool = 'inline-source-map';

//--  LOADERS ------------------------------

conf.module.rules = [{
	test: /\.js$/,
	exclude: /node_modules/,
	use : [
	  {
	    loader : 'babel-loader',
	    options : {
	    	presets : [['env',{
	    		targets : {
	    			browsers : 'last 3 versions'
	    		}
	    	}],'react'],
	    	plugins : [["transform-object-rest-spread", { "useBuiltIns": true }],'transform-runtime']
	    }
	  }
	]
},{
	test: /\.css$/,
	use: ETP.extract({
	  fallback : 'style-loader',
	  use : [{
	    loader : 'css-loader',
	    options : {
	      sourceMap : false
	    }
	  },{
	  	loader : 'postcss-loader',
	  	options : {
	  		config : {
	  			path : path.join(__dirname,'postcss.config.js'),
	  			ctx : {
	  				cssnextBrowsers : 'last 5 versions'
	  			}
	  		}
	  	}
	  }]
	})
}]





// -- ALIASES ---------------------
conf.resolve = {
	alias : {
		c : path.join(src,'components'),
		app : path.join(src,'appfiles'),
		api : path.join(src,'api'),
		v : path.join(src,'vendor'),
	}
}

//--  PLUGINS  ----------------------------  

conf.plugins = [
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.DefinePlugin({
    NODE_ENV: JSON.stringify(NODE_ENV),
    'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    'NODE_ENV': JSON.stringify(NODE_ENV)
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name : 'common'
  }),
  new ETP('./css/[name].css')
]

if (NODE_ENV == 'prodaction') {
	conf.plugins.push(
		new UglifyJsPlugin({
		  	sourceMap : false,
		  	uglifyOptions : {
		  		ecma : 6
		  	}
		}))
}

conf.watch = NODE_ENV == 'development';




module.exports = conf