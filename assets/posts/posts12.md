## 결과
  [👉Storybook 확인 하기](https://anniep8911.github.io/tvcEvent/?path=/docs/%EC%8A%A4%ED%86%A0%EB%A6%AC%EB%B6%81-%EC%84%A4%EB%AA%85--docs)
<div class="imgWrap" data-share="2">
  
  
  <img src="/assets/image/tvc01.png">
  
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
- 🧰 Tool: GitHub, VS Code, Storybook 8.6.4
- 🌐 환경: 반응형 웹 / 크로스브라우징

---

## 작업 일정

- 📅 기간: 2024.01 (약 1주)
- 👩‍💻 역할: 전체 퍼블리싱 · Vue 구조 설계 · 모듈화
- ✅ 성과: 프로모션 이벤트 페이지 컴포넌트 템플릿화

---

## 문제점

- 매 이벤트마다 동일한 구조의 페이지를 매번 새로 마크업해야 했음  
- 당첨자 목록, Toast, Button 등 반복 UI 요소가 컴포넌트화되지 않아 재사용 어려움  
- 페이지마다 초기 설정(환경변수, 라우터 등)을 반복적으로 구성해야 했음

---

## 해결방안

- **반복되는 레이아웃 및 마크업 구조를 템플릿화**  
  → 공통 레이아웃과 섹션 구조를 기준으로 재사용 가능한 기본 구조를 설계
- **Toast, Button, 당첨자 목록 등의 컴포넌트를 개별 모듈로 분리**  
  → 공용 UI 요소를 컴포넌트 단위로 제작하고 Storybook으로 문서화
- **프로젝트 초기 설정 작업을 유틸 함수로 정리**  
  → 이벤트 공통 설정값 및 초기 처리 로직을 `useFn` 등으로 분리하여 반복 작업 최소화


---

## 주요 구조 요약 (간단 코드)
```vue
<template>
  <article :class="[{ light }, artType]">
    <Typography name="ArticleTitleBold">
      <Icons :iconName="icon" size="medium" />
      <template v-if="artType === 'pay'">
        <span class="name"><span class="inner">{{ name }}</span> 님</span>
        <span class="msg">네이버페이 1만원 당첨!</span>
      </template>
      <template v-else>
        <span class="msg">{{ rank }}번째 100만원 원픽,</span>
        <span class="name">{{ name }}님</span>
      </template>
    </Typography>
    <span v-if="time" class="time">{{ time }} 전</span>
  </article>
</template>

<script setup lang="ts">
const props = defineProps<{
  icon: string,
  name: string,
  time?: string,
  light?: boolean,
  rank: number,
  artType: string
}>();
</script>

// Article 컴포넌트 사용 예시
<Article
  :name="'김*영'"
  :icon="'cash'"
  :artType="'money'"
  :rank="1"
  :light="true"
/>

// 라우터 기본 구성
const routes = [
  { path: '/', component: MainPage },
  { path: '/event', component: EventPage }
];
```
