import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'antd';
import analysisImg from '../../../assets/map_logo/t_map_3.png';

const AnalysisMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        /**
         * 关闭下拉菜单的处理函数。
         */
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        // 绑定事件，当窗口被点击时触发
        window.addEventListener('mousedown', handleClickOutside);

        // 清理事件监听器
        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div style={{ position: 'relative', zIndex: isOpen ? 2000 : 'auto' }} ref={containerRef}>
            <Button
                type={isOpen ? 'primary' : 'default'}
                onClick={() => setIsOpen(!isOpen)}
            >
                分析
            </Button>
            {isOpen && (
                <div style={{
                    position: 'absolute',
                    top: 70,
                    left: 0, // 考虑到侧边栏宽度为300px，这里设置left为300px以避免遮挡
                    zIndex: 2001, // 确保这个值大于侧边栏的 z-index
                    background: '#fff',
                    padding: 16,
                    borderRadius: 8,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                }}>
                    <img
                        src={analysisImg}
                        alt="分析工具"
                        style={{ width: 200, height: 150, objectFit: 'cover' }}
                    />
                </div>
            )}
        </div>
    );
};

export default AnalysisMenu;