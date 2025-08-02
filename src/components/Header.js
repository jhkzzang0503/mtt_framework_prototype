import React from 'react';
import useBuilderStore from '@/store';

const Header = () => {
    const { saveLayout, loadLayout } = useBuilderStore();

    return (
        <header className="builder-header">
            <h1>MTT-Framework-Prototype</h1>
            <div className="button-group">
                <button onClick={loadLayout} className="btn btn-secondary">Load Layout</button>
                <button onClick={saveLayout} className="btn btn-primary">Save Layout</button>
            </div>
        </header>
    );
};

export default Header;
