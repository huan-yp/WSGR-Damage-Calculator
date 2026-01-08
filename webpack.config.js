const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    home: './src/entries/home.ts',
    damage: './src/entries/damage/index.ts',
    limit: './src/entries/limit/index.ts',
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
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
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    // 首页（同时作为 index.html）
    new HtmlWebpackPlugin({
      template: './src/pages/home.html',
      filename: 'index.html',
      chunks: ['home'],
    }),
    // 伤害计算器页面
    new HtmlWebpackPlugin({
      template: './src/pages/damage.html',
      filename: 'damage.html',
      chunks: ['damage'],
    }),
    // 属性下限计算器页面
    new HtmlWebpackPlugin({
      template: './src/pages/limit.html',
      filename: 'limit.html',
      chunks: ['limit'],
    }),
    // CSS 提取
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2,
        },
      },
    },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 8080,
    open: true,
    hot: true,
  },
  mode: 'development',
};
