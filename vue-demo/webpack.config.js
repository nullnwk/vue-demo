const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
  mode: 'production',
  entry: './src/main.js',
  output: {
    filename: 'assets/js/[name].[hash:8].js',     //打包后文件名
    path: path.resolve(__dirname, 'dist'),         //打包后路径，必须是绝对路径
  },
  //开发服务器配置
  devServer: {
    port: 3000,    //端口号
    progress: true,   //是否显示进度条
    contentBase: './dist',   //目录
    open: true,      //是否自动打开
    compress: true
  },

  // 增加映射文件
  devtool: 'eval-source-map',      //不会生成.map的文件，显示错误的行和列

  resolve: {
    // 省略后缀名
    extensions: ['.js'],
    //配置别名，在项目中可缩减引用路径
    alias: {
      '@': path.join(__dirname, 'src'),
    }
  },

  // 优化项
  optimization: {
    minimizer: [
      new OptimizeCssAssetsWebpackPlugin(),
      new UglifyjsWebpackPlugin({
        cache: true,        //是否缓存
        parallel: true,     //并发打包
        uglifyOptions: {
          compress: {
            drop_console: true
          }
        },
      }),
    ]
  },

  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',   //模版
      filename: 'index.html',    //打包后文件名称
      minify: {
        removeAttributeQuotes: true,     //删除html双引号
        collapseWhitespace: true,        //折叠成一行
      },
      hash: true,      //加hash，放缓存
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[hash:8].css'       //css打包之后路径及文件名
    }),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin()
  ],

  //模块配置
  module: {
    rules: [   //模块规则
      {//html-withimg-loader
        test: /\.html$/,       //处理html中的图片
        use: 'html-withimg-loader'
      },
      {//url-loader
        test: /\.(png|jpg|gif)$/,   //处理css、js中的图片
        use: {                      //可以做限制，图片小于多少时，用base64来准换，超过限制用file-loader
          loader: 'url-loader',
          options: {
            limit: 200 * 1024,
            outputPath: 'img/',      //图片打包之后路径
            // publicPath:'www.niu.com'    //资源服务器路径，会自动添加在路径前面
          }
        }
      },
      {//babel-loader
        test: /\.js$/,
        exclude: /node_modules/,    //排除这里面的js
        include: path.resolve('src'), //只解析这里面的js
        use: {
          loader: 'babel-loader',
          options: {   //es6转es5
            presets: [
              '@babel/preset-env'
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime'
            ]
          }
        },
        include: path.resolve(__dirname, 'src'),    //在src中找
        exclude: '/node_modules'   //排除node_module下面的js
      },
      {//css-loader
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {//less-loader
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", 'postcss-loader', "less-loader"]
      },
      {//vue-loader
        test: /.vue$/,
        loader: 'vue-loader'
      }
    ]
  }

}