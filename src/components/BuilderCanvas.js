// src/components/BuilderCanvas.js
import React, { useState } from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable, useDndMonitor } from '@dnd-kit/core';
import useBuilderStore from '../store';
import SortableItem from './SortableItem';

const BuilderCanvas = () => {
    const { items, addItem, selectItem, selectedItemId } = useBuilderStore();
    const [over, setOver] = useState(null);
    const { setNodeRef } = useDroppable({
        id: 'canvas',
    });

    useDndMonitor({
        onDragOver: (event) => {
            console.log("onDragOver: event.over:", event.over); // event.over 값 확인
            setOver(event.over?.id);
        },
        onDragLeave: (event) => {
            console.log("onDragLeave: event.over:", event.over); // event.over 값 확인
            setOver(null);
        },
        onDragEnd: (event) => {
            console.log("onDragEnd: event.over:", event.over); // event.over 값 확인
            setOver(null);
        }
    });

    const canvasStyle = {
        backgroundColor: over ? '#e6f7ff' : undefined,
        border: over ? '2px dashed #4A90E2' : undefined,
        transition: 'background-color 0.2s ease-in-out, border 0.2s ease-in-out',
    };

    const renderComponent = (item) => {
        if (item.renderedComponent) {
            return item.renderedComponent;
        } else {
            return <div>Error: Component not found or incorrectly rendered for type: {item.type}</div>;
        }
    };

    const handleClick = (e, id) => {
        e.stopPropagation();
        selectItem(id);
    };

    return (
        <div ref={setNodeRef} className="builder-canvas" onClick={() => selectItem(null)} style={canvasStyle}>
            <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
                {items.map(item => (
                    <SortableItem key={item.id} id={item.id} onClick={(e) => handleClick(e, item.id)} isSelected={selectedItemId === item.id}>
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