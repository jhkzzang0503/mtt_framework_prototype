import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// [수정] props에 onDelete 추가
function SortableItem({ id, children, isSelected, onClick, onDelete, userClasses }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    border: isSelected ? '2px solid #4A90E2' : '1px solid #ddd',
    boxShadow: isSelected ? '0 0 5px rgba(74, 144, 226, 0.5)' : 'none',
    cursor: 'pointer',
  };

  // [추가] 삭제 버튼 클릭 핸들러
  const handleDeleteClick = (e) => {
    // 이벤트 버블링을 막아 부모의 onClick이 실행되지 않도록 함
    e.stopPropagation();
    onDelete(id);
  };

  return (
      <div
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
          onClick={onClick}
          className={`sortable-item ${userClasses || ''}`.trim()} // 이 클래스에 position: relative가 필요합니다.
      >
        {children}
        {isSelected && ( // isSelected가 true일 때만 X 버튼 렌더링
            <button className="delete-item-btn" onClick={handleDeleteClick}>
              X
            </button>
        )}
      </div>
  );
}

export default SortableItem;
