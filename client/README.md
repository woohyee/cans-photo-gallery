# 깡통의 사진 갤러리

친구의 여행 사진을 체계적으로 보관하고 공유할 수 있는 개인 갤러리 사이트입니다.

## 🚀 Vercel 배포 방법

1. **GitHub에 코드 업로드**
2. **Vercel 계정 생성** (https://vercel.com)
3. **New Project** → GitHub 연결
4. **Build Settings**:
   - Framework Preset: `Vite`
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `dist`

## 📱 주요 기능

- **메인 슬라이드**: 선별된 대표 사진들의 전체화면 슬라이드
- **일자별 갤러리**: 날짜별로 정리된 사진 컬렉션
- **주제별/장소별 필터링**: 태그 기반 다차원 검색
- **관리자 모드**: 사진 즉석 삭제 기능 (패스워드: canphoto2024)
- **반응형 디자인**: 모바일 최적화

## 🔧 관리자 기능

- **인증**: Ctrl + Alt + A 또는 관리자 모드 버튼
- **사진 삭제**: 관리자 모드에서 🗑️ 버튼 또는 Delete 키
- **업로드**: 드래그&드롭으로 새 사진 업로드

## 📸 사진 구조

```
public/images/
├── logo/logo.png
├── images/
│   ├── slides/          # 메인 슬라이드용
│   └── archive/         # 일자별 아카이브
│       ├── 7월27일/
│       ├── 7월13일/
│       └── ...
```

## 🎨 기술 스택

- React 19 + Vite
- 반응형 CSS (모바일 우선)
- Noto Sans KR 폰트
- 태그 기반 필터링 시스템