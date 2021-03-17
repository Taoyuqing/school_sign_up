module.exports = {
  configureWebpack: {},
  lintOnSave: false,
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/jbjg': {
        target: 'http://www.jiuhaoyong.com', //对应自己的接口
        changeOrigin: true,
        pathRewrite: {
          '^/jbjg': '',
        },
      },
    },
  },
  // publicPath: '../wx-web', //这里解决静态资源引用路径问题
  // outputDir: 'wx-web',
  // 放置静态资源的地方 (js/css/img/font/...)
  assetsDir: 'static',
}
