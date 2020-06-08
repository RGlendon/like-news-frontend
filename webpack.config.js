const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const path = require('path');


module.exports = {                            // module.exports — это синтаксис экспорта в Node.js
  entry: {main: './src/index.js'},            // указали первое место куда заглянет webpack — файл index.js в папке src
  output: {                                   // указали в какой файл будет собирться весь js и дали ему имя
    path: path.resolve(__dirname, 'dist'),    // переписали точку выхода, используя утилиту path
    filename: '[name].[chunkhash].js'         // указали путь к файлу, в квадратных скобках куда вставлять сгенерированный хеш (ранее main.js)
  },
  module: {
    rules: [{                                 // тут описываются правила
      test: /\.js$/,                          // регулярное выражение, которое ищет все js файлы
      use: {loader: "babel-loader"},          // весь JS обрабатывается пакетом babel-loader
      exclude: /node_modules/                 // исключает папку node_modules
    }, {
      test: /\.css$/,                         // применять это правило только к CSS-файлам
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] // к этим файлам нужно применить пакеты, которые мы уже установили
    }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css'
    }),
    new HtmlWebpackPlugin({                   // настроили плагин
      // Означает, что:
      inject: false,                          // стили НЕ нужно прописывать внутри тегов
      // hash: true,                             // для страницы нужно считать хеш
      template: './src/index.html',           // откуда брать образец для сравнения с текущим видом проекта
      filename: 'index.html'                  // имя выходного файла, то есть того, что окажется в папке dist после сборки
    }),
    new WebpackMd5Hash()
  ]
};
