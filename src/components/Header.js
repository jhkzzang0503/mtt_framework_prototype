import React from 'react';
import useBuilderStore from '../store';
import HeaderComponent from './header/HeaderComponent';
import HeaderType1 from './header/HeaderType1'; // Default import
import HeaderType2 from './header/HeaderType2'; // Default import
import HeaderType3 from './header/HeaderType3'; // Default import

const Header = () => {
  const { saveLayout, loadLayout } = useBuilderStore();

  return (
    <header>
      <button onClick={saveLayout}>Save Layout</button>
      <button onClick={loadLayout}>Load Layout</button>
      <h1>Builder</h1>
      <div>
        <HeaderComponent />
      </div>
    </header>
  );
};

export default Header;
