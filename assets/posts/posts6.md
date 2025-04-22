## 한국총판 시스템 고도화

### 설계 방향

**기존 jsp기반의 레거시 시스템을 유지하면서도, 반응형 및 모듈화된 UI 구현을 목표로 설계했습니다.  
컴포넌트 중심의 구조 재설계 및 CSS 정리로 유지보수성과 일관된 스타일 가이드를 확보했습니다.**

---

### 작업환경

- 🖥 Frontend: HTML, SCSS, JavaScript (ES6)
- 🧩 Backend: JSP
- 🧰 툴: VS Code, Git, Eclipse
- 🌐 환경: 웹 표준 / 반응형 / 크로스브라우징

---

### 작업 일정

- 📅 기간: 2022.10 ~ 2022.12
- 👩‍💻 역할: 단독 설계 및 프론트엔드 구조 개선
- ✅ 성과: 시스템 호환성 유지 + 반응형 UI 설계 완료

---

### 문제점

- JSP 기반 페이지로 반응형 설계가 어려움  
- 페이지마다 개별 스타일이 적용되어 일관성 부족  
- 재사용 불가능한 구조로 퍼블리싱 속도 저하  
- CSS 클래스 중복 및 불필요한 코드가 많음  

---

### 해결방안

- **모바일/PC 공통 구조로 레이아웃 재정의**  
- **스타일 공통화 및 mixin 중심 SCSS 구조 설계**  
- **페이지 단위 UI 모듈화 → JSP include 방식 대응**  
- **공통 요소(snippet) 분리 및 반응형 퍼블리싱 적용**  

---

### 결과

- 총 50개 이상 페이지 반응형 적용  
- **스타일 모듈화로 유지보수 시간 40% 단축**  
- 각 브라우저/해상도 테스트 완전 대응  
- 페이지별 유사 구성 UI Snippet 제작 완료  

---

### 주요 구조 요약 (간단 코드)

```text
// 레이아웃 대응 SCSS
.main-wrap {
  display: flex;
  flex-direction: column;
  @include mq(md) {
    flex-direction: row;
  }
}

// Snippet 예시
{
  "Article Component": {
    "prefix": "article",
    "body": [
      "<article class=\"article\">",
      "\t<header class=\"article__header\">",
      "\t\t<h2 class=\"article__title\">$1</h2>",
      "\t\t<p class=\"article__meta\">$2</p>",
       .....
      "\t<footer class=\"article__footer\">",
      "\t\t<button type=\"button\" class=\"btn btn--primary\">$4</button>",
      "\t</footer>",
      "</article>"
    ],
    "description": "Semantic article block with header, content, and footer"
  }
}

```
