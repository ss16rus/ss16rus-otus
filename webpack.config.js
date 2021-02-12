const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    devtool: 'source-map',
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx", ".json"]
    },
    output: {
      path: path.join(__dirname, "dist"),
      filename: "index.js"
    },
    module: {
      rules: [
        {
          test: /\.(js|ts)x?$/,
          loader: "babel-loader",
          exclude: /node_modules/
        }
      ]
    },
    plugins:[
      new HtmlWebpackPlugin({
          title: 'Weather app',
          template: "src/index.html"
        })
    ],
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      hot: true,
      port: 9080,
      host: '0.0.0.0',
      onListening: function(server) {
        const port = server.listeningApp.address().port;
        console.log('Listening on port:', port);
      }
    }
}