/*
 * @Author: zhaoxuanzi
 * @Date: 2020-12-07 20:12:31
 * @LastEditors: zhaoxuanzi
 * @LastEditTime: 2021-01-28 19:30:16
 */
import React, { useEffect } from 'react';

import './Footer.less';

import { storeConnect, MapState as S, MapDispatch as D } from '@/store';

const Footer: React.FC<S & D> = (props) => {
    // 处理背景图片URL
    const getImageUrl = (url: string) => {
        if (!url) return '';
        // 如果是完整的URL（以http或https开头），则直接使用
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }
        // 否则，添加基础路径
        const base = import.meta.env.BASE_URL || '/';
        return `${base}${url.startsWith('/') ? url.substring(1) : url}`;
    };

    // 添加一个useEffect来移除或恢复默认背景
    useEffect(() => {
        if (props.$state.root.backImgUrl) {
            // 当有自定义背景时，移除默认背景图片
            document.body.style.backgroundImage = 'none';
        } else {
            // 当没有自定义背景时，恢复默认背景图片
            document.body.style.backgroundImage = 'var(--body-back-image)';
        }
        
        return () => {
            // 组件卸载时恢复默认背景
            document.body.style.backgroundImage = 'var(--body-back-image)';
        };
    }, [props.$state.root.backImgUrl]);

    return (
        <div className="app-footer">
            {props.$state.root.backImgUrl && (
                <img 
                    className="back__img" 
                    src={getImageUrl(props.$state.root.backImgUrl)} 
                    alt="" 
                    style={{
                        filter: `blur(${props.$state.root.backImgBlur}px)`,
                        opacity: props.$state.root.backImgOpacity
                    }}
                />
            )}
        </div>
    );
};

export default storeConnect(Footer);
