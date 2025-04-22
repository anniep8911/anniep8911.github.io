## 설계 방향

**Figma에서 export한 JSON 타입의 아이콘 데이터를 활용해  
각각의 아이콘을 base64 이미지로 컨버팅하여 SCSS mixin과 HTML 가이드로 자동 변환하는 CLI 툴을 개발했습니다.  
이미지 다운로드 없이 바로 사용할 수 있도록 하여 작업 시간을 대폭 단축했습니다.**

---

## 작업환경

- 🖥 Runtime: Node.js v14.17.0
- 📦 Dependencies: 없음 (Pure Node)
- 📂 Input: Figma JSON (base64 내장)
- 📤 Output: `_icons.scss`, `icon_guid.html`

---

## 작업 일정

- 📅 기간: 2023.06 (약 1주)
- 👩‍💻 역할: 기획 · 설계 · 개발 100% 진행
- ✅ 성과: 아이콘 하나당 평균 1분 이상 소요되는 가공 작업을 자동화

---

## 문제점

- Figma에서 export된 이미지를 일일이 다운받고 base64로 변환해야 하는 불편함  
- 아이콘 리스트 정리 시 수동으로 HTML/SCSS 작성 필요  
- 일관된 사이즈/이름 컨벤션 유지가 어려움  
- SVG, PNG 등 포맷 혼재로 관리 어려움

---

## 해결방안

- **Figma JSON → SCSS/HTML 자동 변환 구조 설계**
  → 아이콘명, base64 코드, width, height를 추출하여 변수화
- **SCSS 파일 자동 생성 (`_icons.scss`)**
  → `$icons`, `$icons-width`, `$icons-height` 형태로 mixin에서 바로 사용 가능
- **HTML 가이드 문서 자동 생성 (`icon_guid.html`)**
  → 아이콘명, preview, SCSS/HTML 적용 가이드 포함
- **라이브러리 없이 Pure Node.js 사용**
  → 어떤 환경에서도 종속성 없이 실행 가능

---

## 주요 구조 요약 (간단 코드)

```js
// SCSS용 변수 추출
dataMakers(name, base64, width, height);
strsss.push(name);
strsssData.push(base64);
stwidth.push(width);
stheight.push(height);

// 아이콘 SCSS 변수 포맷 반환
return `$icons:(${strs}); \n $icons-width:(${width}); \n $icons-height:(${height});`

// HTML 가이드 생성
<td><i class="${e}" style="background-image: url('data:image/svg+xml;base64,${strsssData[i]}'); ..."></i></td>
