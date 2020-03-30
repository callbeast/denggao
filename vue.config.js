const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        'views': resolve('src/views'),
        'layout': resolve('src/layout'),
        'utils': resolve('src/utils')
      }
    }
  },

  devServer: {
    proxy: 'http://localhost:10000'
  }
}
