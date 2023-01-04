const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const glob = require("glob");
module.exports = {
  mode: "production",
  entry: glob
    .sync(path.resolve(__dirname, "..", "src", "**", "*.ts*"))
    .reduce((entries, entry) => {
      entries[path.relative(path.resolve(__dirname, "..", "src"), entry)] =
        entry;
      return entries;
    }, {}),
  output: {
    path: path.join(__dirname, "../dist"),
    filename: (pathData) => {
      return pathData.chunk.name.replace(/\.(ts|tsx)$/, ".js");
    },
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: ".", to: ".", context: "public" }],
    }),
  ],
};
