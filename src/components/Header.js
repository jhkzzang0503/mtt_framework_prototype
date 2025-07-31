import React from 'react';
import useBuilderStore from '../store'; // Corrected import

const Header = () => {
  const saveLayout = useBuilderStore(state => state.saveLayout);
  const loadLayout = useBuilderStore(state => state.loadLayout);

  const handleSave = () => {
    if (saveLayout) {
      saveLayout();
      // Alert is now handled within the store
    } else {
      console.error('saveLayout function not found in the store.');
      alert('Save function is not available.');
    }
  };

  const handleLoad = () => {
    if (loadLayout) {
      loadLayout();
      // Alert is now handled within the store
    } else {
      console.error('loadLayout function not found in the store.');
      alert('Load function is not available.');
    }
  };

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      backgroundColor: '#20232a',
      color: 'white',
      borderBottom: '1px solid #444'
    }}>
      <h1>MTT Framework Builder</h1>
      <div>
        <button onClick={handleSave} style={{ marginRight: '10px', padding: '8px 12px', cursor: 'pointer' }}>Save Layout</button>
        <button onClick={handleLoad} style={{ padding: '8px 12px', cursor: 'pointer' }}>Load Layout</button>
      </div>
    </header>
  );
};

export default Header;
