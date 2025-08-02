import React from 'react';
import html2canvas from 'html2canvas';

const HeaderType3 = () => {
  const handlePreviewClick = async () => {
    const element = document.getElementById('header-preview');
    if (element) {
      const canvas = await html2canvas(element);
      const dataUrl = canvas.toDataURL('image/png');
      const previewImage = document.getElementById('preview-image');
      if (previewImage) {
        previewImage.src = dataUrl;
      }
    }
  };

  return (
    <div>
      <div id="header-preview" style={{ width: '300px', border: '1px solid black' }}>
        {/* HeaderType3 내용 */}
        <h3>Header Type 3</h3>
      </div>
      <button onClick={handlePreviewClick}>미리보기 생성</button>
      <img id="preview-image" alt="미리보기" />
    </div>
  );
};

export default HeaderType3;