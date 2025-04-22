## Webpack 빌드 자동 추적기 프로그램 개발

개발자 도구 | 개인 개발 | 2023.10  
**작성된 파일 경로를 자동 분석해 Webpack 설정을 자동 Override하는 Node.js CLI 도구**

#node.js #webpack #업무자동화 #config #개발툴

---

### 설계 방향

**작업한 CSS 또는 JS 파일의 경로를 기준으로 Webpack config에서 해당 빌드 키를 자동 추적하고  
`webpack.config.js`에 명령어 세팅을 자동 적용하는 CLI 프로그램을 제작했습니다.  
매번 수동으로 config를 검색하고 타이핑해야 하는 비효율을 제거해 생산성을 높였습니다.**

---

### 작업환경

- 🖥 Runtime: Node.js v14.17.0
- 📦 Dependencies: 없음 (Pure Node)
- 📂 Input: `css-config.js`, `js-config.js`, `webpack.config.js`
- 📤 Output: `webpack.config.js` 덮어쓰기 (자동 override)

---

### 작업 일정

- 📅 기간: 2023.10 (2일 작업)
- 👩‍💻 역할: 기획 · 설계 · 개발 전담
- ✅ 성과: 한 작업당 약 2분 이상 단축 가능, 실사용 중 업무 속도 체감 향상

---

### 문제점

- 신규 파일 작업 후 Webpack에서 해당 경로를 일일이 찾아야 하는 불편  
- Exports 방식으로 구성된 설정 구조 내에서 실제 빌드 키를 찾기 어려움  
- CSS/JS에 따라 빌드 명령어 포맷이 달라 적용이 번거로움  
- 수동 작업이 반복되어 실수 발생 가능성 존재

---

### 해결방안

- **CSS/JS config 전체를 읽어 경로와 파일명 분석**
- **key: value 형식으로 빌드 대상 경로를 자동 추출**
- **CSS 또는 JS 확장자에 따라 자동 분기 처리**
- **Webpack config 파일을 직접 탐색 후 자동으로 override 적용**
- **Exports 관련 라인 및 중복된 선언은 정리하여 깔끔하게 출력**

---

### 주요 구조 요약 (간단 코드)

```js
// 경로가 포함된 키만 추출
e.includes(':') && !e.includes('{') && (e.includes('.scss') || e.includes('.js'))

// 빌드 키 추적 후 override 처리
reData.forEach((e, i, a) => {
  e.includes('module.exports') ? a[i] += `\n${[fnalDt]}\n` : '';
});
```
