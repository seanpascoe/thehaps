'use-strict';

var path = require('path');
var webpack = require('webpack');

// set TARGET=production on the environment to add asset fingerprints
var production = process.env.NODE_ENV === 'production';

var config = {
  // devtool: 'eval-source-map',
  // devtool: 'cheap-module-source-map',
  entry: [
    path.join(__dirname, '../client/index.js')
  ],
  output: {
    path: __dirname + '/static/',
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
    //,
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify('development')
    // }),
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     'NODE_ENV': JSON.stringify('production')
    //   }
    // })
    // ,
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false,
    //     screw_ie8: true
    //   },
    //   comments: false,
    //   sourceMap: false
    // })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: [/node_modules/, /eventutils/]
      },
      { test: /\.less$/, loader: 'style!css!less' }
    ]
  },
  resolve: {
    extensions: ['', '.js']
  }
};

if (production) {
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
    ,
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true
      },
      comments: false,
      sourceMap: false
    })
  )
  config.devtool= 'cheap-module-source-map';
} else {
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  )
  config.devtool = 'eval-source-map';
}

module.exports = config;
