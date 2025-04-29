## 사용예시
<iframe width="200" height="315" 
        src="https://www.youtube.com/embed/sXczKUltISI?si=9bvVFvd3-hvB5sQg" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
</iframe>
<video  height="315"  src="../../portfolioImages/unikey.mp4" controls> </video>

---

## 설계 방향

**Electron 기반의 데스크탑 앱으로, 실시간 키 입력 시각화를 통해  
수업 중 단축키 시연이나 개인 키보드 입력 분석에 도움을 주는 가상 키보드를 설계했습니다.  
디자인, 인터랙션, 시각효과를 직접 구현하며 시인성과 반응성을 높였습니다.**

---

## 작업환경

- 🖥 Frontend: HTML, CSS(SCSS), JavaScript (ES6)
- ⚙️ 환경: Electron v33, Node.js v14
- 🧰 툴: VS Code
- 📦 라이브러리: `node-global-key-listener`, `electron-packager`

---

## 작업 일정

- 📅 기간: 2024.12 ~ 2025.01 (약 4주)
- 👩‍💻 역할: 기획 · 디자인 · 개발 · 테스트 전반 단독 수행
- ✅ 성과: 수업용 시연 툴로 활용 중 (단축키 인식률 및 시인성 테스트 완료)

---

## 문제점

- 수업 중 단축키 시연 시 학생들이 입력을 놓치는 경우가 많음  
- 화면공유 중 키보드 입력이 가시적으로 전달되지 않음  
- macOS 또는 Windows 등 멀티 플랫폼 대응이 어려움  
- 키 상태(Shift, CapsLock 등)의 동기화 처리가 복잡함

---

## 해결방안

- **Electron 기반 UI 구현 → HTML + CSS + JS 조합으로 레이아웃 자유도 확보**  
- **node-global-key-listener로 모든 키 이벤트 캡처 (시스템 전체 레벨)**  
- **각 키를 div로 표현하고 상태 변화 시 class 변경 → 시각 효과 처리**  
- **입력 이력 출력 / 드래그 가능한 창 설계 → 수업 상황에 따라 커스터마이징 가능**  
- **각 테마별 스킨 삽입 및 효과음 설정으로 시각적 집중 유도**

---

## 결과

- 수업 중 단축키 실습 시 활용 가능한 시각화 툴 완성  
- Electron + node 모듈만으로 외부 설치 없이 즉시 실행 가능  
- 실제 입력값 기반 시각화로 UX 향상 및 실습 보조 효과 확인  
- 다양한 스킨/효과 지원으로 교육·데모 등 다목적 사용 가능

---

## 주요 구조 요약 (간단 코드)

```js
// Electron 메인 프로세스
const keyboardListener = new GlobalKeyboardListener();

keyboardListener.addListener((event) => {
	// 키 상태 전달
	win.webContents.send('key-event', event.rawKey);
});
// 렌더러 (HTML + JS)
ipcRenderer.on('key-event', (event, key) => {
	// 눌린 키 DOM 업데이트
	if (key.name === 'CapsLock') setCase('upper');
});

```
```js
// package.json
{
	"scripts": {
		"start": "electron .",
		"build": "electron-packager . uniKey ..."
	}
}

```
