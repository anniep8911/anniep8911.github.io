## 결과 
[👉 잡코리아 브랜드 소개 페이지 바로가기](https://www.jobkorea.co.kr/brand/)

## 설계 방향

**풀페이지/스크롤 기반 인터랙션 모션을 라이브러리 없이 직접 설계하고,  
다양한 애니메이션 동기화/비동기 제어를 위한 JS 로직을 커스텀으로 구성했습니다.  
페이지 이동, 진입, 리셋까지 모두 컨트롤 가능한 구조로 확장성이 높은 인터랙션 시스템을 개발했습니다.**

---

## 작업환경

- 🖥 Frontend: HTML, SCSS, JavaScript (ES6)
- 📦 라이브러리 없음 (자체 인터랙션 모션 제작)
- 🧰 툴: VS Code, GitHub, Figma
- 🔧 빌드: Webpack, Jenkins
- 🌐 환경: 웹 표준 / 반응형 / 크로스브라우징

---

## 작업 일정

- 📅 기간: 2023.07.03 ~ 2023.07.14 (약 2주)
- 👩‍💻 역할: 전체 설계 및 개발 100% 진행
- ✅ 성과: 라이브러리 없이 전 구간 인터랙션 동작 / 요구사항 맞춤 설계

---


### 🖼️ 페이지 특징

- 감각적인 스크롤 애니메이션  
- 브랜드 메시지를 강조하는 타이포그래피 중심 구성  
- 반응형 설계로 PC/모바일 최적화

---

## 문제점

- 기존 인터랙션 모션은 외부 플러그인 사용 → 커스터마이징 한계  
- 애니메이션 제어 시, 전환 중 이벤트 충돌 발생  
- 스크롤 내 구간 진입 타이밍 분기 제어가 어려움  
- 디바이스별 전환 방식 통일성 미흡

---

## 해결방안

- **라이브러리 미사용 자체 인터랙션 모듈 개발**
  → scroll 이벤트, transitionend 등을 커스텀 핸들링
- **페이지 진입 제어 + 다음 동작 flag 제어**
  → `flag`, `nextStep` 변수로 이동 조건 분기
- **스크롤/디바이스 구간 구분 함수 설계**
  → `isMobtab()`, `pageMoveSync()`, `animEnd()` 등 각 역할 모듈화
- **인터랙션 컨트롤을 위한 구조화된 class 활용**
  → CSS class 중심으로 애니메이션 동작 + JS 상태 관리 분리

---
## 주요 구조 요약 (간단 코드)

```js
// 페이지 이동 중 플래그 및 인덱스 관리
function pageMoveSync(dir, idx) {
  if (!flag) return;
  addClass(pages[idx], 'onpage');
  setTimeout(() => {
    flag = false;
    nextStep = true;
  }, 300); // transition 기준 시간
}

// 애니메이션 종료 후 상태 리셋
element.addEventListener('transitionend', () => {
  flag = true;
  nextStep = false;
});
```

---

## 결과

- 외부 플러그인 없이 모든 인터랙션 로직 자체 설계  
- **요구사항별 맞춤형 커스터마이징 구조 구현 완료**  
- 모든 구간에서 scroll 이동, 페이지 진입, 애니메이션 완료 조건 분기 가능  
- **PC/모바일/태블릿 구간 분리 함수로 디바이스 대응 완성**

---

## 주요 구조 요약 (간단 코드)

```js
// transitionend 이벤트 후 다음 동작을 연결하는 함수
const animEnd = (el) => {
  return new Promise((resolve) => {
    el.addEventListener('transitionend', () => {
      setTimeout(() => {
        resolve();
      }, 200);
    }, { once: true });
  });
};

// 현재 방향(dir)과 인덱스(idx)에 따라 페이지 이동 처리
const pageMoveSync = (dir, idx) => {
  if (dir === 'up' && idx > 0) {
    idx--;
  } else if (dir === 'down' && idx < pages.length - 1) {
    idx++;
  }
  activeIndex = idx;
  addClass(pages[idx], 'active');
};

// 전체 스크롤 이벤트 막고 일정 시간 후 해제
const endMotion = (dir, done) => {
  window.addEventListener('wheel', stopScroll, { passive: false });
  setTimeout(() => {
    done();
    window.removeEventListener('wheel', stopScroll);
  }, 1000);
};

// 디바이스 유형에 따라 액션 분기 처리
const resWeb = (
  { mobSize: mobWid, tabSize: tabWid },
  { pcAction: pcAct, tabAction: tabAct, mobAction: mobAct }
) => {
  const brow = window.innerWidth;
  if (brow > tabWid) {
    pcAct();
  } else if (brow > mobWid && brow <= tabWid) {
    tabAct();
  } else {
    mobAct();
  }
};
```
