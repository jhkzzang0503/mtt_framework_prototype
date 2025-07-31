import React from 'react';
import { useDraggable } from '@dnd-kit/core';

function DraggableModule({ type, children }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    // @dnd-kit은 각 드래그 가능한 요소에 고유한 ID를 요구합니다.
    id: `sidebar-module-${type}`,
    // 드롭 이벤트 핸들러에 전달할 추가 데이터입니다.
    // 이 플래그는 사이드바에서 온 새 모듈임을 식별하는 데 사용됩니다.
    data: {
      type: type,
      isSidebarModule: true,
    },
  });

  const style = {
    opacity: isDragging ? 0.5 : 1,
    cursor: 'move',
  };

  return (
    <div
      ref={setNodeRef} // 이 DOM 노드를 드래그 가능하게 만듭니다.
      style={style}
      {...listeners} // 드래그를 시작하는 이벤트 리스너(예: onMouseDown, onTouchStart)를 연결합니다.
      {...attributes} // 접근성(ARIA) 속성을 설정합니다.
      className="draggable-module"
    >
      {children}
    </div>
  );
}

export default DraggableModule;
