interface Window {
  // 标识是否被qiankun加载
  __POWERED_BY_QIANKUN__?: boolean;
  // qiankun注入的公共路径
  __INJECTED_PUBLIC_PATH_BY_QIANKUN__?: string;
  // 全局状态通信方法（可选，根据需要添加）
  __qiankun_global_state__?: any;
}

// 声明 Webpack 全局变量
declare let __webpack_public_path__: string;