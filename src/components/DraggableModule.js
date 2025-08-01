// src/components/DraggableModule.js
import React from 'react';
import { useDraggable, DragOverlay, useDndMonitor } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

function DraggableModule({ type, children }) {
  const { attributes, listeners, setNodeRef, isDragging, transform } = useDraggable({
    id: `sidebar-module-${type}`,
    data: {
      type: type,
      isSidebarModule: true,
    },
  });

  const [overlayStyle, setOverlayStyle] = React.useState({});
  const [overlayContent, setOverlayContent] = React.useState('');

  useDndMonitor({
    onDragStart: (event) => {
      if (event.active && event.active.rect.current) {
        // 드래그 시작 시 원본 요소의 ClientRect 정보를 기반으로 스타일을 설정합니다.
        setOverlayStyle({
          width: event.active.rect.current.width,
          height: event.active.rect.current.height,
          // DragOverlay가 독립적인 포지셔닝 컨텍스트를 가지도록 명시적으로 설정
          // 이 설정이 중요합니다.
          position: 'fixed', // DragOverlay는 기본적으로 fixed이므로 명시적으로 재확인
          top: event.active.rect.current.top, // 원본 요소의 Y 위치
          left: event.active.rect.current.left, // 원본 요소의 X 위치

          // 기타 시각적 스타일 (draggable-module에서 가져왔던 것들)
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
          cursor: 'grabbing', // 드래그 중인 상태를 나타내는 커서
          zIndex: 9999, // 다른 요소 위에 확실히 오도록 z-index 높게 설정
        });
        setOverlayContent(children);
      }
    },
    onDragMove: (event) => {
      // 드래그 중에도 위치를 업데이트하여 포인터와 오버레이의 불일치를 줄입니다.
      // transform은 @dnd-kit이 관리하므로 top/left만 조정합니다.
      if (event.active && event.active.rect.current && event.pointer) {
        setOverlayStyle(prevStyle => ({
          ...prevStyle,
          top: event.pointer.clientY - (prevStyle.height / 2), // 포인터 중앙에 오도록 조정
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
            <DragOverlay zIndex={10000}> {/* DragOverlay 자체의 z-index도 높여줍니다. */}
              <div
                  style={{
                    // @dnd-kit이 제공하는 transform을 직접 사용하지 않고,
                    // 우리가 계산한 top/left와 overlayStyle의 width/height를 사용합니다.
                    // transform: transform ? CSS.Transform.toString(transform) : undefined, // 이 줄을 제거하거나 주석 처리합니다.
                    ...overlayStyle,
                  }}
                  // className을 제거한 상태를 유지합니다.
              >
                {overlayContent}
              </div>
            </DragOverlay>
        )}
      </div>
  );
}

export default DraggableModule;