## Firebase 기반 포트폴리오 방문자 및 인기 콘텐츠 트래킹 시스템

정적 GitHub Page 기반 포트폴리오에  
**Firebase Firestore + JavaScript**만으로  
실시간 방문자 수 추적 및 인기 프로젝트 랭킹 기능 구축

#Firebase #Firestore #VanillaJS #실시간업데이트 #데이터분석 #퍼포먼스트래킹

---

### 설계 방향

**정적 HTML 기반 GitHub Pages 포트폴리오에 Firebase를 연결하여,  
실시간 방문자 수 및 인기 콘텐츠 클릭 수를 추적하고 시각화하는 구조를 설계했습니다.  
카운트 증가, 실시간 랭킹 반영, 하루 1회 카운트 제한 등  
작은 트래픽 환경에 최적화된 로직을 적용했습니다.**

---

### 작업환경

- 🖥 Frontend: HTML5, JavaScript (ES6)
- 🗂 데이터베이스: Firebase Firestore
- 🔐 보안: Firestore Rules, LocalStorage 중복방지
- 📊 실시간: onSnapshot() 기반 실시간 반영
- 🧰 도구: GitHub Pages, Vite, Figma
- 🌐 구조: 정적 SPA 기반 / CDN + Firebase 연결

---

### 작업 일정

- 📅 기간: 2025.04 (약 1주)
- 👤 역할: 개인 프로젝트 100% 단독 진행
- ✅ 성과: 실시간 방문자 수 집계 및 클릭 기반 랭킹 UI 적용 완료

---

### 문제점

- 정적 HTML 구조에서 API 키 노출 위험
- 하루 중복 카운트 발생 가능성
- 실시간 업데이트 시 DOM이 늦게 준비되어 이벤트 누락
- Firestore의 실시간 동기화 타이밍 문제

---

### 해결방안

- **Firebase 설정 정보 Base64 인코딩 후 노출 최소화**
  → 외부에서는 구조만 보이고 직접 파싱 없이는 사용 불가

- **LocalStorage 기반 방문자 중복 제어**
  → 날짜 키(`visited-YYYY-MM-DD`)로 하루 1회만 카운트 허용

- **onSnapshot() + 이벤트 위임 방식 도입**
  → 실시간 추가된 DOM에도 이벤트 정상 적용

- **Ranking은 onSnapshot으로 전환하여 실시간 반영**
  → 인기 프로젝트 클릭 랭킹이 자동으로 DOM에 반영되도록 개선

---

### 주요 구조 요약 (간단 코드)

```js
// 방문자 카운트 (중복 방지)
const todayKey = new Date().toISOString().slice(0, 10);
const visitKey = `visited-${todayKey}`;
if (!localStorage.getItem(visitKey)) {
  localStorage.setItem(visitKey, 'true');
  db.collection('stats').doc('visits').update({
    total: firebase.firestore.FieldValue.increment(1),
    today: firebase.firestore.FieldValue.increment(1)
  });
}

// 실시간 인기 랭킹 UI 렌더
db.collection("projects")
  .orderBy("clicks", "desc")
  .limit(5)
  .onSnapshot(snapshot => {
    snapshot.forEach(doc => {
      // DOM 업데이트 처리
    });
  });
```

---

### Firestore 보안 설계 (AI Prompt 기반 해결)

정적 웹사이트에 Firebase를 연동하면서,  
기본 제공되는 테스트 보안 규칙(`request.time < 30일 제한`)이  
모든 데이터에 대해 쓰기 허용 상태라는 것을 확인했습니다.  
보안상 심각한 리스크가 있음을 인지하고,  
OpenAI 프롬프트 기반으로 Firestore Rules 개선 방안을 도출했습니다.

#### 💬 사용한 프롬프트 예시:

> 지금 이 규칙은 request.time < 30일 제한만 걸린 상태인데,  
> stats 컬렉션이랑 projects 컬렉션만 쓰기를 허용하고  
> 나머지는 전부 차단하려면 어떻게 바꿔야 돼?

#### 🔐 GPT를 통해 도출된 Firestore 규칙 개선안:

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

    // 그 외 모든 문서는 차단
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```