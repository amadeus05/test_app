const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const contentRoot = '.tmp/public';

module.exports = {
  entry: {
    app: './assets/src/index.js'
  },
  output: {
    path: path.resolve(__dirname, contentRoot),
    filename: '[name].[chunkhash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              ['@babel/preset-env'],
              ['@babel/preset-react'],
            ],
            'plugins': [
              ['@babel/plugin-proposal-class-properties'],
              ['@babel/transform-runtime'],

            ]
          }
        }
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      },
      {
        use: ['style-loader', 'css-loader', 'sass-loader'],
        test: /\.scss$/
      },
      {
        test: /\.(jpg|png|gif|svg|pdf|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name]-[hash:8].[ext]'
            },
          },
        ]
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'assets/src/index.html',
      title: 'Production'
    }),
  ]
};
