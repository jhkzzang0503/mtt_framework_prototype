// src/index.js (수정)
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// react-dnd 관련 임포트 제거:
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App /> {/* DndProvider 래퍼 제거, App 컴포넌트 직접 렌더링 */}
    </React.StrictMode>
);