import React from 'react';

const HeaderType2 = () => {
  return (
    <header style={{ backgroundColor: 'white', padding: '1rem', textAlign: 'center' }}>
      <div style={{ marginBottom: '1rem' }}>로고</div>
      <nav style={{ display: 'flex', justifyContent: 'center' }}>
        <a href="#" style={{ margin: '0 1rem', color: 'black' }}>메일</a>
        <a href="#" style={{ margin: '0 1rem', color: 'black' }}>카페</a>
        <a href="#" style={{ margin: '0 1rem', color: 'black' }}>블로그</a>
        <a href="#" style={{ margin: '0 1rem', color: 'black' }}>뉴스</a>
      </nav>
      <input type="text" placeholder="검색" style={{ marginTop: '1rem', padding: '0.5rem', border: '1px solid #ccc' }} />
    </header>
  );
};

export default HeaderType2;