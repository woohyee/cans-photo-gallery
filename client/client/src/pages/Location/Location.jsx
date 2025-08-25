// 📄 src/pages/Location/Location.jsx
import React, { useState } from 'react';
import { photoCollections, getAllTags, filterByTag } from '../../data/photoData';

function Location() {
  const [selectedLocation, setSelectedLocation] = useState('all');
  const allTags = getAllTags();
  
  const filteredCollections = selectedLocation === 'all' 
    ? photoCollections 
    : filterByTag(photoCollections, 'location', selectedLocation);

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: 'black', 
      color: 'white', 
      paddingTop: window.innerWidth <= 480 ? '140px' : window.innerWidth <= 768 ? '160px' : '20vh',
      padding: window.innerWidth <= 480 ? '140px 16px 32px 16px' : window.innerWidth <= 768 ? '160px 16px 32px 16px' : '20vh 32px 32px 32px'
    }}>
      <div style={{ textAlign: 'center', maxWidth: '400px', margin: '0 auto 32px auto' }}>
        <div style={{ fontSize: '80px', marginBottom: '24px' }}>📍</div>
        <h1 style={{ 
          fontSize: window.innerWidth <= 480 ? '24px' : '32px', 
          fontWeight: '600', 
          marginBottom: '16px',
          fontFamily: '"Noto Sans KR", sans-serif'
        }}>
          장소별 갤러리
        </h1>
        <p style={{ 
          fontSize: window.innerWidth <= 480 ? '16px' : '18px', 
          color: '#9ca3af', 
          marginBottom: '24px',
          lineHeight: '1.5'
        }}>
          현재 개발 중입니다
        </p>
        <div style={{ 
          backgroundColor: 'rgba(255, 193, 7, 0.1)', 
          border: '1px solid rgba(255, 193, 7, 0.3)',
          borderRadius: '12px',
          padding: '16px',
          color: '#fbbf24'
        }}>
          <p style={{ margin: 0, fontSize: '14px' }}>
            서울, 제주, 부산 등 장소별 분류 기능이 곧 추가됩니다!
          </p>
        </div>
      </div>
        
      {/* 장소 필터 */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        <button
          onClick={() => setSelectedLocation('all')}
          className={`px-4 py-2 rounded-full text-sm transition ${
            selectedLocation === 'all' 
              ? 'bg-white text-black' 
              : 'bg-gray-800 hover:bg-gray-700'
          }`}
        >
          전체
        </button>
        {allTags.location.map((location) => (
          <button
            key={location}
            onClick={() => setSelectedLocation(location)}
            className={`px-4 py-2 rounded-full text-sm transition ${
              selectedLocation === location 
                ? 'bg-white text-black' 
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            📍 {location}
          </button>
        ))}
      </div>

      {/* 지도 스타일 그리드 */}
      <div className="grid md:grid-cols-2 gap-8" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {filteredCollections.map((collection) => (
          <div key={collection.id} className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition">
            {/* 이미지 섹션 */}
            <div className="grid grid-cols-2 gap-1">
              {collection.images.slice(0, 4).map((image, index) => (
                <div key={index} className={`aspect-square overflow-hidden ${index === 0 && collection.images.length === 1 ? 'col-span-2' : ''}`}>
                  <img
                    src={`/images/images/slides/${image.filename}`}
                    alt={image.caption}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
              ))}
            </div>
            
            {/* 정보 섹션 */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-medium text-lg mb-1">{collection.title}</h3>
                  <p className="text-sm text-gray-400">{collection.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-blue-400">📍 {collection.location}</p>
                </div>
              </div>
              
              <p className="text-sm text-gray-300 mb-4">{collection.description}</p>
              
              {/* 장소 태그들 */}
              <div className="flex flex-wrap gap-2 mb-4">
                {collection.tags.location.map((tag, index) => (
                  <span key={index} className="text-xs bg-blue-900 bg-opacity-50 text-blue-300 px-2 py-1 rounded">
                    📍 {tag}
                  </span>
                ))}
              </div>
              
              {/* 기타 태그들 */}
              <div className="flex flex-wrap gap-2">
                {collection.tags.mood.slice(0, 3).map((tag, index) => (
                  <span key={index} className="text-xs bg-gray-800 px-2 py-1 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCollections.length === 0 && (
        <div className="text-center text-gray-400 mt-12">
          선택한 장소의 사진이 없습니다.
        </div>
      )}
    </div>
  );
}

export default Location;