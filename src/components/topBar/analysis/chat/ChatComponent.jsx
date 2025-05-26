import React, { useState, useEffect, useRef } from 'react';
import { Input, Button } from 'antd'; // 引入 Ant Design 的组件
import 'antd/dist/reset.css'; // 引入 Ant Design 样式（v4+ 推荐方式）

function ChatComponent() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const messageContainerRef = useRef(null);

    const addMessage = (content, isUser = false) => {
        setMessages(prev => [...prev, { content, isUser }]);
    };

    const sendMessage = async () => {
        const trimmedMessage = message.trim();
        if (!trimmedMessage) return;

        setMessage('');
        addMessage(trimmedMessage, true); // 用户消息

        // AI 消息占位符
        addMessage('<span style="display:inline-block; animation: pulse 1s infinite;">▍</span>');

        const apiUrl = `http://localhost:8090/api/v1/ollama/generate_stream?model=deepseek-r1:1.5b&message=${encodeURIComponent(trimmedMessage)}`;
        const eventSource = new EventSource(apiUrl);
        let buffer = '';

        eventSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                const content = data.result?.output?.content || '';
                const finishReason = data.result?.metadata?.finishReason;

                if (content) {
                    buffer += content;
                    updateLastMessage(buffer + '<span style="display:inline-block; animation: pulse 1s infinite;">▍</span>');
                }

                if (finishReason === 'STOP') {
                    eventSource.close();
                    updateLastMessage(buffer);
                }
            } catch (error) {
                console.error('解析错误:', error);
            }
        };

        eventSource.onerror = (error) => {
            console.error('EventSource 错误:', error);
            eventSource.close();
        };
    };

    const updateLastMessage = (content) => {
        setMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1].content = content;
            return updated;
        });
    };

    useEffect(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [messages]);

    // 样式定义
    const styles = {
        container: {
            width: '100%',
            maxWidth: '600px',
            height: '400px',
            display: 'flex',
            flexDirection: 'column',
            margin: '0 auto',
            fontFamily: 'Arial, sans-serif',
        },
        messageContainer: {
            flex: 5,
            overflowY: 'auto',
            padding: '16px',
            backgroundColor: 'rgba(183,174,174,0.1)', // 白色背景，80%不透明度
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            marginBottom: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
        },
        messageRow: (isUser) => ({
            display: 'flex',
            justifyContent: isUser ? 'flex-end' : 'flex-start',
        }),
        messageBox: (isUser) => ({
            maxWidth: '80%',
            padding: '12px',
            borderRadius: '12px',
            backgroundColor: isUser ? '#007bff' : 'pink',
            color: isUser ? '#fff' : '#333',
            wordWrap: 'break-word',
            fontSize: '14px',
        }),
        inputContainer: {
            display: 'flex',
            gap: '8px',
            padding: '12px',
            backgroundColor: 'rgba(183,174,174,0.5)',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
            height: '60px',
        },
        inputField: {
            flex: 1,
            fontSize: '14px',
            height: '100%',
        },
        sendButton: {
            width: '80px',
            height: '100%',
        },
    };

    return (
        <div style={styles.container}>
            {/* 消息容器 */}
            <div ref={messageContainerRef} style={styles.messageContainer}>
                {messages.map((msg, index) => (
                    <div key={index} style={styles.messageRow(msg.isUser)}>
                        <div
                            style={styles.messageBox(msg.isUser)}
                            dangerouslySetInnerHTML={{ __html: msg.content }}
                        />
                    </div>
                ))}
            </div>

            {/* 输入框和发送按钮（使用 Ant Design） */}
            <div style={styles.inputContainer}>
                <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="输入消息..."
                    onPressEnter={sendMessage} // 回车键触发发送
                    style={styles.inputField}
                />
                <Button type="primary" onClick={sendMessage} style={styles.sendButton}>
                    发送
                </Button>
            </div>
        </div>
    );
}

export default ChatComponent;