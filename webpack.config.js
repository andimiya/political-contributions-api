const path = require('path');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');


// eslint-disable-next-line import/no-unresolved
const slsw = require('serverless-webpack');

module.exports = {
  entry: slsw.lib.entries,
  mode: slsw.lib.webpack.isLocal ? "development" : "production",
  target: 'node',
  module: {
    rules: [{
      test: /\.js$/,
      loaders: ['babel-loader'],
      include: __dirname + '/src',
      exclude: /node_modules/,
    }],
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  plugins: [
    //ignore the drivers you don't want. This is the complete list of all drivers -- remove the suppressions for drivers you want to use.
    new FilterWarningsPlugin({
      exclude: [/mongodb/, /mssql/, /mysql/, /mysql2/, /oracledb/, /pg/, /pg-native/, /pg-query-stream/, /react-native-sqlite-storage/, /redis/, /sqlite3/, /sql.js/, /@sap\/hdbext/, /Critical dependency: the request of a dependency is an expression/]
    })
  ]
};
