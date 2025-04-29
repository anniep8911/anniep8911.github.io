## 결과예시
<div class="imgWrap" data-share="3">
  <img src="/assets/image/tvc01.png">
  <img src="/assets/image/tvc02.png">
  <img src="/assets/image/tvc03.png">
</div>

---

## 설계 방향

**이벤트 목적에 따라 다이나믹하게 반응하는 페이지 구성과  
관리자가 재활용할 수 있는 구조를 목표로, 컴포넌트 단위로 기능을 분리하고 유틸화했습니다.  
Vue3 Composition API와 모듈화를 적극 활용하여 유지보수가 용이한 구조로 설계했습니다.**

---

## 작업환경

- 🖥 Frontend: HTML, SCSS, JavaScript (ES6)
- 🔧 Framework: Vue3 (Composition API)
- 📦 Build: Vite
- 🧰 Tool: GitHub, VS Code
- 🌐 환경: 반응형 웹 / 크로스브라우징

---

## 작업 일정

- 📅 기간: 2024.01 (약 1주)
- 👩‍💻 역할: 전체 퍼블리싱 · Vue 구조 설계 · 모듈화
- ✅ 성과: 프로모션 이벤트 페이지 3종 완성 및 컴포넌트 템플릿화

---

## 문제점

- 매 이벤트마다 동일한 구조의 페이지를 처음부터 새로 작업해야 함  
- form, swiper, popup 등 반복 요소에 대한 컴포넌트화 미흡  
- 페이지 로딩 시 환경 설정 및 라우터 세팅 반복

---

## 해결방안

- **페이지별 공통 요소를 컴포넌트 단위로 분리**  
  → form, alert, modal 등 기본 UI를 공용화  
- **유틸 및 이벤트 처리 로직 모듈화 (`useXXX`)**  
  → Composition API 활용  
- **라우터 및 환경 초기 세팅 자동화**  
  → 프로모션마다 경로만 바꾸면 자동 적용되도록 구조 설계

---

## 주요 구조 요약 (간단 코드)

```js
// 알림 팝업 공용 함수
export const useAlert = () => {
  const alertMsg = ref('');
  const openAlert = (msg) => {
    alertMsg.value = msg;
  };
  return { alertMsg, openAlert };
};

// 라우터 기본 구성
const routes = [
  { path: '/', component: MainPage },
  { path: '/event', component: EventPage }
];
```
