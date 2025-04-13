/*
 * @Author: zhaoxuanzi
 * @Date: 2020-12-07 20:12:31
 * @LastEditors: zhaoxuanzi
 * @LastEditTime: 2021-02-18 10:48:01
 */
import site from '@/utils/siteIcon';
import storage from '@/utils/storage';
import store from '@/store';

import list from './config';

export default list;

export const changeTheme = (theme: typeof list[0]) => {
    // 切换主题时清除背景图片设置
    if (theme.name !== 'default') {
        // 清除背景图片相关的localStorage
        storage.local.remove('BACK_IMG_URL');
        storage.local.remove('BACK_IMG_BLUR');
        storage.local.remove('BACK_IMG_OPACITY');
        
        // 清除Redux状态中的背景图片设置
        store.dispatch({ type: 'setBackImgUrl', payload: '' });
        store.dispatch({ type: 'setBackImgBlur', payload: 0 });
        store.dispatch({ type: 'setBackImgOpacity', payload: 1 });
    }

    site.setSiteIcon(theme.bgColor, theme.textColor);
    
    const themeLinkEl = document.querySelector('#current-theme');
    if (!themeLinkEl) return;
    
    // 获取当前基础URL路径
    const baseEl = document.querySelector('#default-theme');
    if (baseEl) {
        const basePath = baseEl.getAttribute('href') || '';
        const baseDir = basePath.substring(0, basePath.lastIndexOf('/') + 1);
        
        // 生成主题名称（替换空格为连字符）
        const themeName = theme.name.replace(/ /g, '-');
        
        // 设置新主题路径
        themeLinkEl.setAttribute('href', `${baseDir}${themeName}.css`);
    }
};
