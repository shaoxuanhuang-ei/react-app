import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import App from './App';
import './index.css';
import { QiankunProps } from './types';
import webEyeSDK from 'eye-sdk-main-app'

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
  try {
    // 在应用初始化阶段做一些 SDK 的全局配置（如果 SDK 提供 init 方法）
    (webEyeSDK as any)?.init?.({
      appName: 'react-app',
      env: process.env.NODE_ENV,
    });
    console.log('[react-app] webEyeSDK 初始化完成');
  } catch (e) {
    console.warn('[react-app] webEyeSDK 初始化失败', e);
  }
}

export async function mount(props: QiankunProps) {
  console.log('[react-app] 挂载', props);
  // 在挂载阶段可将 qiankun 传入的 props 提供给 SDK（例如 token、user 等）
  try {
    const sdkStart = (webEyeSDK as any)?.start || (webEyeSDK as any)?.login || (webEyeSDK as any)?.open;
    if (sdkStart && typeof sdkStart === 'function') {
      // 传递典型字段示例：token / user / container
      sdkStart.call(webEyeSDK, {
        token: (props as any).token,
        user: (props as any).user,
        container: (props as any).container,
      });
      console.log('[react-app] webEyeSDK 已启动');
    } else {
      console.log('[react-app] webEyeSDK 无启动方法，跳过启动');
    }
  } catch (e) {
    console.warn('[react-app] webEyeSDK 启动异常', e);
  }

  render(props);
}

export async function unmount() {
  console.log('[react-app] 卸载');
  if (root) {
    root.unmount();
    root = null;
  }
  try {
    const sdkDestroy = (webEyeSDK as any)?.destroy || (webEyeSDK as any)?.stop || (webEyeSDK as any)?.close;
    if (sdkDestroy && typeof sdkDestroy === 'function') {
      sdkDestroy.call(webEyeSDK);
      console.log('[react-app] webEyeSDK 已销毁');
    }
  } catch (e) {
    console.warn('[react-app] webEyeSDK 销毁异常', e);
  }
}
