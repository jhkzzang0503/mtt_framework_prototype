import React from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useDroppable } from '@dnd-kit/core';
import useBuilderStore from '../store';
import SortableItem from './SortableItem';

// --- Mock Components (will be replaced by actual implementations later) ---
const Button = ({ text, style }) => <button style={style}>{text || 'Button'}</button>;
const Card = ({ title, content, style }) => (
  <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', ...style }}>
    <h4>{title || 'Card Title'}</h4>
    <p>{content || 'Card content goes here.'}</p>
  </div>
);
// --- End Mock Components ---

const BuilderCanvas = () => {
  const { items, moveItem, selectItem, selectedItemId } = useBuilderStore();
  const { setNodeRef } = useDroppable({
    id: 'canvas',
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      moveItem(oldIndex, newIndex);
    }
  };

  const renderComponent = (item) => {
    const componentProps = {
        ...item.properties,
        style: item.style
    };

    switch (item.type) {
      case 'Header':
        return <h1 {...componentProps}>{item.properties.text}</h1>;
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
    e.stopPropagation(); // Prevent event bubbling to the canvas
    selectItem(id);
  };

  return (
    <div ref={setNodeRef} className="builder-canvas" onClick={() => selectItem(null)}>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
          {items.map(item => (
            <SortableItem key={item.id} id={item.id} onClick={(e) => handleClick(e, item.id)} isSelected={selectedItemId === item.id}>
              {renderComponent(item)}
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>
      {items.length === 0 && (
          <div className="canvas-placeholder">
              <p>Drop modules here from the sidebar to build your page.</p>
          </div>
      )}
    </div>
  );
};

export default BuilderCanvas;