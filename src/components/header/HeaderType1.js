import React from 'react';

const HeaderType1 = () => {
  return (
    <header style={{ backgroundColor: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
      <nav style={{ display: 'flex' }}>
        <a href="#" style={{ marginRight: '1rem', color: 'black' }}>홈</a>
        <a href="#" style={{ marginRight: '1rem', color: 'black' }}>뉴스</a>
        <a href="#" style={{ marginRight: '1rem', color: 'black' }}>메일</a>
        <a href="#" style={{ marginRight: '1rem', color: 'black' }}>카페</a>
        <a href="#" style={{ color: 'black' }}>블로그</a>
      </nav>
      <input type="text" placeholder="검색" style={{ padding: '0.5rem', border: '1px solid #ccc' }} />
    </header>
  );
};

export default HeaderType1;