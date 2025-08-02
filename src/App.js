// src/App.js
import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import BuilderCanvas from './components/BuilderCanvas';
import ModulesSet from './components/modulesSet';
import Footer from './components/Footer';

// DragOverlay import 제거
import { DndContext, rectIntersection, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import useBuilderStore from './store';

function App() {
    const { addItem, moveItem, items, updateItemStyle, selectItem, selectedItemId } = useBuilderStore();

    const [selectedModuleInfo, setSelectedModuleInfo] = useState(null);
    // activeDraggedItem 상태 제거
    // const [activeDraggedItem, setActiveDraggedItem] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    const handleDragStart = (event) => {
        // DragOverlay가 없으므로 activeDraggedItem 설정 로직 제거
        // const activeId = event.active.id;
        // let draggedItem;
        // if (event.active.data.current?.isSidebarModule) {
        //     draggedItem = {
        //         id: activeId,
        //         type: event.active.data.current.type,
        //         name: event.active.data.current.type.split('/').pop(),
        //         renderedComponent: event.active.data.current.renderedComponent,
        //         isSidebarModule: true
        //     };
        // } else {
        //     draggedItem = items.find(item => item.id === activeId);
        // }
        // setActiveDraggedItem(draggedItem);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        // activeDraggedItem 초기화 로직 제거
        // setActiveDraggedItem(null);

        if (active.data.current?.isSidebarModule && over?.id === 'canvas') {
            const type = active.data.current.type;
            const componentToRender = active.data.current.renderedComponent;
            const defaultProperties = active.data.current.defaultProperties;

            addItem({ type, renderedComponent: componentToRender, properties: defaultProperties });
            console.log(`Item type ${type} dropped on canvas.`);
        } else if (over && active.id !== over.id && items.some(item => item.id === active.id) && items.some(item => item.id === over.id)) {
            const oldIndex = items.findIndex((item) => item.id === active.id);
            const newIndex = items.findIndex((item) => item.id === over.id);
            if (oldIndex !== -1 && newIndex !== -1) {
                if (typeof moveItem === 'function') {
                    moveItem(oldIndex, newIndex);
                    console.log(`Item ${active.id} moved from index ${oldIndex} to ${newIndex}.`);
                } else {
                    console.error("moveItem is not a function when trying to move items within canvas.");
                }
            }
        } else if (!over && items.some(item => item.id === active.id)) {
            const draggedItemId = active.id;
            useBuilderStore.getState().deleteItem(draggedItemId);
            selectItem(null);
            setSelectedModuleInfo(null);
            console.log(`Item ${draggedItemId} deleted by dragging out of canvas.`);
        } else {
            console.log("No valid drop target or no movement detected.");
        }
    };

    const handleStyleChange = (styles) => {
        if (selectedItemId) {
            updateItemStyle(selectedItemId, styles);
            const updatedItem = items.find(item => item.id === selectedItemId);
            setSelectedModuleInfo(updatedItem);
        }
    };

    const handleClickItem = (e, id) => {
        e.stopPropagation();
        selectItem(id);
        const selected = items.find(item => item.id === id);
        setSelectedModuleInfo(selected);
    };

    // renderDragOverlayComponent 함수 제거
    // const renderDragOverlayComponent = (item) => { ... };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={rectIntersection}
            // onDragStart 핸들러를 DndContext에서 제거하거나 빈 함수로 유지
            // onDragStart={handleDragStart} // 주석 처리 또는 제거
            onDragEnd={handleDragEnd}
        >
            <div className="App d-flex flex-column min-vh-100">
                <Header/>
                <div className="main-content row flex-grow-1 m-0 align-items-stretch">
                    <div className="col-md-3 bg-light border-end d-flex flex-column h-100" style={{ overflowY: 'auto' }}>
                        <Sidebar />
                    </div>

                    <div className="col-md-7 p-3 d-flex flex-column h-100" style={{ overflowY: 'auto' }}>
                        <BuilderCanvas
                            onItemClick={handleClickItem}
                            selectedItemId={selectedItemId}
                            items={items}
                            selectItem={selectItem}
                        />
                    </div>

                    <div className="col-md-2 bg-light border-start p-3 d-flex flex-column h-100" style={{ overflowY: 'auto' }}>
                        <ModulesSet selectedModule={selectedModuleInfo} onStyleChange={handleStyleChange} />
                    </div>
                </div>
                <Footer/>
            </div>

            {/* DragOverlay 컴포넌트 제거 */}
            {/* <DragOverlay>
                {activeDraggedItem ? (
                    <div style={{ width: '150px', height: '150px', opacity: 0.8 }}>
                        {renderDragOverlayComponent(activeDraggedItem)}
                    </div>
                ) : null}
            </DragOverlay> */}
        </DndContext>
    );
}

export default App;