import React from 'react';
import getModules from '../utils/getModules';
import DraggableModule from './DraggableModule';

const Sidebar = () => {
  const modules = getModules();

  return (
    <div className="col-3">
      {Object.entries(modules).map(([categoryName, module]) => (
        <div key={categoryName}>
          <div style={{ fontSize: '2em', fontWeight: 'bold', border: '3px', borderStyle: 'double'}}><h3>{categoryName}</h3></div>
          <div className="row">
            {module.map((module, index) => (
              <div key={index} className="">
                  <DraggableModule
                      key={module.id}
                      id={`sidebar-draggable-${module.id}`}
                      type={module.name}
                      path={module.path}
                      renderComponent={module.component} // getModules에서 제공하는 실제 JSX 엘리먼트를 전달
                  >
                      {/* 사이드바에 표시될 미리보기 내용 */}
                      <div style={{ width: '100%', hegiht: '200px', border: '1px solid #ddd', overflow: 'hidden', padding: '5px' }}>
                          {/* 여기서는 module.component를 그대로 렌더링하여 미리보기를 보여줍니다. */}
                          {module.component}
                      </div>
                  </DraggableModule>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;