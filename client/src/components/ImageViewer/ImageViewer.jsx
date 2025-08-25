import React, { useState, useEffect, useRef } from 'react';
import OptimizedImage from '../OptimizedImage/OptimizedImage';

const ImageViewer = ({ 
  images, 
  currentIndex, 
  onClose, 
  onIndexChange,
  title = '',
  isDarkMode = false 
}) => {
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const containerRef = useRef(null);
  const imageRefs = useRef([]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 키보드 이벤트 처리
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        onIndexChange(currentIndex - 1);
      } else if (e.key === 'ArrowRight' && currentIndex < images.length - 1) {
        onIndexChange(currentIndex + 1);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, images.length, onIndexChange, onClose]);

  // 터치/마우스 시작
  const handleStart = (clientX) => {
    setStartX(clientX);
    setIsDragging(true);
    setDragOffset(0);
  };

  // 터치/마우스 이동
  const handleMove = (clientX) => {
    if (!isDragging) return;
    
    const diff = clientX - startX;
    const maxOffset = windowWidth * 0.8; // 최대 드래그 거리 제한
    const clampedOffset = Math.max(-maxOffset, Math.min(maxOffset, diff));
    setDragOffset(clampedOffset);
  };

  // 터치/마우스 종료
  const handleEnd = () => {
    if (!isDragging) return;
    
    const threshold = windowWidth * 0.2; // 20% 이상 드래그시 페이지 변경
    
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0 && currentIndex > 0) {
        // 오른쪽으로 드래그 - 이전 이미지
        onIndexChange(currentIndex - 1);
      } else if (dragOffset < 0 && currentIndex < images.length - 1) {
        // 왼쪽으로 드래그 - 다음 이미지
        onIndexChange(currentIndex + 1);
      }
    }
    
    setIsDragging(false);
    setDragOffset(0);
    setStartX(0);
  };

  // 터치 이벤트
  const handleTouchStart = (e) => {
    e.preventDefault();
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    handleEnd();
  };

  // 마우스 이벤트
  const handleMouseDown = (e) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  const handleMouseMove = (e) => {
    e.preventDefault();
    handleMove(e.clientX);
  };

  const handleMouseUp = (e) => {
    e.preventDefault();
    handleEnd();
  };

  // 마우스 이벤트 리스너 등록/해제
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, startX]);

  // 썸네일 클릭 핸들러
  const handleThumbnailClick = (index) => {
    onIndexChange(index);
  };

  // 이미지 로딩 최적화를 위한 preload
  useEffect(() => {
    const preloadImages = () => {
      const preloadRange = 2; // 현재 이미지 앞뒤 2개씩 미리 로드
      const startIdx = Math.max(0, currentIndex - preloadRange);
      const endIdx = Math.min(images.length - 1, currentIndex + preloadRange);
      
      for (let i = startIdx; i <= endIdx; i++) {
        if (i !== currentIndex) {
          const img = new Image();
          img.src = `/images/images/archive/${images[i]}`;
        }
      }
    };

    preloadImages();
  }, [currentIndex, images]);

  const containerStyle = {
    position: 'fixed',
    top: '80px',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.98)',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    userSelect: 'none',
  };

  const headerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: windowWidth <= 480 ? '12px' : '20px',
    background: 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, transparent 100%)',
    zIndex: 1002,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const imageContainerStyle = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
    cursor: isDragging ? 'grabbing' : 'grab',
  };

  const imageStyle = {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
    transform: `translateX(${dragOffset}px)`,
    transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    pointerEvents: 'none',
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

      {/* 메인 이미지 */}
      <div 
        ref={containerRef}
        style={imageContainerStyle}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
      >
        <img
          ref={el => imageRefs.current[currentIndex] = el}
          src={`/images/images/archive/${images[currentIndex]}`}
          alt={`Image ${currentIndex + 1}`}
          style={imageStyle}
          loading="eager"
        />
      </div>

      {/* 썸네일 네비게이션 */}
      <div style={thumbnailContainerStyle}>
        {images.map((image, index) => (
          <img
            key={index}
            src={`/images/images/archive/${image}`}
            alt={`Thumbnail ${index + 1}`}
            style={thumbnailStyle(index)}
            onClick={() => handleThumbnailClick(index)}
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