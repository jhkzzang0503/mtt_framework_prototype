// src/App.js
import React from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import BuilderCanvas from './components/BuilderCanvas';
import Footer from './components/Footer';

// DndContext 관련 임포트: 아래 두 줄 중 하나만 남기고 다른 하나는 삭제 또는 주석 처리합니다.
// 필요한 모든 요소를 한 줄에서 임포트하는 것이 좋습니다.
import { DndContext, closestCenter, closestCorners, rectIntersection, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'; // 이 줄을 유지합니다.

// import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'; // 이 줄을 제거합니다. (중복)
import useBuilderStore from './store'; // store.js에서 addItem 액션을 사용하기 위해 임포트

function App() {
    const { addItem, moveItem, items } = useBuilderStore();

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8, // 드래그 시작을 위한 최소 이동 거리 (픽셀)
            },
        })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;

        // 사이드바에서 캔버스로 새 모듈을 드롭하는 경우
        if (active.data.current && active.data.current.isSidebarModule && over && over.id === 'canvas') {
            const type = active.data.current.type;
            addItem(type); // 새로운 아이템을 캔버스에 추가
        }
        // 캔버스 내에서 아이템을 정렬하는 경우
        else if (over && active.id !== over.id) {
            const oldIndex = items.findIndex((item) => item.id === active.id);
            const newIndex = items.findIndex((item) => item.id === over.id);
            if (oldIndex !== -1 && newIndex !== -1) {
                moveItem(oldIndex, newIndex);
            }
        }
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={rectIntersection} // `rectIntersection` 전략 사용 (이전 제안 반영)
            onDragEnd={handleDragEnd}
        >
            <div className="App">
                <Header />
                <div className="main-content">
                    <Sidebar />
                    <BuilderCanvas />
                </div>
                <Footer />
            </div>
        </DndContext>
    );
}

export default App;