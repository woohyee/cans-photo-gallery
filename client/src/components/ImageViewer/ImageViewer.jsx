import React, { useState, useEffect, useRef, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import '../../styles/gallery.css';

const ImageViewer = ({ 
  images, 
  currentIndex, 
  onClose, 
  onIndexChange,
  title = '',
  folder = '' // 폴더 경로 추가
}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const imageRefs = useRef([]);
  const thumbnailContainerRef = useRef(null);
  const thumbnailRefs = useRef([]);

  // Embla Carousel 설정 - CSS Scroll Snap 스타일의 부드러운 전환
  const options = {
    loop: false,
    dragFree: false,           // 스냅 유지 (scroll-snap-stop: always 효과)
    slidesToScroll: 1,         // 한 번에 1장만
    containScroll: 'trimSnaps',
    watchDrag: true,           // 드래그 감지 활성화
    inViewThreshold: 0.6,      // 60% 이상 들어와야 페이지 전환
    skipSnaps: false,          // 빠르게 넘겨도 한 장씩 스냅
    speed: 6,                  // 매우 부드러운 추적
    startIndex: currentIndex,
    align: 'center',           // scroll-snap-align: center 효과
    duration: 30,              // scroll-behavior: smooth 효과
    dragThreshold: 8,          // 적당한 드래그 감지
    // CSS Scroll Snap 스타일의 부드러운 물리 효과
    friction: 0.2,             // 낮은 마찰력으로 부드러운 감속
    resistance: 0.15,          // 경계에서 부드러운 저항
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  // 썸네일을 중앙으로 스크롤하는 함수 (부드러운 추적)
  const scrollThumbnailToCenter = useCallback((index, immediate = false) => {
    if (!thumbnailContainerRef.current || !thumbnailRefs.current[index]) return;
    
    const container = thumbnailContainerRef.current;
    const thumbnail = thumbnailRefs.current[index];
    
    const containerWidth = container.offsetWidth;
    const thumbnailLeft = thumbnail.offsetLeft;
    const thumbnailWidth = thumbnail.offsetWidth;
    
    // 썸네일을 컨테이너 중앙에 위치시키기 위한 스크롤 위치 계산
    const scrollLeft = thumbnailLeft - (containerWidth / 2) + (thumbnailWidth / 2);
    
    if (immediate) {
      container.scrollLeft = scrollLeft;
    } else {
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  }, []);

  // Embla 슬라이드 변경 이벤트
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const selectedIndex = emblaApi.selectedScrollSnap();
    if (selectedIndex !== currentIndex) {
      onIndexChange(selectedIndex);
      // 썸네일도 함께 중앙으로 스크롤
      scrollThumbnailToCenter(selectedIndex);
    }
  }, [emblaApi, currentIndex, onIndexChange, scrollThumbnailToCenter]);

  // 드래그 상태 추적
  const [isDragging, setIsDragging] = useState(false);
  const [isSettling, setIsSettling] = useState(false);

  // Embla API 초기화 및 이벤트 등록
  useEffect(() => {
    if (!emblaApi) return;
    
    const onPointerDown = () => {
      setIsDragging(true);
      setIsSettling(false);
    };
    
    const onPointerUp = () => {
      setIsDragging(false);
      setIsSettling(true);
      // 부드러운 정착을 위한 딜레이
      setTimeout(() => setIsSettling(false), 400);
    };
    
    // 드래그 중 실시간 업데이트를 위한 이벤트 (throttled)
    let scrollTimeout;
    const onScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const selectedIndex = emblaApi.selectedScrollSnap();
        if (selectedIndex !== currentIndex) {
          scrollThumbnailToCenter(selectedIndex, isDragging);
        }
      }, 16); // 60fps로 제한
    };
    
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('pointerDown', onPointerDown);
    emblaApi.on('pointerUp', onPointerUp);
    emblaApi.on('scroll', onScroll); // 스크롤 중 실시간 동기화
    
    // 초기 로딩시 썸네일을 현재 인덱스로 스크롤
    setTimeout(() => {
      scrollThumbnailToCenter(currentIndex);
    }, 100);
    
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
      emblaApi.off('pointerDown', onPointerDown);
      emblaApi.off('pointerUp', onPointerUp);
      emblaApi.off('scroll', onScroll);
    };
  }, [emblaApi, onSelect, currentIndex, scrollThumbnailToCenter]);

  // 외부에서 currentIndex가 변경될 때 Embla 및 썸네일 동기화
  useEffect(() => {
    if (emblaApi && emblaApi.selectedScrollSnap() !== currentIndex) {
      emblaApi.scrollTo(currentIndex, false); // 즉시 이동 (애니메이션 없음)
      scrollThumbnailToCenter(currentIndex); // 썸네일도 동기화
    }
  }, [emblaApi, currentIndex, scrollThumbnailToCenter]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 키보드 이벤트 처리 (Embla와 연동)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!emblaApi) return;
      
      if (e.key === 'ArrowLeft') {
        emblaApi.scrollPrev();
      } else if (e.key === 'ArrowRight') {
        emblaApi.scrollNext();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [emblaApi, onClose]);

  // 썸네일 클릭 핸들러 (Embla와 연동)
  const handleThumbnailClick = useCallback((index, event) => {
    event.stopPropagation(); // 이벤트 전파 방지
    if (emblaApi) {
      emblaApi.scrollTo(index);
    }
  }, [emblaApi]);

  // 이미지 로딩 최적화를 위한 preload
  useEffect(() => {
    const preloadImages = () => {
      const preloadRange = 2; // 현재 이미지 앞뒤 2개씩 미리 로드
      const startIdx = Math.max(0, currentIndex - preloadRange);
      const endIdx = Math.min(images.length - 1, currentIndex + preloadRange);
      
      for (let i = startIdx; i <= endIdx; i++) {
        if (i !== currentIndex) {
          const img = new Image();
          img.src = `/images/images/archive/${folder}/${images[i]}`;
        }
      }
    };

    preloadImages();
  }, [currentIndex, images]);

  const containerStyle = {
    position: 'fixed',
    top: '80px', // 네비게이션 바 아래에 위치
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.98)',
    zIndex: 1000, // 네비게이션 바보다 낮게
    display: 'flex',
    flexDirection: 'column',
    userSelect: 'none',
  };

  const headerStyle = {
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    padding: windowWidth <= 480 ? '12px' : '20px',
    background: 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, transparent 100%)',
    zIndex: 1001,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '60px', // 고정 높이
    flexShrink: 0, // 축소되지 않도록
  };

  const emblaContainerStyle = {
    flex: 1,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: '120px', // 썸네일 공간 확보
  };

  const emblaViewportStyle = {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    touchAction: 'pan-x',      // 수평 제스처 의도 명시 (CSS Scroll Snap 스타일)
    cursor: isDragging ? 'grabbing' : 'grab',
    overscrollBehaviorX: 'contain', // iOS/안드로이드 수평 오버스크롤 차단
    WebkitOverflowScrolling: 'touch', // iOS 관성 스크롤
    // CSS scroll-behavior: smooth 효과를 모방한 부드러운 전환
    transition: isDragging ? 'none' : 'transform 0.35s cubic-bezier(0.25, 0.1, 0.25, 1)',
  };

  const emblaSlideStyle = {
    flex: '0 0 100%',          // CSS Scroll Snap의 flex 설정과 동일
    minWidth: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: windowWidth <= 480 ? '10px' : '20px',
    // CSS scroll-snap-align: center 효과를 모방
    scrollSnapAlign: 'center',
    scrollSnapStop: 'always',   // 빠르게 넘겨도 한 장에 스냅
  };

  const imageStyle = {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
    borderRadius: '12px',
    // CSS Scroll Snap 스타일의 사용자 상호작용 방지
    userSelect: 'none',
    WebkitUserDrag: 'none',
    // 하드웨어 가속 및 부드러운 렌더링
    willChange: 'transform',
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden',
  };

  const thumbnailContainerStyle = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100px',
    padding: '20px',
    background: 'rgba(0,0,0,0.9)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    overflowX: 'auto',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    zIndex: 1002,
    borderTop: '1px solid rgba(255,255,255,0.1)',
  };

  const thumbnailStyle = (index) => ({
    width: '60px',
    height: '60px',
    objectFit: 'cover',
    borderRadius: '8px',
    cursor: 'pointer',
    border: index === currentIndex ? '3px solid #3b82f6' : '3px solid transparent',
    opacity: index === currentIndex ? 1 : 0.7,
    transition: 'all 0.2s ease',
    flexShrink: 0,
  });

  const closeButtonStyle = {
    backgroundColor: 'rgba(255,255,255,0.2)',
    border: 'none',
    color: 'white',
    fontSize: windowWidth <= 480 ? '18px' : '24px',
    cursor: 'pointer',
    borderRadius: '8px',
    width: windowWidth <= 480 ? '32px' : '40px',
    height: windowWidth <= 480 ? '32px' : '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s ease',
  };

  return (
    <div style={containerStyle} onClick={onClose}>
      {/* 헤더 */}
      <div style={headerStyle}>
        <div style={{ 
          color: 'white', 
          fontSize: windowWidth <= 480 ? '14px' : '18px', 
          fontWeight: '500' 
        }}>
          {title} ({currentIndex + 1}/{images.length})
        </div>
        
        <button
          onClick={onClose}
          style={closeButtonStyle}
          onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.3)'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
        >
          ✕
        </button>
      </div>

      {/* 메인 이미지 - Embla Carousel */}
      <div style={emblaContainerStyle} onClick={(e) => e.stopPropagation()}>
        <div ref={emblaRef} style={emblaViewportStyle}>
          <div style={{ display: 'flex', height: '100%' }}>
            {images.map((image, index) => (
              <div key={index} style={emblaSlideStyle}>
                <img
                  ref={el => imageRefs.current[index] = el}
                  src={`/images/images/archive/${folder}/${image}`}
                  alt={`Image ${index + 1}`}
                  style={imageStyle}
                  loading={Math.abs(index - currentIndex) <= 1 ? "eager" : "lazy"}
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 썸네일 네비게이션 */}
      <div 
        ref={thumbnailContainerRef}
        style={thumbnailContainerStyle}
        onClick={(e) => e.stopPropagation()} // 컨테이너 클릭 이벤트 전파 방지
      >
        {images.map((image, index) => (
          <img
            key={index}
            ref={el => thumbnailRefs.current[index] = el}
            src={`/images/images/archive/${folder}/${image}`}
            alt={`Thumbnail ${index + 1}`}
            style={thumbnailStyle(index)}
            onClick={(e) => handleThumbnailClick(index, e)}
            onMouseEnter={(e) => {
              if (index !== currentIndex) {
                e.target.style.opacity = '0.9';
              }
            }}
            onMouseLeave={(e) => {
              if (index !== currentIndex) {
                e.target.style.opacity = '0.7';
              }
            }}
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageViewer;