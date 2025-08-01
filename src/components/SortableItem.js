import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableItem({ id, children, isSelected, onClick }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  // @dnd-kit의 transform과 transition을 CSS 스타일로 변환합니다.
  // 이를 통해 부드러운 정렬 애니메이션이 구현됩니다.
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    border: isSelected ? '2px solid #4A90E2' : '1px solid #ddd',
    boxShadow: isSelected ? '0 0 5px rgba(74, 144, 226, 0.5)' : 'none',
    cursor: 'pointer', // Add a pointer cursor to indicate it's clickable
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners} // 이 리스너들을 통해 dnd-kit이 드래그 이벤트를 감지합니다.
      onClick={onClick}
      className="sortable-item"
    >
      {children}
    </div>
  );
}

export default SortableItem;
