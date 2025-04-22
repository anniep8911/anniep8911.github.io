## 자바스크립트 입문 강의 콘텐츠 제작 및 운영

### 설계 방향  
비전공자 및 초급 개발자 대상의 자바스크립트 입문 강의 콘텐츠를 직접 기획하고 제작함.  
수업은 개념 설명 후 실습으로 연결되는 구조이며,  
간단한 웹 앱 제작을 통해 핵심 문법과 DOM 조작을 체험할 수 있도록 설계함.  
모든 실습 예제는 직접 개발해 수업에서 시연 및 과제로 활용함.

### 작업환경  
🖥 Frontend: HTML, CSS, JavaScript (ES6)  
⚙️ 환경: GitHub Pages, 브라우저 개발자 도구  
🧰 툴: VS Code, GitHub  
📦 활용 API: DOM API, Canvas API

### 작업 일정  
📅 기간: 2024.11.09 ~ 2025.02.28 (약 4개월)  
👩‍🏫 역할: 강의 기획 · 콘텐츠 개발 · 수업 진행 전반 단독 수행

### 문제점  
- 추상적인 문법 설명만으로는 수강생 이해도에 한계 발생  
- 코드 작성보다 브라우저와의 연결 관계를 체감하기 어려움  
- 실습 예제가 없어 수업 중 집중도 및 흥미 저하

### 해결방안  
- 단계별 미니 프로젝트를 중심으로 실습형 강의 콘텐츠 구성  
- 클릭 이벤트, 조건문, DOM 제어 등 각 개념을 명확히 체감할 수 있도록 UI 설계  
- 정답 피드백, 동적 콘텐츠 출력 등으로 즉각적인 반응 구현  
- 수업 종료 후 GitHub에 실습 코드와 해설 업로드, 수강생 복습용 자료로 활용

### 결과  
- 수강생 이해도 및 과제 완수율 향상 (90% 이상)  
- 실습 후 개별 프로젝트 확장 → 퀴즈, 카드형 뉴스, 슬라이드 등 자율 개발 이어짐  
- 실습 콘텐츠 기반으로 향후 온라인 강의 및 기업교육 전환 가능성 확보

### 코드 요약 (실습 예시 일부)

```javascript
// 뉴스 카드 클릭 시 내용 표시
cards.forEach((card) => {
  card.addEventListener('click', () => {
    display.innerHTML = `<h2>${card.querySelector('h2').innerText}</h2>`;
  });
});

// 퀴즈 선택지 클릭 시 정답 판별
buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (btn.dataset.correct === 'true') result.innerText = '정답입니다!';
  });
});
```

### 실제 코드 링크  
🔗 [뉴스 카드 실습](https://annie309409.github.io/javascript0201/news.html)  
🔗 [퀴즈 실습](https://annie309409.github.io/javascript0201/quiz.html)  
🔗 [GitHub – 전체 실습 코드](https://github.com/annie309409/javascript0201)
