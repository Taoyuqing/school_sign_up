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
}
