import React from 'react';
import useBuilderStore from '@/store';

const Header = () => {
  const { saveLayout, loadLayout } = useBuilderStore();

  return (
    <header>
      <button onClick={saveLayout}>Save Layout</button>
      <button onClick={loadLayout}>Load Layout</button>
      <h1>Builder</h1>
    </header>
  );
};

export default Header;
