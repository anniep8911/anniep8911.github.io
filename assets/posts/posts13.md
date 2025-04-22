## 설계 방향

**반복적인 쇼츠 영상 제작 과정을 자동화하여, 시간과 리소스를 절약하고  
프롬프트 명령만으로 원하는 스타일의 콘텐츠를 효율적으로 제작하는 것을 목표로 했습니다.  
기획자가 직접 코드를 작성하지 않고도, 결과물을 도출할 수 있도록 구성했습니다.**

---

## 작업환경

- 🐍 Language: Python 3.10+
- 📦 Library: `moviepy`, `pandas`, `gtts`, `os`, `random`
- 🧰 툴: VS Code, Terminal, Prompting Tool
- 🎞 영상 포맷: MP4 (1080x1920, 9:16 비율)
- 📁 데이터 소스: CSV 파일

---

## 작업 일정

- 📅 기간: 2024.12 (약 1주)
- 👩‍💻 역할: 전체 로직 설계 및 GPT 기반 자동화
- ✅ 성과: 20초 이내 유튜브 쇼츠 10건 이상 자동 생성 성공

---

## 프롬프트 기반 자동화 제작

**아래와 같은 명령을 GPT에게 단계별로 입력하여 프로그램을 생성하였습니다.**

## 1. 전체 구조 요청

```text
csv파일에서 텍스트 데이터를 불러와,
moviepy로 쇼츠형 비디오(9:16 비율)를 자동 생성하는 코드를 만들어줘.
```
결과: csv 구조 설계 및 VideoFileClip, TextClip 등 기본 구조 생성

## 2. 텍스트 애니메이션 요청
```txt
텍스트가 한 글자씩 순차적으로 나타나는 애니메이션 형태로 보여지게 해줘.
```
결과: create_text_animation() 함수 생성
각 텍스트를 char_interval 기준으로 나눠 TextClip 배열 생성
```js
def create_text_animation(text, position, start_time, total_duration, text_style):
    animation_duration = total_duration - 2
    char_interval = animation_duration / len(text)
    ...
```

## 3. 초반 라벨 추가 요청
```text
초반에 “Round1”, “키워드 예상 질문!” 같은 강조 라벨을 중앙 상단에 보여줘.
레트로 스타일 폰트와 확대 효과도 적용해줘.
```
결과: create_round_label() 함수 생성, 랜덤 효과 적용
```js
def create_round_label(round_text, subtitle_text, position, start_time, duration, text_style, subtitle_style):
    ...
    round_clip = random.choice(effects)(round_clip)

```

## 4. 전체 영상 합성 요청
```text
배경 영상 + 라벨 + 질문 텍스트 + 정답 텍스트를 순서대로 합성해서
최종 쇼츠 mp4로 export되게 해줘.
```

결과: CompositeVideoClip으로 병합 → write_videofile 저장까지 자동화