/**
 * Created by qitmac000068 on 2017/6/29.
 */
var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH,'app');
var BUILD_PATH = path.resolve(ROOT_PATH,'build');

module.exports = {
    entry : APP_PATH,
    output :{
        path:BUILD_PATH,
        filename:'bundle.js'
    },
    module:{
      loaders:[
          {
              test:/\.css$/,
              loaders:['style','css'],//loaders处理顺序从右到左
              include:APP_PATH
          },
          {
              test:/\.(png|jpg)$/,
              loader:'url?limit=40000'
          },
          {
              test:/\.jsx?$/,
              loader:'babel',
              include:APP_PATH,
              query:{
                  presets : ['es2015']
              }
          }
      ]
    },
    plugins:[
        new HtmlwebpackPlugin({
            title :'Hello World web'
        })
    ],
    devServer:{
        historyApiFallback:true,//不跳转
        hot:true,
        inline:true,//实时刷新
        progress:true,
    },
};