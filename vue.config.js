const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  //publicPath: '/qdu_soft',
  devServer: {
    proxy: {
      '/cloud_disk_api': {
        //target: 'https://syhu.com.cn:8084',
        target: 'https://localhost:8085',
        ws: false,
        secure: false,
        changeOrigin: true,
        pathRewrite:{
          '^/cloud_disk_api/': '/'
        }
      }
    }
  }
})
