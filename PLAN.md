# MTT Framework Prototype 개발 계획

## 1. 프로젝트 목표

- React와 Bootstrap 5를 기반으로 한 드래그 앤 드롭 방식의 UI/UX 화면 빌더 프로토타입 개발
- 영역별(헤더, 푸터 등) 모듈을 드래그하여 화면을 동적으로 구성하고, 지정된 경로에 파일로 생성하는 기능 구현
- 프로젝트의 모든 정보(기능, 구조 등)를 상세히 기록하여 라이브러리 검색 및 챗봇 데이터로 활용

## 2. 기술 스택

- **Frontend:** React.js, Bootstrap 5
- **UI/UX:** Drag & Drop 라이브러리 (예: `react-beautiful-dnd` 또는 `dnd-kit`)
- **Backend (초기 프로토타입):** Node.js 기반의 파일 생성 로직 (필요시)

## 3. 개발 단계

### Phase 1: 기본 환경 설정 및 계획 구체화 (진행중)

- [x] **PLAN.md 파일 생성 및 초기 계획 수립**
- [ ] `git` 저장소 초기화 및 `main` 브랜치 생성
- [ ] React 프로젝트 기본 폴더 구조 생성 (`public`, `src`)
- [ ] `package.json` 파일 생성 및 기본 의존성 (react, react-dom, bootstrap) 정의

### Phase 2: 핵심 UI/UX 프로토타입 개발

- [ ] 기본 레이아웃 컴포넌트 생성 (App, Header, Footer, Sidebar, MainContent)
- [ ] `Bootstrap 5` 프로젝트에 통합 및 기본 스타일 적용
- [ ] 사이드바에 표시될 기본 모듈 목록 UI 구현 (예: Card, Navbar, Jumbotron 등)
- [ ] 드래그 앤 드롭 기능 구현 (라이브러리 선정 및 적용)
- [ ] 드롭 영역(Canvas) 구현 및 드롭된 모듈 렌더링

### Phase 3: 화면 생성 및 관리 기능 개발

- [ ] 드롭된 모듈 구조를 JSON 형태로 변환하는 로직 구현
- [ ] '화면 생성' 버튼 및 파일 경로/이름 입력 UI 구현
- [ ] JSON 구조를 기반으로 실제 React 컴포넌트 파일(.jsx)을 생성하는 로직 구현
- [ ] 생성된 화면 목록 관리 및 미리보기 기능 구상

### Phase 4: 정보 기록 및 챗봇 연동 시스템

- [ ] 프로젝트 정보(컴포넌트, 기능 명세)를 구조화된 데이터(JSON, Markdown 등)로 저장하는 시스템 설계
- [ ] 저장된 데이터를 검색하고 조회하는 라이브러리 UI 구현
- [ ] 챗봇 학습을 위한 데이터 포맷 정의 및 데이터 변환/적재 파이프라인 구상

## 4. 다음 작업

- `git` 저장소 초기화
- React 프로젝트 폴더 구조 생성 (`public`, `src`)
- `package.json` 생성