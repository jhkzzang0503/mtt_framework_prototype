import React from 'react';
import DraggableModule from './DraggableModule';
import useBuilderStore from '../store'; // Correct import

function Sidebar() {
  // Use correct state and action names from the store
  const {
    items,
    selectedItemId,
    updateItem,
    deleteItem,
  } = useBuilderStore();

  // Find the selected item from the 'items' array
  const selectedItem = items.find(c => c.id === selectedItemId);

  // Generic handler to update any property of an item
  const handlePropertyChange = (e) => {
    const { name, value } = e.target;
    if (selectedItem) {
      // Call the correct update action from the store for properties
      updateItem(selectedItem.id, { [name]: value }, null);
    }
  };

  // Generic handler to update any style property of an item
  const handleStyleChange = (e) => {
    const { name, value } = e.target;
    if (selectedItem) {
      // Call the correct update action from the store for styles
      updateItem(selectedItem.id, null, { [name]: value });
    }
  };

  const handleDelete = () => {
    if (selectedItem && window.confirm('이 컴포넌트를 삭제하시겠습니까?')) {
      // Call the correct delete action from the store
      deleteItem(selectedItem.id);
    }
  };

  // Dynamically render input fields for each of the item's properties
  const renderPropertyInputs = () => {
    // Check for selectedItem and its properties
    if (!selectedItem || !selectedItem.properties) {
      return <p>컴포넌트의 속성을 찾을 수 없습니다.</p>;
    }

    // Use selectedItem.properties
    return Object.entries(selectedItem.properties).map(([propName, propValue]) => {
      const InputComponent = typeof propValue === 'string' && propValue.length > 50 ? 'textarea' : 'input';
      
      return (
        <div key={propName} style={{ marginBottom: '10px' }}>
          <label htmlFor={propName} style={{ display: 'block', marginBottom: '5px' }}>
            {propName.charAt(0).toUpperCase() + propName.slice(1)}:
          </label>
          <InputComponent
            id={propName}
            name={propName}
            value={propValue}
            onChange={handlePropertyChange}
            rows={InputComponent === 'textarea' ? 4 : undefined}
            style={{ width: '100%', padding: '5px', boxSizing: 'border-box' }}
          />
        </div>
      );
    });
  };

  // Render inputs for style properties
  const renderStyleInputs = () => {
    if (!selectedItem || !selectedItem.style) {
        return null;
    }

    return Object.entries(selectedItem.style).map(([styleName, styleValue]) => {
        return (
            <div key={styleName} style={{ marginBottom: '10px' }}>
                <label htmlFor={styleName} style={{ display: 'block', marginBottom: '5px' }}>
                    {styleName.charAt(0).toUpperCase() + styleName.slice(1)}:
                </label>
                <input
                    type="text"
                    id={styleName}
                    name={styleName}
                    value={styleValue}
                    onChange={handleStyleChange}
                    style={{ width: '100%', padding: '5px', boxSizing: 'border-box' }}
                />
            </div>
        );
    });
  };

  return (
    <div className="sidebar" style={{ width: '280px', borderRight: '1px solid #ddd', padding: '15px', backgroundColor: '#f9f9f9', overflowY: 'auto', height: 'calc(100vh - 120px)' }}>
      {selectedItem ? (
        <div className="property-panel">
          <h4>속성 편집</h4>
          <p style={{ fontSize: '12px', color: '#666' }}>ID: {selectedItem.id}</p>
          <p>타입: <strong>{selectedItem.type}</strong></p>
          <hr style={{ margin: '15px 0' }} />
          <h5>Properties</h5>
          {renderPropertyInputs()}
          <hr style={{ margin: '15px 0' }} />
          <h5>Styles</h5>
          {renderStyleInputs()}
          <button onClick={handleDelete} className="delete-button" style={{ marginTop: '20px', width: '100%', padding: '10px', backgroundColor: '#e53e3e', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            컴포넌트 삭제
          </button>
        </div>
      ) : (
        <>
          <h4>컴포넌트</h4>
          {/* Update DraggableModule types to match store */}
          <DraggableModule type="Header">
            헤더 모듈
          </DraggableModule>
          <DraggableModule type="Footer">
            푸터 모듈
          </DraggableModule>
          <DraggableModule type="Button">
            버튼 모듈
          </DraggableModule>
          <DraggableModule type="Card">
            카드 모듈
          </DraggableModule>
        </>
      )}
    </div>
  );
}

export default Sidebar;
