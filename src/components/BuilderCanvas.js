import React from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import useBuilderStore from '@/store';

import SortableItem from '@/components/SortableItem';

const BuilderCanvas = ({ onItemClick, selectedItemId, items, selectItem, isOver }) => {
    const { deleteItem } = useBuilderStore();

    const { setNodeRef } = useDroppable({
        id: 'canvas',
    });

    const canvasStyle = {
        backgroundColor: isOver ? '#e6f7ff' : undefined, // isOver prop 사용
        border: isOver ? '2px dashed #4A90E2' : '1px solid #ddd', // isOver prop 사용
        transition: 'background-color 0.2s ease-in-out, border 0.2s ease-in-out',
        flexGrow: 1,
        minHeight: '200px',
        position: 'relative',
        overflowX: 'hidden',
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

    const localHandleClick = (e, id) => {
        if (onItemClick) {
            onItemClick(e, id);
        }
    };

    return (
        <div ref={setNodeRef} className="builder-canvas h-100" onClick={(e) => {
            localHandleClick(e, null); // 캔버스 배경 클릭 시 선택 해제
        }} style={canvasStyle}>
            <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
                {items.map(item => (
                    <SortableItem
                        key={item.id}
                        id={item.id}
                        onClick={(e) => localHandleClick(e, item.id)}
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
    );
};

export default BuilderCanvas;