# 🔮 포춘 바이브 (Fortune Vibe)

신비로운 AI 오라클이 당신의 운명을 읽어주는 웹 애플리케이션입니다.

## ✨ 주요 기능

- 🤖 **Gemini AI 기반 운세**: Google Gemini API를 활용한 신비로운 운세 제공
- 🎨 **신비로운 디자인**: 어두운 보라색 배경과 금색 포인트로 마법사의 서재 같은 분위기
- ✍️ **마크다운 지원**: AI 답변의 볼드체, 리스트, 개행이 예쁘게 표시
- ⌨️ **타이핑 효과**: 운세 답변이 한 글자씩 타이핑되는 신비로운 효과
- 🌌 **3D 배경 애니메이션**: Three.js로 구현된 은하수와 운명의 수레바퀴 회전 애니메이션
- 📜 **공유 기능**: 운명의 기록을 클립보드에 복사할 수 있는 기능

## 🚀 시작하기

### 필수 요구사항

- Node.js 18 이상
- npm 또는 yarn

### 설치 및 실행

1. 저장소 클론
```bash
git clone git@github.com:seochan99/fortune-vibe.git
cd fortune-vibe
```

2. 의존성 설치
```bash
npm install
```

3. 환경 변수 설정
```bash
cp .env.example .env
```

`.env` 파일을 열고 Gemini API 키를 입력하세요:
```
VITE_GEMINI_API_KEY=your-api-key-here
```

Gemini API 키는 [Google AI Studio](https://aistudio.google.com/)에서 발급받을 수 있습니다.

4. 개발 서버 실행
```bash
npm run dev
```

5. 빌드
```bash
npm run build
```

## 📁 프로젝트 구조

이 프로젝트는 **Feature-Sliced Design (FSD)** 아키텍처를 따릅니다.

```
src/
├── features/          # 기능 단위
│   ├── Fortune_Result/   # 운세 결과 표시
│   └── User_Input/       # 사용자 입력
├── shared/           # 공유 리소스
│   ├── UI/              # 공통 UI 컴포넌트
│   ├── API/             # API 클라이언트
│   └── Lib/              # 유틸리티 및 훅
└── pages/            # 페이지
    └── Home/             # 홈 페이지
```

## 🛠️ 기술 스택

- **React 19** - UI 라이브러리
- **Vite** - 빌드 도구
- **Three.js** - 3D 배경 애니메이션
- **React Three Fiber** - React용 Three.js 래퍼
- **Lottie React** - 로딩 애니메이션
- **React Markdown** - 마크다운 렌더링
- **Google Gemini API** - AI 운세 생성

## 📝 라이선스

이 프로젝트는 개인 프로젝트입니다.
