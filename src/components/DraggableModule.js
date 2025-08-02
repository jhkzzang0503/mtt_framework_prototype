// src/components/DraggableModule.js
import React from 'react';
import { useDraggable, DragOverlay, useDndMonitor } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

function DraggableModule({ type, children, id, renderComponent }) { // renderComponent prop 추가
                                                                    // const sourceCode = `<${type} />`; // 더 이상 문자열 sourceCode를 직접 생성하지 않습니다.

  // useDraggable에 전달할 data 객체
  const dataToPass = {
    type: type, // 모듈의 이름 (예: "header/HeaderComponent")
    isSidebarModule: true,
    // sourceCode: sourceCode, // 필요시 HTML 문자열을 저장할 수 있지만, 현재는 JSX 엘리먼트 자체를 전달하는 것이 목표
    renderedComponent: renderComponent, // getModules에서 제공하는 JSX 엘리먼트 자체를 전달
  };

  const { attributes, listeners, setNodeRef, isDragging, transform } = useDraggable({
    id: id,
    data: dataToPass,
  });

  const [overlayStyle, setOverlayStyle] = React.useState({});
  const [overlayContent, setOverlayContent] = React.useState('');

  useDndMonitor({
    onDragStart: (event) => {
      if (event.active && event.active.rect.current) {
        setOverlayStyle({
          width: event.active.rect.current.width,
          height: event.active.rect.current.height,
          position: 'fixed',
          top: event.active.rect.current.top,
          left: event.active.rect.current.left,
          padding: '10px',
          backgroundColor: '#f0f0f0',
          border: '1px solid #e0e0e0',
          borderRadius: '4px',
          fontSize: '1em',
          textAlign: 'center',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '40px',
          cursor: 'grabbing',
          zIndex: 9999,
        });
        setOverlayContent(children);
      }
    },
    onDragMove: (event) => {
      if (event.active && event.active.rect.current && event.pointer) {
        setOverlayStyle(prevStyle => ({
          ...prevStyle,
          top: event.pointer.clientY - (prevStyle.height / 2),
          left: event.pointer.clientX - (prevStyle.width / 2),
        }));
      }
    },
    onDragEnd: () => {
      setOverlayStyle({});
      setOverlayContent('');
    },
    onDragCancel: () => {
      setOverlayStyle({});
      setOverlayContent('');
    }
  });

  const style = {
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab',
  };

  return (
      <div>
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className="draggable-module"
        >
          {children}
        </div>
        {isDragging && (
            <DragOverlay zIndex={10000}>
              <div style={{ ...overlayStyle }}>
                {overlayContent}
              </div>
            </DragOverlay>
        )}
      </div>
  );
}

export default DraggableModule;