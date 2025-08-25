// 📄 src/components/HeroSlide/HeroSlide.jsx
// 전체 화면 슬라이드쇼 컴포넌트
// - 실제 사진 데이터 사용
// - featured 사진들만 표시
// - 자동 슬라이드 기능 포함

import React, { useState, useEffect } from 'react';
import { getFeaturedCollections } from '../../data/photoData';

function HeroSlide() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredCollections, setFeaturedCollections] = useState([]);

  useEffect(() => {
    // featured 컬렉션들 로드
    const collections = getFeaturedCollections();
    setFeaturedCollections(collections);
  }, []);

  // 자동 슬라이드 (3초마다)
  useEffect(() => {
    if (featuredCollections.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % featuredCollections.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [featuredCollections.length]);

  if (featuredCollections.length === 0) {
    return <div className="w-full h-screen bg-black flex items-center justify-center text-white">로딩 중...</div>;
  }

  const currentCollection = featuredCollections[currentSlide];
  const mainImage = currentCollection.images[0]; // 첫 번째 이미지를 대표 이미지로

  const headerHeight = '0px'; // 네비게이션 바는 이미 App.jsx에서 paddingTop으로 처리됨
  const contentHeight = '100%'; // 전체 높이 사용

  return (
    <div style={{ 
      position: 'absolute', 
      top: headerHeight, 
      left: 0, 
      width: '100vw', 
      height: contentHeight, 
      overflow: 'hidden',
      backgroundImage: `url(/images/images/slides/${mainImage.filename})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      {/* 메인 이미지 */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        {/* 어두운 오버레이 */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* 콘텐츠 */}
        <div className="relative z-10 flex flex-col items-start justify-end h-full p-8 text-white">
          <h2 className="text-2xl md:text-4xl font-light mb-2">{currentCollection.title}</h2>
          <p className="text-sm md:text-base text-gray-200 mb-1">{currentCollection.date}</p>
          <p className="text-sm text-gray-200 mb-2">{currentCollection.location}</p>
          <p className="text-sm text-gray-300 max-w-2xl">{currentCollection.description}</p>
          
          {/* 태그들 */}
          <div className="flex flex-wrap gap-2 mt-3">
            {currentCollection.tags.theme.slice(0, 3).map((tag, index) => (
              <span key={index} className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 인디케이터 */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {featuredCollections.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* 네비게이션 화살표 */}
      <button
        onClick={() => setCurrentSlide(prev => 
          prev === 0 ? featuredCollections.length - 1 : prev - 1
        )}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl hover:text-gray-300 transition"
      >
        ‹
      </button>
      <button
        onClick={() => setCurrentSlide(prev => (prev + 1) % featuredCollections.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl hover:text-gray-300 transition"
      >
        ›
      </button>
    </div>
  );
}

export default HeroSlide;