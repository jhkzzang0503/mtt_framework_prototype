import React from 'react';
import getModules from '../utils/getModules';
import DraggableModule from './DraggableModule';

const ModulesLayout = () => {
    const modules = getModules();

    return (
        // [수정] col-md-3와 sidebar-panel 클래스를 함께 적용
        <div className="sidebar-panel h-100 p-3 bg-light border-end d-flex flex-column"
             style={{overflowY: 'auto'}}>
            {Object.entries(modules).map(([categoryName, categoryModules]) => (
                <div key={categoryName}>
                    <h3 className="sidebar-category-title">{categoryName}</h3>

                    <div className="module-grid">
                        {categoryModules.map((module) => (
                            <DraggableModule
                                key={module.id}
                                id={`sidebar-draggable-${module.id}`}
                                type={module.name}
                                path={module.path}
                                renderComponent={module.component}
                            >
                                <div className="module-preview-card">
                                    <div className="preview-content-wrapper">
                                        <div className="preview-content">
                                            {module.component}
                                        </div>
                                    </div>
                                    <div className="preview-title">{module.name}</div>
                                </div>
                            </DraggableModule>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ModulesLayout;