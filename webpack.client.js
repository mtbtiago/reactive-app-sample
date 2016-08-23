var
  path = require("path"),
  webpack = require("webpack"),
  ExtractTextPlugin = require("extract-text-webpack-plugin");

const vendorModules = ["jquery", "lodash"];

const dirname = path.resolve("./");

function createConfig(isDebug) {
  const devTool = isDebug ? "eval-souce-map" : "source-map";
  const plugins = [new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.js")];

  const cssLoader = {test: /\.css$/, loader: "style!css"};
  const sassLoader = {test: /\.scss$/, loader: "style!css!sass"};
  const appEntry = ["./src/client/application.js"];

  if (!isDebug) {
    plugins.push(new webpack.optimize.UglifyJsPlugin());
    plugins.push(new ExtractTextPlugin("[name].css"));

    // in production we override css/sass loaders
    cssLoader.loader = ExtractTextPlugin.extract("style", "css");
    sassLoader.loader = ExtractTextPlugin.extract("style", "css!sass");
  } else {
    plugins.push(new webpack.HotModuleReplacementPlugin());
    // this injects this js file in our app (see that webpack-hot-middleware/client.js actually exist )
    // see also that this js file is inserted before our application.js. All vendor code must come before
    appEntry.splice(0, 0, "webpack-hot-middleware/client");
  }

  // -----------------
  // WEPACK CONFIG
  return {
    devtool: devTool,
    entry: {
      application: appEntry,
      vendor: vendorModules
    },
    output: {
      path: path.join(dirname, "public", "build"),
      filename: "[name].js", // special webpack syntax
      publicPath: "/build/"
    },
    resolve: {
      alias: {
        shared: path.join(dirname, "src", "shared")
      }
    },
    module: {
      loaders: [
        {test: /\.js$/, loader: "babel", exclude: /node_modules/},
        {test: /\.js$/, loader: "eslint", exclude: /node_modules/},
        {test: /\.(png|jpg|jpeg|gir|woff|ttf|eot|svg|woff2)/, loaders: ["file"]},
        cssLoader,
        sassLoader
      ]
    },
    plugins: plugins
  };
  // -----------------
}

module.exports = createConfig(true);
module.exports.create = createConfig;
