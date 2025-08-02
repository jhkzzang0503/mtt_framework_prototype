import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const InstagramStoryList = ({ style, className }) => {
  const dummyData = [
    { profileImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", storyImage: "https://images.unsplash.com/photo-1551392505-f4056032826e?q=80&w=1386&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "오늘의 메이크업" },
    { profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=776&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", storyImage: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "새로 산 옷 자랑" },
    { profileImage: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", storyImage: "https://images.unsplash.com/photo-1594834749740-74b3f6764be4?q=80&w=782&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "맛있는 점심" },
    { profileImage: "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", storyImage: "https://plus.unsplash.com/premium_photo-1663932464937-e677ddfc1d55?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "카페에서" },
    { profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", storyImage: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "오늘의 노을" },
    { profileImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", storyImage: "https://plus.unsplash.com/premium_photo-1738935671806-f74b1971a9a2?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "주말 나들이" },
    { profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", storyImage: "https://images.unsplash.com/photo-1570015652016-f4d63e51b2c5?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", title: "새로운 헤어스타일" },
  ];

  return (
      // [수정] 부트스트랩 row 클래스와 커스텀 클래스를 함께 사용
      <div style={style} className={`row insta-story-container ${className || ''}`}>
        {dummyData.map((item, index) => (
            // [수정] 각 카드를 부트스트랩 컬럼으로 감싸 반응형으로 만듭니다.
            // 큰 화면(lg)에서는 3개(4칸씩), 중간 화면(md)에서는 4개(3칸씩), 작은 화면(sm)에서는 6개(2칸씩) 표시
            <div key={index} className="col-lg-3 col-md-3 col-sm-4 col-6 mb-4">
              <div className="insta-story-card">
                <img src={item.storyImage} className="story-image" alt="스토리"/>
                <div className="story-overlay"></div>
                <div className="story-profile">
                  <img src={item.profileImage} alt="프로필"/>
                </div>
                <p className="story-title">{item.title}</p>
              </div>
            </div>
        ))}
      </div>
  );
};

export default InstagramStoryList;
