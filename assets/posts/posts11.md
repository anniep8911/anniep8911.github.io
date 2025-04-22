## 설계 방향

**Chart.js의 기본 기능을 넘어, 실제 현업 요구사항에 맞춘 다양한 시각화 컴포넌트를 설계하고 구축했습니다.  
초기 설계 단계부터 함수화, 객체화, 딥카피 구조를 직접 설계하여 유연한 커스터마이징과 확장 가능한 구조를 완성했습니다.**

---

## 작업환경

- 🖥 Frontend: HTML, SCSS, JavaScript (ES6)
- 📦 Library: Chart.js, jQuery
- 🧰 툴: VS Code, GitHub, Figma
- 🌐 환경: 웹 표준 / 반응형 / 크로스브라우징


---

## 작업 일정

- 📅  기간: 2024.07 ~ 2024.08 (약 5주)
- 👩‍💻 역할: 단독 설계 · 구조 모듈화 · 구현 · 테스트
- ✅ 성과: 70개 신규 차트 페이지 구축 완료

---

## 문제점

- Chart.js 기본 설정만으로는 디자인/인터랙션 요구사항 충족 어려움  
- 유사한 차트를 페이지마다 새롭게 구성해야 해 **중복 코드 증가**  
- 동일 차트 복수 삽입 시 객체 참조 문제로 충돌 발생  
- 툴팁, 라벨, stacked chart 등 복합 UI 대응이 비효율적

---

## 해결방안

- **차트 유형별 스타일 객체 정의** (`spendChart`, `selfChart`, `mixedBarChart` 등)  
- **공통 차트 생성 함수 `mkChart()` 설계 및 작성**  
  → 스타일 적용, 데이터 분석, 라벨/툴팁/스택 계산까지 포함  
- **딥카피 재귀 함수 `deepCopy()` 직접 제작**  
  → 차트 설정 중복 삽입 시 참조 충돌 방지  
- **툴팁/라벨 구성 유틸 함수**  
  → `labelSH()`, `mkLabel()`, `mkTimeline()` 등 인터랙션 중심 구성  
- **범용 모듈 설계로 시각화 템플릿화**  
  → 신규 차트 추가 시 설정만 바꿔 사용 가능

---

## 결과

- 총 70개 신규 차트 기반 통계 페이지 구축 (5주 내 완성)  
- **설정 기반 차트 생성 구조화로 개발 시간 50% 절감**  
- 타입별로 구분된 style object를 재사용함으로써 유지보수 시간 단축  
- stacked chart / dual axis / annotation 등 복합 시각화 완전 대응  
- 유틸 함수 모듈화를 통해 타 프로젝트에서도 재사용 가능

---

## 주요 구조 요약 (간단 코드)

```js
// 공통 차트 생성 함수
const mkChart = (dom, data) => {
  // 데이터 분리, y축 계산, 설정 적용 후 차트 렌더링
  // deepCopy로 설정 분리
  // 라벨 / 툴팁 유틸과 연동
};

// 딥카피 함수
const deepCopy = (obj) => {
  if (typeof obj !== 'object' || obj === null) return obj;
  const copy = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    copy[key] = deepCopy(obj[key]);
  }
  return copy;
};
```
---

## 실제 코드 파일 위치
> 📁 [코드 전체 보기 on GitHub](https://github.com/anniep8911/hdsun/blob/main/dist/assets/js/ui-functions.js)

>📘 [사용자 가이드 보기 (UI 함수 모듈)](https://anniep8911.github.io/hdsun/guide/guide-stats.html)

---

## 대표 이미지

![대시보드 UI](./assets/image/hdi.png)  
> *사용자 맞춤형 stacked bar chart 예시*

![툴팁 커스터마이징](./assets/image/hdiDash.png)  
> *툴팁 내용 및 스타일 커스터마이징 화면*
