// src/components/HeaderComponent.js
import React from 'react';

// 이 컴포넌트의 스타일을 App.css 또는 별도의 CSS 파일에 정의할 수 있습니다.
function HeaderComponent({ text, style }) {
    // 기본 h1 태그의 큰 글씨 크기를 조절하거나, div/p 태그를 사용하고 CSS로 스타일링합니다.
    return (
        <div style={{ fontSize: '1.5em', fontWeight: 'bold', padding: '10px', ...style }}>
            {text || 'Header Text'}
        </div>
    );
}

export default HeaderComponent;