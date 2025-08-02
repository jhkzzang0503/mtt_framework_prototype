// src/components/Sidebar.js
import React from 'react';
import getModules from '../utils/getModules';
import DraggableModule from './DraggableModule';

const Sidebar = () => {
  const modules = getModules(); // modules는 { id, name, component(JSX) } 형태

  return (
      <div className="sidebar">
        {modules.map((module) => (
            <DraggableModule
                key={module.id}
                id={`sidebar-draggable-${module.id}`}
                type={module.name}
                renderComponent={module.component} // getModules에서 제공하는 실제 JSX 엘리먼트를 전달
            >
              {/* 사이드바에 표시될 미리보기 내용 */}
              <div style={{ width: '100%', border: '1px solid #ddd', overflow: 'hidden', padding: '5px' }}>
                {/* 여기서는 module.component를 그대로 렌더링하여 미리보기를 보여줍니다. */}
                {module.component}
              </div>
              <h3 style={{fontSize: '1em', margin: '5px 0'}}>
                {module.name.split('/').pop()} {/* 이름만 깔끔하게 표시 */}
              </h3>
            </DraggableModule>
        ))}
      </div>
  );
};

export default Sidebar;