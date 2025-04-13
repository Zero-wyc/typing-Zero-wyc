import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './styles/forcedColors.css';

import App from './App';
import './index.less';

console.log('APP_VERSION:', __APP_VERSION__);

// 确保默认背景图片在打包后正确加载
function ensureDefaultBackground() {
  // 检查是否有设置背景图片
  setTimeout(() => {
    const body = document.body;
    const bodyStyle = window.getComputedStyle(body);
    
    // 如果没有背景图片或背景图片是'none'
    if (!bodyStyle.backgroundImage || bodyStyle.backgroundImage === 'none') {
      // 尝试直接设置默认背景图片
      const base = import.meta.env.BASE_URL || '/';
      // 修改路径引用方式，确保在base不同的情况下都能正确加载
      const imgPath = new URL(`${base}images/甘城2_1.png`, window.location.origin).pathname;
      body.style.backgroundImage = `url("${imgPath}")`;
    }
  }, 100);
}

// 初始化背景
ensureDefaultBackground();

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
