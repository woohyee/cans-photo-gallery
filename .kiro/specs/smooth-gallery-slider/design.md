# 부드러운 갤러리 슬라이더 설계 문서

## 개요

현재 ImageViewer 컴포넌트를 Embla Carousel 기반의 고성능 갤러리 슬라이더로 교체하여, 모바일 네이티브 갤러리와 같은 부드러운 사용자 경험을 제공합니다.

## 아키텍처

### 컴포넌트 구조
```
components/
├── Gallery/
│   ├── Gallery.jsx              # 메인 갤러리 컨테이너
│   ├── GallerySlider.jsx        # Embla 기반 슬라이더
│   ├── GallerySlide.jsx         # 개별 슬라이드 컴포넌트
│   ├── GalleryThumbnails.jsx    # 썸네일 네비게이션
│   └── GalleryControls.jsx      # 컨트롤 버튼들
├── hooks/
│   ├── useEmblaCarousel.js      # Embla 설정 및 제어
│   └── useGalleryKeyboard.js    # 키보드 이벤트 처리
└── styles/
    └── gallery.css              # 성능 최적화 CSS
```

### 라이브러리 선택: Embla Carousel

**선택 이유:**
- **dragFree 모드**: 손가락 움직임을 즉시 추적
- **경량**: 번들 크기 최소화 (gzipped ~3KB)
- **성능**: 네이티브 스크롤 동작 활용
- **접근성**: 키보드 및 스크린 리더 지원
- **커스터마이징**: 높은 자유도

**대안 비교:**
- Swiper: 무겁고 복잡함 (~40KB)
- Keen Slider: 좋지만 Embla보다 커뮤니티 작음
- 자체 구현: 접근성 및 크로스 브라우저 이슈

## 컴포넌트 및 인터페이스

### 1. Gallery 컴포넌트 (메인 컨테이너)

```jsx
const Gallery = ({
  images,           // 이미지 배열
  initialIndex,     // 초기 인덱스
  folder,          // 이미지 폴더 경로
  title,           // 갤러리 제목
  onClose,         // 닫기 콜백
  isDarkMode       // 다크모드 여부
}) => {
  // 갤러리 상태 관리
  // 키보드 이벤트 처리
  // 전체화면 모달 렌더링
}
```

### 2. GallerySlider 컴포넌트 (Embla 슬라이더)

```jsx
const GallerySlider = ({
  images,
  folder,
  currentIndex,
  onSlideChange,
  emblaRef
}) => {
  // Embla 초기화 및 설정
  // 드래그 이벤트 처리
  // 슬라이드 렌더링
}
```

**Embla 설정:**
```javascript
const options = {
  dragFree: true,           // 자유로운 드래그
  containScroll: 'trimSnaps', // 끝에서 스냅 제한
  skipSnaps: false,         // 스냅 활성화
  inViewThreshold: 0.7,     // 뷰포트 임계값
  loop: false,              // 무한 루프 비활성화
  align: 'center',          // 중앙 정렬
  slidesToScroll: 1         // 한 번에 하나씩
}
```

### 3. GallerySlide 컴포넌트 (개별 슬라이드)

```jsx
const GallerySlide = ({
  src,
  alt,
  isActive,
  loading = 'lazy'
}) => {
  // 이미지 로딩 최적화
  // 활성 슬라이드 스타일링
  // 에러 처리
}
```

### 4. GalleryThumbnails 컴포넌트 (썸네일 네비게이션)

```jsx
const GalleryThumbnails = ({
  images,
  folder,
  currentIndex,
  onThumbnailClick
}) => {
  // 썸네일 렌더링
  // 현재 이미지 하이라이트
  // 클릭 이벤트 처리
}
```

## 데이터 모델

### 이미지 데이터 구조
```javascript
{
  images: [
    'image1.jpg',
    'image2.jpg',
    // ...
  ],
  folder: '250727',
  title: '7월 마지막 주말 나들이',
  currentIndex: 0,
  totalCount: 15
}
```

### 갤러리 상태
```javascript
{
  isOpen: boolean,
  currentIndex: number,
  isLoading: boolean,
  isDragging: boolean,
  emblaApi: EmblaCarouselType | null
}
```

## 에러 처리

### 이미지 로딩 에러
- 로딩 실패시 플레이스홀더 표시
- 재시도 메커니즘 구현
- 사용자에게 친화적인 에러 메시지

### 네트워크 에러
- 오프라인 상태 감지
- 캐시된 이미지 우선 표시
- 연결 복구시 자동 재로딩

### 브라우저 호환성 에러
- Intersection Observer 폴백
- CSS Grid 폴백
- 터치 이벤트 폴백

## 테스팅 전략

### 성능 테스트
- 60fps 유지 확인 (Chrome DevTools)
- 메모리 누수 검사
- 번들 크기 최적화 확인

### 사용성 테스트
- 다양한 기기에서 드래그 테스트
- 키보드 네비게이션 테스트
- 접근성 도구로 스크린 리더 테스트

### 크로스 브라우저 테스트
- iOS Safari, Chrome
- Android Chrome, Samsung Internet
- Desktop Chrome, Firefox, Safari

## 성능 최적화 전략

### CSS 최적화
```css
.gallery-slider {
  will-change: transform;
  transform: translate3d(0, 0, 0);
  touch-action: pan-y;
}

.gallery-slide {
  contain: layout style paint;
  transform: translateZ(0);
}
```

### 이미지 최적화
- 현재 슬라이드: `loading="eager"`, `decoding="async"`
- 인접 슬라이드: `loading="lazy"`
- 원거리 슬라이드: 지연 로딩

### React 최적화
- `React.memo`로 불필요한 리렌더 방지
- `useCallback`으로 함수 메모이제이션
- `useMemo`로 계산 결과 캐싱

## 접근성 고려사항

### ARIA 속성
```jsx
<div
  role="region"
  aria-label="이미지 갤러리"
  aria-live="polite"
>
  <div
    role="img"
    aria-label={`${currentIndex + 1}번째 이미지, 총 ${totalCount}장`}
    tabIndex={0}
  />
</div>
```

### 키보드 네비게이션
- `Arrow Left/Right`: 이미지 변경
- `Escape`: 갤러리 닫기
- `Tab`: 포커스 이동
- `Enter/Space`: 썸네일 선택

### 스크린 리더 지원
- 이미지 변경시 알림
- 로딩 상태 알림
- 에러 상태 알림

## 마이그레이션 계획

### 1단계: 새 컴포넌트 구현
- Embla Carousel 설치 및 설정
- 기본 갤러리 컴포넌트 구현
- 스타일링 및 애니메이션 적용

### 2단계: 기존 코드와 통합
- ImageViewer를 새 Gallery로 교체
- Daily 페이지에서 테스트
- 기존 기능 호환성 확인

### 3단계: 최적화 및 테스트
- 성능 최적화 적용
- 크로스 브라우저 테스트
- 접근성 테스트 및 개선

### 4단계: 배포 및 모니터링
- 점진적 배포
- 사용자 피드백 수집
- 성능 모니터링