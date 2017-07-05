/**
 * Created by qitmac000068 on 2017/7/5.
 */

var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH,'app');
var BUILD_PATH = path.resolve(ROOT_PATH,'build');

module.exports = {
    entry : {
        app:path.resolve(APP_PATH,'index.js'),
        vendors:['jquery','moment']
    },
    output :{
        path:BUILD_PATH,
        filename:'bundle.js'
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
            title :'Hello World web'
        })
    ]
};