import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CafeBoard = () => {
  const dummyData = [
    { title: "블라인드 게시판 클론 프로젝트", author: "John Doe", date: "2023-12-13" },
    { title: "React 개발자 구합니다", author: "Jane Doe", date: "2023-12-12" },
    { title: "오늘 점심 뭐 먹지?", author: "익명", date: "2023-12-11" },
    { title: "프론트엔드 개발자 연봉", author: "John Smith", date: "2023-12-10" },
    { title: "자바스크립트 공부 어떻게 시작하나요?", author: "Emily Davis", date: "2023-12-09" },
    { title: "오늘 날씨 너무 좋다", author: "Michael Brown", date: "2023-12-08" },
    { title: "내일 회식 어디서 할까요?", author: "Sarah Wilson", date: "2023-12-07" },
  ];

  return (
    <div className="cafe-board-container">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">제목</th>
            <th scope="col">작성자</th>
            <th scope="col">작성일</th>
          </tr>
        </thead>
        <tbody>
          {dummyData.map((item, index) => (
            <tr key={index}>
              <td>{item.title}</td>
              <td>{item.author}</td>
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CafeBoard;
