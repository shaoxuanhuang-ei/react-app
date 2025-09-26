import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import App from './App';
import './index.css';
import { QiankunProps } from './types';

// 动态设置 webpack 公共路径（适配 qiankun 环境）
if (window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

// 用于存储根实例，便于卸载
let root: Root | null = null;

// 渲染函数
const render = (props: QiankunProps = {}) => {
  const { container } = props;
  
  // 确定挂载节点
  const mountNode = container 
    ? container.querySelector('#root') 
    : document.getElementById('root');
  
  if (!mountNode) {
    throw new Error('子应用挂载节点不存在');
  }
  
  // 创建根实例并渲染
  root = createRoot(mountNode);
  root.render(
    <React.StrictMode>
      <App {...props} />
    </React.StrictMode>
  );
};

// 独立运行时直接渲染
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

// 导出qiankun所需的生命周期函数
export async function bootstrap() {
  console.log('[react-app] 初始化');
}

export async function mount(props: QiankunProps) {
  console.log('[react-app] 挂载', props);
  render(props);
}

export async function unmount() {
  console.log('[react-app] 卸载');
  if (root) {
    root.unmount();
    root = null;
  }
}
