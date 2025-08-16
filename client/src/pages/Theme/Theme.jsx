// 📄 src/pages/Theme/Theme.jsx
import React, { useState } from 'react';
import { photoCollections, getAllTags, filterByTag } from '../../data/photoData';

function Theme() {
  const [selectedTheme, setSelectedTheme] = useState('all');
  const allTags = getAllTags();
  
  const filteredCollections = selectedTheme === 'all' 
    ? photoCollections 
    : filterByTag(photoCollections, 'theme', selectedTheme);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-light mb-8 text-center">주제별 갤러리</h1>
        
        {/* 테마 필터 */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedTheme('all')}
            className={`px-4 py-2 rounded-full text-sm transition ${
              selectedTheme === 'all' 
                ? 'bg-white text-black' 
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            전체
          </button>
          {allTags.theme.map((theme) => (
            <button
              key={theme}
              onClick={() => setSelectedTheme(theme)}
              className={`px-4 py-2 rounded-full text-sm transition ${
                selectedTheme === theme 
                  ? 'bg-white text-black' 
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              {theme}
            </button>
          ))}
        </div>

        {/* 결과 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCollections.map((collection) => (
            <div key={collection.id} className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition">
              {/* 대표 이미지 */}
              <div className="aspect-video overflow-hidden">
                <img
                  src={`/images/images/slides/${collection.images[0].filename}`}
                  alt={collection.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
              
              {/* 정보 */}
              <div className="p-4">
                <h3 className="font-medium mb-2">{collection.title}</h3>
                <p className="text-sm text-gray-400 mb-2">{collection.date} • {collection.location}</p>
                <p className="text-sm text-gray-300 mb-3 line-clamp-2">{collection.description}</p>
                
                {/* 태그 */}
                <div className="flex flex-wrap gap-1">
                  {collection.tags.theme.map((tag, index) => (
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
            선택한 주제의 사진이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}

export default Theme;