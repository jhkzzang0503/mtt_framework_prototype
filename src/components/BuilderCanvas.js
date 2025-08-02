import React, { useState } from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable, useDndMonitor } from '@dnd-kit/core'; // <-- DndContext, DragOverlay 추가
import useBuilderStore from '@/store';
import SortableItem from '@/components/SortableItem';

const BuilderCanvas = () => {
    const { items, selectItem, selectedItemId, updateItemStyle, deleteItem } = useBuilderStore();
    const [over, setOver] = useState(null);
    const [activeItem, setActiveItem] = useState(null); // <-- activeItem 상태 추가
    const { setNodeRef } = useDroppable({
        id: 'canvas',
    });

    const [selectedModuleInfo, setSelectedModuleInfo] = useState(null);

    useDndMonitor({
        onDragStart: (event) => {
            const activeId = event.active.id;
            const item = items.find(i => i.id === activeId);
            setActiveItem(item);
        },
        onDragOver: (event) => setOver(event.over?.id),
        onDragEnd: (event) => {
            if (!event.over) {
                const draggedItemId = event.active.id;
                const itemExists = items.some(item => item.id === draggedItemId);

                if (itemExists) {
                    deleteItem(draggedItemId);
                    selectItem(null);
                    setSelectedModuleInfo(null);
                }
            }
            setOver(null);
            setActiveItem(null);
        },
        onDragCancel: () => {
            setOver(null);
            setActiveItem(null);
        },
        onDragLeave: () => setOver(null),
    });

    const canvasStyle = {
        backgroundColor: over ? '#e6f7ff' : undefined,
        border: over ? '2px dashed #4A90E2' : undefined,
        transition: 'background-color 0.2s ease-in-out, border 0.2s ease-in-out',
    };

    const renderComponent = (item) => {
        if (item.renderedComponent) {
            const originalComponent = item.renderedComponent;
            try {
                return (
                    <div
                        className={`${item.styles?.bootstrapClasses || ''} ${item.styles?.className || ''}`.trim()}
                        style={item.styles?.customStyles}
                    >
                        {/* 원본 컴포넌트는 일절 수정 없이 그대로 렌더링합니다. */}
                        {originalComponent}
                    </div>
                );
            } catch (error) {
                console.error("Error rendering component:", error);
                return <div>Error: Failed to apply styles to component.</div>;
            }
        }
        return <div>Error: Component not found for type: {item.type}</div>;
    };

    const handleClick = (e, id) => {
        e.stopPropagation();
        selectItem(id); // 기존의 전역 스토어 상태 업데이트
        const selected = items.find(item => item.id === id);
        setSelectedModuleInfo(selected); // [추가] 로컬 상태에도 선택 정보 저장
    };

    return (
        // [수정] 최상위 div 추가하여 스타일 편집기와 캔버스를 함께 래핑
        <div className="row h-100 m-0 align-items-stretch flex-grow-1">
            <div ref={setNodeRef} className="builder-canvas col-md-7 p-3 border" onClick={() => {
                selectItem(null);
                setSelectedModuleInfo(null);
            }} style={{...canvasStyle, flex: 1}}>
                <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
                    {items.map(item => (
                        <SortableItem
                            key={item.id}
                            id={item.id}
                            onClick={(e) => handleClick(e, item.id)}
                            isSelected={selectedItemId === item.id}
                            onDelete={deleteItem}
                        >
                            {renderComponent(item)}
                        </SortableItem>
                    ))}
                </SortableContext>
                {items.length === 0 && (
                    <div className="canvas-placeholder">
                        <p>Drop modules here from the sidebar to build your page.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BuilderCanvas;