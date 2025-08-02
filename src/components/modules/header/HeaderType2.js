import React from 'react';

const HeaderType2 = ({ style, className }) => {
    return (
        <header style={style} className={`modern-header-type2 ${className || ''}`}>
            <div className="header-logo">LOGO</div>
            <nav className="header-nav">
                <a href="#">메일</a>
                <a href="#">카페</a>
                <a href="#">블로그</a>
                <a href="#">뉴스</a>
            </nav>
            <input type="text" placeholder="검색어를 입력하세요..." className="search-box" />
        </header>
    );
};

export default HeaderType2;
