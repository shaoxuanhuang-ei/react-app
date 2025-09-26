module.exports = {
  webpack: (config) => {
    // 配置输出为umd格式
    config.output.library = 'react-app';
    config.output.libraryTarget = 'umd';
    config.output.globalObject = 'window';
    
    // 关键：修复开发环境资源路径
    if (process.env.NODE_ENV === 'development') {
      config.output.filename = 'static/js/main.js';
      config.output.chunkFilename = 'static/js/[name].js';
      // 移除可能导致文件名哈希的插件（如 CleanWebpackPlugin 等）
      // 精确过滤CleanWebpackPlugin（避免误删其他插件）
      // config.plugins = config.plugins.filter(plugin => {
      //   // 同时检查构造函数名称和实例类型（双重保险）
      //   return !(plugin instanceof CleanWebpackPlugin) && 
      //     plugin.constructor.name !== 'CleanWebpackPlugin';
      // });

      // 强制publicPath为绝对路径
      config.output.publicPath = 'http://localhost:3000/';
    }

    return config;
  },
  devServer: (configFunction) => {
    return (proxy, allowedHost) => {
      const config = configFunction(proxy, allowedHost);
      
      // 允许跨域
      config.headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*',
      };
      
      // 子应用端口
      config.port = 3000;

      // 允许访问静态资源（默认开启，但明确配置更稳妥）
      config.static = {
        publicPath: '/',
        watch: true,
      };
      
      // 关闭historyApiFallback
      config.historyApiFallback = false;
      
      return config;
    };
  },
};
