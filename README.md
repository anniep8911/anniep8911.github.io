# 실시간 인터랙티브 포트폴리오 시스템

정적 웹 기반의 포트폴리오를 확장하여, **실시간 데이터 트래킹**, **사용자 인터랙션**, **시각적 분석 기능**을 결합한 프로젝트입니다. Firebase, Vanilla JavaScript, Chart.js 등을 활용하여 방문자와의 직접적인 상호작용과 실시간 분석이 가능한 페이지를 구축했습니다.

---

## 📌 프로젝트 개요

- **프로젝트명**: 실시간 인터랙티브 포트폴리오
- **작업 기간**: 2025년 4월 (1주)
- **작업 형태**: 개인 프로젝트
- **목표**:
  - 정적인 GitHub Pages 포트폴리오에 실시간 데이터 기능 추가
  - 사용자 경험 중심의 인터랙션 도입
  - 콘텐츠 클릭 및 방문자 기반 실시간 분석 시스템 구축

---

## 🧰 기술 스택

| 분류 | 기술 |
|------|------|
| **Frontend** | HTML5, CSS3, JavaScript (ES6) |
| **Database** | Firebase Firestore |
| **시각화** | Chart.js, Canvas, Radar Chart |
| **빌드** | Vite |
| **배포** | GitHub Pages |
| **디자인** | Figma |
| **실시간 처리** | `onSnapshot()` |
| **보안** | Firestore Rules, LocalStorage 중복 제어 |

---

## 🧱 주요 구성 요소

### 🔄 1. 실시간 트래킹 시스템
![image](https://github.com/user-attachments/assets/b1ae9de3-7b8f-4e33-9b97-79a903e9671b)
- 방문자 수 및 콘텐츠 클릭 수를 Firebase Firestore에 기록
- 하루 1회 중복 방지를 위해 LocalStorage 키(`visited-YYYY-MM-DD`) 활용
- 클릭 수 기반 인기 콘텐츠 Top 5를 실시간으로 DOM에 반영

```js
const todayKey = new Date().toISOString().slice(0, 10);
const visitKey = `visited-${todayKey}`;
if (!localStorage.getItem(visitKey)) {
  localStorage.setItem(visitKey, 'true');
  db.collection('stats').doc('visits').update({
    total: firebase.firestore.FieldValue.increment(1),
    today: firebase.firestore.FieldValue.increment(1)
  });
}

db.collection("projects")
  .orderBy("clicks", "desc")
  .limit(5)
  .onSnapshot(snapshot => {
    // DOM 업데이트 처리
  });
```


## 📊  차트 기반 데이터 시각화
- Chart.js를 활용해 활동 내역과 프로젝트 데이터를 시각적으로 표현
- Radar Chart를 사용하여 기술 스택 스킬맵 구현
![image](https://github.com/user-attachments/assets/ed3043db-7347-4f36-a5da-d59df0b06b20)


## 🤖 JSON 기반 질문-응답 인터페이스
- 사용자가 직접 질문을 선택하면 JSON 데이터 기반으로 응답 출력
- 고정된 포트폴리오가 아닌, 동적 인터랙션 경험 제공
- 데이터는 직접 작성하여 실제 경험 중심으로 구성
- 인터페이스는 단순한 버튼과 말풍선 UI로 구성되어 직관적인 사용자 흐름 제공

![image](https://github.com/user-attachments/assets/f4c4c582-06a7-4658-b7d7-d289eea40262)


```js
[
  { "question": "관심 있는 기술은 무엇인가요?", "answer": "자바스크립트 프레임워크 및 인터랙션 설계에 관심이 많습니다." },
  { "question": "앞으로 배우고 싶은 기술은?", "answer": "WebAssembly와 Three.js에 관심이 있습니다." }
]
```

## 🎬무빙 인터랙션 (Vanilla JavaScript 기반)
- 외부 플러그인 없이 직접 구현한 인터랙션 애니메이션
- 사용자 마우스/클릭 이벤트에 따라 구성 요소가 움직이고 변화
- 모든 로직은 순수 JavaScript로 작성하여 퍼포먼스와 유지 보수성을 고려

![image](https://github.com/user-attachments/assets/4adb72b3-93c7-49e6-9377-62d9403ec164)


## 🔒 Firestore 보안 설계
```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    match /stats/{doc} {
      allow read: if true;
      allow write: if request.time < timestamp.date(2025, 12, 31);
    }

    match /projects/{doc} {
      allow read: if true;
      allow write: if request.time < timestamp.date(2025, 12, 31);
    }

    match /{document=**} {
      allow read, write: if false;
    }
  }
}

```


⚠️ 문제 해결 사례
|문제 |	해결 | 방법|
|------|------|------|
|정적 구조에서 API 키 노출 위험	| Firebase 설정 정보 Base64 인코딩
|하루 중복 방문 카운트	| LocalStorage 기반 날짜 키로 제어
|실시간 DOM 반영 누락	 | 이벤트 위임 + onSnapshot 조합 사용
|Firestore Sync 타이밍 이슈	| 비동기 처리 구조 정비 및 콜백 우선 처리


## ✅ 구현 성과
- 정적 HTML 기반 포트폴리오에서 실시간 데이터 연동 성공
- 사용자 인터랙션, 시각화, 실시간 통계가 결합된 고도화된 구조 완성
- Firestore 보안 규칙 개선 및 UI 반응성 향상

