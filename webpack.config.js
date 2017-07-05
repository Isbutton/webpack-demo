/**
 * Created by qitmac000068 on 2017/6/29.
 */
var webpack = require('webpack');
var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
//在任何模块文件内部，可以使用__dirname变量获取当前模块文件所在目录的完整绝对路径。
var APP_PATH = path.resolve(ROOT_PATH,'app');
var BUILD_PATH = path.resolve(ROOT_PATH,'build');
var TEM_PATH = path.resolve(ROOT_PATH,'templates');

// process.traceDeprecation = true;
// process.noDeprecation = true;
module.exports = {
    entry : {
        app:path.resolve(APP_PATH,'index.js'),
        mobile:path.resolve(APP_PATH,'mobile.js'),
        vendors:['jquery','moment']
    },
    output :{
        path:BUILD_PATH,
        //修改bundle.js 用一个数组[name]来代替，他会根据entry的入口文件名称生成多个js文件，这里就是(app.js,mobile.js和vendors.js)
        filename:'[name].[hash].js'
    },
    module:{
      rules:[
          {
              test:/\.css$/,
              loaders:['style-loader','css-loader'],//loaders处理顺序从右到左
              include:APP_PATH
          },
          {
              test:/\.(png|jpg)$/,
              loader:'url-loader?limit=40000'
          },
          {
              test:/\.(jsx|js)$/,
              loader:'babel-loader?presets[]=es2015',
              include:APP_PATH,
              // query:{
              //     presets : ['es2015']
              // }
          },
          {
              test:/\.(jsx|js)$/,
              enforce:'pre',
              include: APP_PATH,
              exclude:/node_modules/,
              use:{
                  loader:'jshint-loader',
                  options:{
                      // 查询jslint配置项，请参考 http://www.jshint.com/docs/options/
                      // 例如
                      camelcase: true,
                      //jslint的错误信息在默认情况下会显示为warning（警告）类信息
                      //将emitErrors参数设置为true可使错误显示为error（错误）类信息
                      emitErrors: false,
                      //jshint默认情况下不会打断webpack编译
                      //如果你想在jshint出现错误时，立刻停止编译
                      //请设置failOnHint参数为true
                      failOnHint: false,
                      // 自定义报告函数
                      reporter: function(errors) { },
                      'esversion':6
                  }
              }
          }
      ],
    },
    plugins:[
        //这个使用uglifyJs压缩你的js代码
        new webpack.optimize.UglifyJsPlugin({minimize:true}),
        //把入口文件里面的数组打包成verdors.js
        new webpack.optimize.CommonsChunkPlugin({
            name:'vendors',
            filename:'vendors.js'
        }),
        new HtmlwebpackPlugin({
            title :'Hello World web',
            template : path.resolve(TEM_PATH,'index.html'),
            filename:'index.html',
            //chunks 引用entry里的那几个入口
            chunks:['app','vendors'],
            inject:'body'
        }),
        new HtmlwebpackPlugin({
            title :'Hello World mobile',
            template : path.resolve(TEM_PATH,'mobile.html'),
            filename:'mobile.html',
            //chunks 引用entry里的那几个入口
            chunks:['mobile','vendors'],
            inject:'body'
        })
    ],
    devServer:{
        historyApiFallback:true,//不跳转
        // hot:true,
        inline:true,//实时刷新
        //不要写colors:true，progress:true等，webpack2.x已不支持这些
    },
    devtool: 'eval-source-map',
};