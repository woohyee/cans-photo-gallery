// 📄 src/pages/Archive/Archive.jsx
import React from 'react';
import { photoCollections } from '../../data/photoData';

function Archive() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-light mb-8 text-center">주간 아카이브</h1>
        <p className="text-gray-300 text-center mb-12">친구의 여행 기록들을 시간순으로 모아보세요</p>
        
        {/* 컬렉션 그리드 */}
        <div className="grid gap-8">
          {photoCollections.map((collection) => (
            <div key={collection.id} className="border border-gray-700 rounded-lg overflow-hidden hover:border-gray-500 transition">
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
                    <div key={index} className="aspect-square overflow-hidden rounded-lg bg-gray-800">
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
      </div>
    </div>
  );
}

export default Archive;