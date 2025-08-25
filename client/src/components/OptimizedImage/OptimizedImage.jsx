import React, { useState, useRef, useEffect } from 'react';

const OptimizedImage = ({ 
  src, 
  alt, 
  style = {}, 
  className = '',
  loading = 'lazy',
  onClick,
  onLoad,
  placeholder = true
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  // Intersection Observer로 뷰포트 진입 감지
  useEffect(() => {
    if (loading === 'lazy' && imgRef.current) {
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observerRef.current?.disconnect();
          }
        },
        {
          rootMargin: '50px', // 50px 전에 미리 로딩 시작
        }
      );

      observerRef.current.observe(imgRef.current);

      return () => {
        observerRef.current?.disconnect();
      };
    } else {
      setIsInView(true);
    }
  }, [loading]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
  };

  const containerStyle = {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#f3f4f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...style,
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'opacity 0.3s ease',
    opacity: isLoaded ? 1 : 0,
  };

  const placeholderStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#e5e7eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 0.3s ease',
    opacity: isLoaded ? 0 : 1,
  };

  const loadingSpinnerStyle = {
    width: '24px',
    height: '24px',
    border: '2px solid #d1d5db',
    borderTop: '2px solid #3b82f6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  };

  // CSS 애니메이션을 위한 스타일 태그 추가
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div ref={imgRef} style={containerStyle} className={className} onClick={onClick}>
      {/* 실제 이미지 */}
      {(isInView || loading === 'eager') && !hasError && (
        <img
          src={src}
          alt={alt}
          style={imageStyle}
          onLoad={handleLoad}
          onError={handleError}
          loading={loading}
        />
      )}

      {/* 플레이스홀더 */}
      {placeholder && !isLoaded && !hasError && (
        <div style={placeholderStyle}>
          <div style={loadingSpinnerStyle}></div>
        </div>
      )}

      {/* 에러 상태 */}
      {hasError && (
        <div style={{
          ...placeholderStyle,
          backgroundColor: '#fef2f2',
          color: '#dc2626',
          fontSize: '14px',
          flexDirection: 'column',
          gap: '8px',
        }}>
          <div>📷</div>
          <div>이미지를 불러올 수 없습니다</div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;