const path = require('path');
//const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: { 
    index: './src/index.ts',
    canvas: './src/canvasUI.ts'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  mode: 'production',
  node: {
    fs: 'empty'
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.css' ],
  },
  output: {
    filename: './js/[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: './dist',
  },
  //watch: true,
  //plugins: [new HtmlWebpackPlugin()]
};