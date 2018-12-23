module.exports = {
  devServer: {
    port: 8088,
    // 本地服务器所加载的页面所在的目录
    /* contentBase: "./public", */
    historyApiFallback: true,
    // 实时刷新
    inline: true
  } 
}