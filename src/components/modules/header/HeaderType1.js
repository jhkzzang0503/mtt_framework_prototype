import React from 'react';

const HeaderType1 = ({ style, className }) => {
    return (
        <header style={style} className={`modern-header-type1 ${className || ''}`}>
            <nav className="header-nav">
                <a href="#">홈</a>
                <a href="#">뉴스</a>
                <a href="#">메일</a>
                <a href="#">카페</a>
                <a href="#">블로그</a>
            </nav>
            <input type="text" placeholder="검색어를 입력하세요..." className="search-box" />
        </header>
    );
};

export default HeaderType1;
