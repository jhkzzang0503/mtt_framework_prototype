// src/components/BuilderCanvas.js
import React, { useState } from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable, useDndMonitor } from '@dnd-kit/core';
import useBuilderStore from '../store';
import SortableItem from './SortableItem';

const BuilderCanvas = () => {
    const { items, addItem, selectItem, selectedItemId } = useBuilderStore();
    const [over, setOver] = useState(null);
    const { setNodeRef } = useDroppable({
        id: 'canvas',
    });

    useDndMonitor({
        onDragOver: (event) => {
            setOver(event.over?.id);
        },
        onDragLeave: (event) => {
            setOver(null);
        },
        onDragEnd: (event) => {
            setOver(null);
        }
    });

    const canvasStyle = {
        backgroundColor: over ? '#e6f7ff' : undefined,
        border: over ? '2px dashed #4A90E2' : undefined,
        transition: 'background-color 0.2s ease-in-out, border 0.2s ease-in-out',
    };

    const renderComponent = (item) => {
        if (item.renderedComponent) {
            return item.renderedComponent;
        } else {
            return <div>Error: Component not found or incorrectly rendered for type: {item.type}</div>;
        }
    };

    const handleClick = (e, id) => {
        e.stopPropagation();
        selectItem(id);
    };

    const [modalOpen, setModalOpen] = useState(false);
    const [filePath, setFilePath] = useState('');
    const [fileName, setFileName] = useState('');

    const handleGenerate = () => {
        setModalOpen(true);
    };

    const handleCreateFile = () => {
        const imports = items.map(item => `import ${item.type.split('/').pop()} from '@/components/modules/${item.type}';`).join('\n');
        const components = items.map(item => `<${item.type.split('/').pop()} />`).join('\n');

        const fileContent = `
            ${imports}
            
            const ${fileName}Component = () => {
              return (
                <div>
                  ${components}
                </div>
              );
            };
            
            export default ${fileName}Component;
        `;

        // 파일 생성 액션 요청
        const fullFilePath = '/src/' + filePath + '/' + fileName + '.jsx'; // /src 추가, 확장자 .jsx 추가
        console.log(JSON.stringify({
            action: 'create_file',
            file_path: fullFilePath,
            file_content: fileContent,
        }));

        setModalOpen(false);
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
            <button onClick={handleGenerate} style={{ position: 'absolute', bottom: '10px', right: '10px', backgroundColor: '#4A90E2', color: 'white', border: 'none', borderRadius: '5px', padding: '10px 20px', cursor: 'pointer' }}>생성</button>

            {modalOpen && (
                <div className="modal" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                        <input type="text" value={filePath} onChange={e => setFilePath(e.target.value)} placeholder="경로" style={{ marginBottom: '10px', padding: '8px', border: '1px solid #ccc', borderRadius: '5px', width: '100%' }} /><br />
                        <input type="text" value={fileName} onChange={e => setFileName(e.target.value)} placeholder="파일명" style={{ marginBottom: '10px', padding: '8px', border: '1px solid #ccc', borderRadius: '5px', width: '100%' }} /><br />
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button onClick={() => setModalOpen(false)} style={{ backgroundColor: '#eee', color: '#333', border: 'none', borderRadius: '5px', padding: '8px 16px', marginRight: '10px', cursor: 'pointer' }}>취소</button>
                            <button onClick={handleCreateFile} style={{ backgroundColor: '#4A90E2', color: 'white', border: 'none', borderRadius: '5px', padding: '8px 16px', cursor: 'pointer' }}>생성</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BuilderCanvas;