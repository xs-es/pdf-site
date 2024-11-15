const path = require('path');

module.exports = {
  entry: './public/app.js', // Path to your entry file
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js',                 // Output bundle file
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      three: 'three/build/three.module.js',
      pdfjsLib: path.resolve(__dirname, 'node_modules/pdfjs-dist/webpack.mjs'),
    },
  },
  mode: 'development', // Use 'production' for production builds
};
