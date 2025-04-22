## WAKAUT (내 주변 운동시설 추천 서비스)

React 기반 위치 탐색 운동시설 추천 웹사이트 구축  
**Next.js 기반 SSR 환경 / 컴포넌트, 함수모듈 중심의 구조 설계**

#React.js #Next.js #SSR #AWS #컴포넌트화 #모듈화

---

### 설계 방향

**내 위치 탐색을 기반으로 실시간으로 주변 운동시설 정보를 추천해주는 사이트로,  
Next.js v10 기반 SSR 방식, 로그인 인증을 포함한 인터페이스를 설계했습니다.  
컴포넌트 단위 분리 및 가이드 작성, 리캡챠 보안 시스템 등 기능 중심으로 구조를 명확히 나눴습니다.**

---

### 작업환경

- 🖥 Frontend: JSX(React v16), JavaScript
- ⚙ Backend: AWS RDS(MariaDB), SQL(CRUD)
- 🔐 인증: Next Auth v3
- 🔧 라이브러리: Axios, Recaptcha
- 🧰 툴: Git wiki, IntelliJ
- 📦 배포: AWS EC2, NginX
- 🌐 환경: SSR 기반 / 크로스브라우징

---

### 작업 일정

- 📅 기간: 2023.12.15 ~ 2023.01 (약 2.5주)
- 👥 역할: 팀원 4명 중 기능구현 및 구조설계 담당 (50%)
- ✅ 성과: 예상보다 4일 빠르게 런칭 / 코드리뷰 및 리팩토링 시간 확보

---

### 문제점

- SSR 방식과 인증 처리의 복잡한 환경 세팅
- 반복되는 구조와 비효율적인 컴포넌트 재사용
- 자동접속 시도에 따른 보안 이슈 (recaptcha 미적용)
- 검색 시 SSR 환경에서의 데이터 바인딩 복잡도

---

### 해결방안

- **환경설정 및 모듈 설계 체계화**
  → next.config.js 설정, 이미지 최적화, 코드 스플리팅 설계

- **컴포넌트 구조 정리 및 재사용 가이드화**
  → 반복되는 리스트, 뷰어 등 JSX기반 재사용 구조 도입

- **Recaptcha 시스템 적용**
  → Google 공식 문서 기반 자동접속 차단, 요청 제한 대응

- **검색 자동완성 기능 구현**
  → 키 입력 시 SSR기반 검색어 필터링 및 정규식 활용 자동완성 적용

---

### 주요 구조 요약 (간단 코드)

```jsx
// 리스트 컴포넌트
export default function List({ props }) {
  return (
    <div className={`article ${props.match ? 'match' : ''}`}>
      <span>{props.name}</span>
    </div>
  );
}

// 검색 자동완성
const findInd = async (ind) => {
  setListFns(lists.filter(f => f.indexOf(ind) !== -1));
};
```
