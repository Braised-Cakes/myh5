module.exports = {
  devServer: {
    proxy: {
      '/aj': {
        target: 'http://localhost:3000', // 你接口的域名
        secure: true,
        changeOrigin: true
      },
      '/store': {
        target: 'http://localhost:3000', // 你接口的域名
        secure: true,
        changeOrigin: true
      }
    }
  }
}
