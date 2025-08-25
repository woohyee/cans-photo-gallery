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

  // Embla Carousel 설정 - 손가락 추적 + 다중 스킵 방지
  const options = {
    loop: false,
    dragFree: false,           // 스냅 유지 (여러 장 건너뜀 방지)
    slidesToScroll: 1,         // 한 번에 1장만
    containScroll: 'trimSnaps',
    watchDrag: true,           // 드래그 감지 활성화
    inViewThreshold: 0.7,      // 70% 이상 들어와야 페이지 전환
    skipSnaps: false,
    speed: 10,                 // 부드러운 추적을 위한 낮은 속도
    startIndex: currentIndex,
    align: 'center',
    duration: 25,              // 스냅 전환 속도
    dragThreshold: 10,         // 민감한 드래그 감지
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

  // Embla API 초기화 및 이벤트 등록
  useEffect(() => {
    if (!emblaApi) return;
    
    const onPointerDown = () => setIsDragging(true);
    const onPointerUp = () => setIsDragging(false);
    
    // 드래그 중 실시간 업데이트를 위한 이벤트
    const onScroll = () => {
      // 드래그 중에도 썸네일 동기화 (부드러운 추적)
      const selectedIndex = emblaApi.selectedScrollSnap();
      if (selectedIndex !== currentIndex) {
        scrollThumbnailToCenter(selectedIndex);
      }
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
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.98)',
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    userSelect: 'none',
  };

  const headerStyle = {
    position: 'absolute',
    top: '80px',
    left: 0,
    right: 0,
    padding: windowWidth <= 480 ? '12px' : '20px',
    background: 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, transparent 100%)',
    zIndex: 10001,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const emblaContainerStyle = {
    flex: 1,
    overflow: 'hidden',
    marginTop: '120px', // 네비게이션 바와 헤더 공간 확보
    position: 'relative',
  };

  const emblaViewportStyle = {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    touchAction: 'pan-y',
    cursor: isDragging ? 'grabbing' : 'grab',
    overscrollBehaviorX: 'contain', // iOS/안드로이드 수평 오버스크롤 차단
    WebkitOverflowScrolling: 'touch', // iOS 부드러운 스크롤
  };

  const emblaSlideStyle = {
    flex: '0 0 100%',
    minWidth: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: windowWidth <= 480 ? '10px' : '20px',
  };

  const imageStyle = {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
    borderRadius: '12px',
    willChange: 'transform',
    transform: 'translateZ(0)',
  };

  const thumbnailContainerStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '20px',
    background: 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, transparent 100%)',
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    overflowX: 'auto',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
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