// src/components/Sidebar.js (가정)
import React from 'react';
import DraggableModule from './DraggableModule'; // DraggableModule 임포트

function Sidebar() {
  return (
      <div className="sidebar" style={{ width: '280px', borderRight: '1px solid rgb(221, 221, 221)', padding: '15px', backgroundColor: 'rgb(249, 249, 249)', overflowY: 'auto', height: 'calc(-120px + 100vh)' }}>
        <div>
          <h4>Components</h4>
          <DraggableModule type="Header">Header Module</DraggableModule>
          <DraggableModule type="Footer">Footer Module</DraggableModule>
          <DraggableModule type="Button">Button Module</DraggableModule>
          <DraggableModule type="Card">Card Module</DraggableModule>
        </div>
      </div>
  );
}

export default Sidebar;