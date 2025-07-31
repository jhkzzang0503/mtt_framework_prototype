## 1단계: 프로젝트 초기 설정 및 기본 UI 구성 (완료)

- [x] `create-react-app`을 사용한 프로젝트 생성
- [x] 기본 컴포넌트(Header, Sidebar, BuilderCanvas, Footer) 구조 설계 및 생성
- [x] `react-dnd` 및 `react-sortablejs` 라이브러리 설치
- [x] 드래그 앤 드롭 기능 기본 구현

## 2단계: 핵심 UI 프로토타이핑 (완료)

- [x] **컴포넌트 속성 패널 구현**
    - [x] `App.js`에 선택된 컴포넌트를 관리하기 위한 `selectedComponent` 상태 추가
    - [x] 캔버스 내 컴포넌트 클릭 시 `selectedComponent` 상태 업데이트 로직 구현
    - [x] 선택된 컴포넌트에 시각적 피드백(예: 테두리) 추가
    - [x] `Sidebar.js`에서 `selectedComponent`가 있을 경우, 해당 컴포넌트의 속성을 편집할 수 있는 UI 렌더링
    - [x] 속성 편집 UI(예: 텍스트 영역)의 변경 사항을 `App.js`의 중앙 상태에 반영하는 로직 구현
- [x] **컴포넌트 삭제 기능 구현**
    - [x] `App.js`에 `handleDeleteComponent` 함수 생성
    - [x] `Sidebar.js`의 속성 패널에 '삭제' 버튼 추가
    - [x] 삭제 버튼 클릭 시 `handleDeleteComponent`를 호출하여 `canvasComponents` 배열에서 해당 컴포넌트 제거

## 3단계: 고급 기능 및 아키텍처 개선 (완료)

- [x] **상태 관리 라이브러리(Zustand) 통합 및 리팩토링**
    - [x] `zustand` 라이브러리 설치
    - [x] `src/store.js` 파일 생성하여 중앙 집중식 스토어 정의 (컴포넌트 상태 및 액션 포함)
    - [x] `App.js`에서 `useState` 기반의 상태 관리 로직 제거
    - [x] `Sidebar.js`, `BuilderCanvas.js`, `DraggableModule.js` 컴포넌트 리팩토링하여 props 전달 대신 스토어 직접 사용
- [x] **레이아웃 저장 및 불러오기 기능**
    - [x] `Header`에 '저장' 및 '불러오기' 버튼 추가
    - [x] 저장 시 현재 `canvasComponents` 상태를 JSON 형태로 LocalStorage에 저장하는 기능 구현
    - [x] 불러오기 시 LocalStorage의 JSON 데이터를 읽어 `canvasComponents` 상태를 복원하는 기능 구현
- [x] **더 많은 종류의 컴포넌트 모듈 추가**
    - [x] 'Card' 컴포넌트 모듈 추가 (이미지 + 텍스트 조합)
    - [x] 'Button' 컴포넌트 모듈 추가

## 4단계: 테스트 및 배포 (완료)

- [x] **주요 기능에 대한 단위/통합 테스트 코드 작성** (Jest, React Testing Library)
    - [x] 기본 렌더링 테스트 (`App.test.js`) 작성 완료
    - [x] 상태 관리 로직 테스트 (`store.test.js`) 작성 완료
    - [x] 속성 편집 및 삭제 기능 테스트 (`Sidebar.test.js`) 작성 완료
    - [x] 레이아웃 저장 및 불러오기 기능 테스트 (`Header.test.js`) 완료
- [x] `gh-pages`를 이용한 GitHub Pages 배포 설정 (사용자 요청으로 제외)