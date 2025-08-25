// 📄 client/src/pages/Archive/Archive.jsx
import React from 'react';
import { photoCollections } from '../../data/photoData';

function Archive() {
  // SSR/빌드 안전 처리: window가 없을 때를 대비한 기본값
  const w = typeof window !== 'undefined' ? window.innerWidth : 1024;

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: 'black',
    color: 'white',
    paddingTop: w <= 480 ? '140px' : w <= 768 ? '160px' : '20vh',
    padding: w <= 480 ? '140px 16px 32px 16px' : w <= 768 ? '160px 16px 32px 16px' : '20vh 32px 32px 32px',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    alignItems: 'center',
    justifyContent: 'flex-start',
  };

  return (
    <div style={containerStyle}>
      {/* 상단 안내 블록 */}
      <div style={{ textAlign: 'center', maxWidth: '400px' }}>
        <div style={{ fontSize: '80px', marginBottom: '24px' }}>🚧</div>
        <h1
          style={{
            fontSize: w <= 480 ? '24px' : '32px',
            fontWeight: 600,
            marginBottom: '16px',
            fontFamily: '"Noto Sans KR", sans-serif',
          }}
        >
          주간 아카이브
        </h1>
        <p
          style={{
            fontSize: w <= 480 ? '16px' : '18px',
            color: '#9ca3af',
            marginBottom: '24px',
            lineHeight: 1.5,
          }}
        >
          현재 개발 중입니다
        </p>
        <div
          style={{
            backgroundColor: 'rgba(255, 193, 7, 0.1)',
            border: '1px solid rgba(255, 193, 7, 0.3)',
            borderRadius: '12px',
            padding: '16px',
            color: '#fbbf24',
          }}
        >
          <p style={{ margin: 0, fontSize: '14px' }}>
            곧 멋진 주간별 아카이브 기능이 추가될 예정입니다!
          </p>
        </div>
      </div>

      {/* 컬렉션 그리드 */}
      <div className="grid gap-8">
        {photoCollections.map((collection) => (
          <div
            key={collection.id}
            className="border border-gray-700 rounded-lg overflow-hidden hover:border-gray-500 transition"
          >
            {/* 헤더 */}
            <div className="p-6 border-b border-gray-700">
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-xl font-medium">{collection.title}</h2>
                <span className="text-sm text-gray-400">{collection.date}</span>
              </div>
              <p className="text-gray-300 text-sm mb-2">{collection.location}</p>
              <p className="text-gray-400 text-sm">{collection.description}</p>
            </div>

            {/* 이미지 그리드 */}
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {collection.images.map((image, index) => (
                  <div
                    key={index}
                    className="aspect-square overflow-hidden rounded-lg bg-gray-800"
                  >
                    <img
                      src={`/images/images/slides/${image.filename}`}
                      alt={image.caption}
                      className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* 태그 및 상호작용 */}
            <div className="px-6 pb-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {collection.tags.theme.map((tag, index) => (
                  <span key={index} className="text-xs bg-gray-800 px-2 py-1 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>❤️ {collection.likes}</span>
                <span>💬 {collection.comments.length}</span>
              </div>
            </div>
          </div>
         ))}
        </div>
      {/* 최상위 컨테이너 닫힘 */}
    </div>
  );
}

export default Archive;
