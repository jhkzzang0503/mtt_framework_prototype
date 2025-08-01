// src/components/BuilderCanvas.js
import React from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import useBuilderStore from '../store';
import SortableItem from './SortableItem';
import HeaderComponent from './HeaderComponent';

const Button = ({ text, style }) => <button style={style}>{text || 'Button'}</button>;
const Card = ({ title, content, style }) => (
    <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', ...style }}>
      <h4>{title || 'Card Title'}</h4>
      <p>{content || 'Card content goes here.'}</p>
    </div>
);

const BuilderCanvas = () => {
  const { items, selectItem, selectedItemId } = useBuilderStore();
  const { setNodeRef, isOver } = useDroppable({
    id: 'canvas', // 캔버스 영역의 droppable ID
  });

  const canvasStyle = {
    // isOver 상태일 때만 인라인 스타일로 오버라이드합니다.
    // isOver가 false일 때는 아무것도 설정하지 않거나,
    // App.css의 .builder-canvas 스타일과 정확히 일치하도록 설정합니다.
    // 여기서는 isOver일 때만 스타일을 적용하도록 변경합니다.
    backgroundColor: isOver ? '#e6f7ff' : undefined, // App.css의 #f8f8f8을 유지하려면 undefined
    border: isOver ? '2px dashed #4A90E2' : undefined, // App.css의 1px dashed #a0a0a0을 유지하려면 undefined
    transition: 'background-color 0.2s ease-in-out, border 0.2s ease-in-out',
  };

  const renderComponent = (item) => {
    const componentProps = {
      ...item.properties,
      style: item.style
    };

    switch (item.type) {
      case 'Header':
        return <HeaderComponent {...componentProps} text={item.properties.text} />;
      case 'Footer':
        return <footer {...componentProps}>{item.properties.text}</footer>;
      case 'Button':
        return <Button {...componentProps} />;
      case 'Card':
        return <Card {...componentProps} />;
      default:
        return <div {...componentProps}>Unknown Component</div>;
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