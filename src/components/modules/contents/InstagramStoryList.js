import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const InstagramStoryList = () => {
  const dummyData = [
    { profileImage: "https://via.placeholder.com/50", storyImage: "https://images.unsplash.com/photo-1551392505-f4056032826e?q=80&w=1386&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "오늘의 메이크업" },
    { profileImage: "https://via.placeholder.com/50", storyImage: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "새로 산 옷 자랑" },
    { profileImage: "https://via.placeholder.com/50", storyImage: "https://images.unsplash.com/photo-1594834749740-74b3f6764be4?q=80&w=782&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "맛있는 점심" },
    { profileImage: "https://via.placeholder.com/50", storyImage: "https://plus.unsplash.com/premium_photo-1663932464937-e677ddfc1d55?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "카페에서" },
    { profileImage: "https://via.placeholder.com/50", storyImage: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "오늘의 노을" },
    { profileImage: "https://via.placeholder.com/50", storyImage: "https://plus.unsplash.com/premium_photo-1738935671806-f74b1971a9a2?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "주말 나들이" },
    { profileImage: "https://via.placeholder.com/50", storyImage: "https://images.unsplash.com/photo-1570015652016-f4d63e51b2c5?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "새로운 헤어스타일" },
  ];

  return (
    <div className="row">
      {dummyData.map((item, index) => (
        <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4">
          <div className="card" style={{ height: '320px' }}>
            <img src={item.storyImage} className="card-img-top" alt="스토리" style={{ height: '200px', objectFit: 'cover' }} />
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
              <img src={item.profileImage} alt="프로필" className="rounded-circle" style={{ width: '30px', height: '30px' }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InstagramStoryList;
