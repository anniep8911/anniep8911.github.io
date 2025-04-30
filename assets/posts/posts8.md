## 결과
<iframe src="https://anniep8911.github.io/newtrip/">
</iframe>

## 설계 방향

**사용자 선택 내용을 기반으로 여행 상품을 추천하는 웹 애플리케이션을 리뉴얼했습니다.  
반응형 구조, 데이터 바인딩, Vue SPA 구성까지 전체를 모듈 단위로 재설계하였습니다.  
JS cookie, JSON 데이터 연동 등 실사용 데이터를 반영한 구조입니다.**

---

## 작업환경

- 🖥 Frontend: JavaScript (ES6 + Babel), Vue.js v3.2, SCSS v1.55
- 💻 기타: font-awesome v6.2
- 🧰 툴: VS Code
- 🌐 환경: 크로스 디바이스 / 브라우저 대응

---

## 작업 일정

- 📅 기간: 2022.03.15 ~ 2022.03.29
- 👥 팀 구성: 2명 (프론트엔드 기여도 50%)
- 🧑‍💻 방식: XP(페어 프로그래밍)

---

## 문제점

- 기존 구조가 미디어 쿼리 및 레이아웃 대응이 불완전  
- 컴포넌트 구조가 단일 파일로 설계되어 재사용 어려움  
- 사용자 쿠키 기반 SPA 구조 적용 어려움  
- 속도 최적화 미흡 (Google Speed 기준 낮음)

---

## 해결방안

- **SCSS 모듈 기반 반응형 레이아웃 재설계**  
  → grid 시스템 도입, 미디어쿼리 기반 분기점 명확화

- **Vue 컴포넌트 구조 설계 및 모듈화**  
  → 파일 단위 분리 및 재사용 중심 설계

- **SPA 구조 및 라우터 설계**  
  → Vue Router 기반 단일 페이지 구성, cookie 기반 페이지 분기

- **속도 최적화**  
  → Google Speed 80점 → 96점 개선, 렌더링 병목 개선

---

## 결과

- 전체 SPA 구조로 전환  
- **Google Speed 기준 80점 → 96점** 성능 개선  
- SCSS grid system 기반 반응형 구조 완성  
- 크로스 디바이스 / 브라우저 완벽 대응  
- 컴포넌트 재사용성 및 유지보수 효율 상승  

---

## 주요 구조 요약 (간단 코드)

```js
// 반응형 레이아웃 SCSS 설정
@mixin grid($w) {
  padding: $w 0;
  width: $w;
  margin: auto;
}

// Vue Router 설정
import { createRouter } from 'vue-router';

const routes = [
  { path: '/newtrip', component: content01 },
  { path: '/newtrip/intro', component: content02 },
];
```

---

## GIT / SITE

- 🔗 GitHub: [https://github.com/anniep8911/mytrip](https://github.com/anniep8911/mytrip)  
- 🌍 Demo Site: [https://anniep8911.github.io/newtrip/](https://anniep8911.github.io/newtrip/)
