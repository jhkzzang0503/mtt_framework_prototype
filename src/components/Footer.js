import React from 'react';

function Footer({ style, className }) {
    return (
        <footer style={style} className={`modern-footer ${className || ''}`}>
            <div className="container">
                <span>© 2025 mtt-framework-prototype. All rights reserved.</span>
            </div>
        </footer>
    );
}

export default Footer;
