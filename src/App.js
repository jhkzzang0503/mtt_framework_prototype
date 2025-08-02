// src/App.js
import React from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import BuilderCanvas from './components/BuilderCanvas';
import Footer from './components/Footer';

import { DndContext, rectIntersection, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import useBuilderStore from './store';

function App() {
    const { addItem, moveItem, items } = useBuilderStore();

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;

        console.log('Drag ended. Active:', active);
        console.log('Drag ended. Over:', over);
        console.log('Debug: type of moveItem:', typeof moveItem); // <-- 이 로그를 추가합니다.
        console.log('Debug: moveItem function itself:', moveItem); // <-- 이 로그도 추가합니다.

        // 사이드바에서 캔버스로 새 모듈을 드롭하는 경우
        if (active.data.current?.isSidebarModule && over?.id === 'canvas') {
            const type = active.data.current.type;
            const componentToRender = active.data.current.renderedComponent;
            const defaultProperties = active.data.current.defaultProperties;

            addItem({ type, renderedComponent: componentToRender, properties: defaultProperties });
            console.log(`Item type ${type} dropped on canvas.`);
        }
        // 캔버스 내에서 아이템을 정렬하는 경우
        else if (over && active.id !== over.id && items.some(item => item.id === active.id) && items.some(item => item.id === over.id)) {
            const oldIndex = items.findIndex((item) => item.id === active.id);
            const newIndex = items.findIndex((item) => item.id === over.id);
            if (oldIndex !== -1 && newIndex !== -1) {
                // moveItem이 함수가 아닐 경우 에러 발생
                console.log('Attempting to move item. oldIndex:', oldIndex, 'newIndex:', newIndex); // 추가 로그
                if (typeof moveItem === 'function') { // 안전하게 호출
                    moveItem(oldIndex, newIndex);
                    console.log(`Item ${active.id} moved from index ${oldIndex} to ${newIndex}.`);
                } else {
                    console.error("moveItem is not a function when trying to move items within canvas.");
                }
            }
        } else {
            console.log("No valid drop target or no movement detected.");
        }
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={rectIntersection}
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