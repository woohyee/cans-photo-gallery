// 📄 src/pages/Admin/Admin.jsx
import React, { useState } from 'react';
import { photoCollections } from '../../data/photoData';

function Admin() {
  const [activeTab, setActiveTab] = useState('upload');

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-light mb-8 text-center">관리자 패널</h1>

        {/* 탭 네비게이션 */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-900 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-6 py-2 rounded-md text-sm transition ${activeTab === 'upload'
                ? 'bg-white text-black'
                : 'hover:bg-gray-800'
                }`}
            >
              📤 업로드
            </button>
            <button
              onClick={() => setActiveTab('manage')}
              className={`px-6 py-2 rounded-md text-sm transition ${activeTab === 'manage'
                ? 'bg-white text-black'
                : 'hover:bg-gray-800'
                }`}
            >
              📝 관리
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`px-6 py-2 rounded-md text-sm transition ${activeTab === 'stats'
                ? 'bg-white text-black'
                : 'hover:bg-gray-800'
                }`}
            >
              📊 통계
            </button>
          </div>
        </div>

        {/* 업로드 탭 */}
        {activeTab === 'upload' && (
          <div style={{ 
            backgroundColor: 'rgba(17, 24, 39, 0.8)', 
            borderRadius: '16px', 
            padding: window.innerWidth <= 768 ? '24px' : '32px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(75, 85, 99, 0.3)'
          }}>
            <h2 style={{ 
              fontSize: window.innerWidth <= 768 ? '24px' : '28px', 
              marginBottom: '32px',
              fontFamily: '"Noto Sans KR", sans-serif',
              fontWeight: '600',
              color: 'white'
            }}>
              📸 새 컬렉션 업로드
            </h2>
            
            {/* 개선된 드래그 앤 드롭 영역 */}
            <div 
              style={{
                border: '3px dashed #6b7280',
                borderRadius: '20px',
                padding: window.innerWidth <= 768 ? '40px 20px' : '60px 40px',
                textAlign: 'center',
                marginBottom: '32px',
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onDragOver={(e) => {
                e.preventDefault();
                e.target.style.borderColor = '#3b82f6';
                e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
              }}
              onDragLeave={(e) => {
                e.target.style.borderColor = '#6b7280';
                e.target.style.backgroundColor = 'transparent';
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.target.style.borderColor = '#6b7280';
                e.target.style.backgroundColor = 'transparent';
                console.log('Files dropped:', e.dataTransfer.files);
              }}
            >
              <div style={{ fontSize: window.innerWidth <= 768 ? '48px' : '64px', marginBottom: '16px' }}>
                📷
              </div>
              <p style={{ 
                fontSize: window.innerWidth <= 768 ? '18px' : '24px', 
                marginBottom: '8px',
                fontWeight: '600',
                color: '#e5e7eb'
              }}>
                사진을 여기로 드래그하세요
              </p>
              <p style={{ 
                fontSize: window.innerWidth <= 768 ? '14px' : '16px', 
                color: '#9ca3af',
                marginBottom: '24px'
              }}>
                또는 클릭하여 파일을 선택하세요 (JPG, PNG, HEIC 지원)
              </p>
              <input
                type="file"
                multiple
                accept="image/*"
                style={{ display: 'none' }}
                id="file-input"
                onChange={(e) => {
                  console.log('Files selected:', e.target.files);
                }}
              />
              <button 
                onClick={() => document.getElementById('file-input').click()}
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                  border: 'none',
                  color: 'white',
                  padding: window.innerWidth <= 768 ? '12px 24px' : '16px 32px',
                  borderRadius: '12px',
                  fontSize: window.innerWidth <= 768 ? '16px' : '18px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.4)';
                }}
              >
                📁 파일 선택하기
              </button>
            </div>

            {/* 메타데이터 입력 폼 */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">제목</label>
                <input
                  type="text"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none"
                  placeholder="예: 한강 일몰 산책"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">날짜</label>
                <input
                  type="date"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">장소</label>
                <input
                  type="text"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none"
                  placeholder="예: 서울 한강공원"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">태그</label>
                <input
                  type="text"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none"
                  placeholder="예: 자연, 일몰, 한강"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">설명</label>
                <textarea
                  rows="4"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:border-blue-500 focus:outline-none"
                  placeholder="이날의 여행 이야기를 들려주세요..."
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button className="bg-green-600 hover:bg-green-700 px-8 py-2 rounded-lg transition">
                업로드
              </button>
            </div>
          </div>
        )}

        {/* 관리 탭 */}
        {activeTab === 'manage' && (
          <div className="bg-gray-900 rounded-lg p-8">
            <h2 className="text-xl mb-6">컬렉션 관리</h2>

            <div className="space-y-4">
              {photoCollections.map((collection) => (
                <div key={collection.id} className="bg-gray-800 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={`/images/images/slides/${collection.images[0].filename}`}
                      alt={collection.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-medium">{collection.title}</h3>
                      <p className="text-sm text-gray-400">{collection.date} • {collection.location}</p>
                      <p className="text-xs text-gray-500">{collection.images.length}장의 사진</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm transition">
                      수정
                    </button>
                    <button className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm transition">
                      삭제
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 통계 탭 */}
        {activeTab === 'stats' && (
          <div className="bg-gray-900 rounded-lg p-8">
            <h2 className="text-xl mb-6">갤러리 통계</h2>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-800 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-blue-400">{photoCollections.length}</div>
                <div className="text-sm text-gray-400">총 컬렉션</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-green-400">
                  {photoCollections.reduce((sum, col) => sum + col.images.length, 0)}
                </div>
                <div className="text-sm text-gray-400">총 사진</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-purple-400">
                  {photoCollections.reduce((sum, col) => sum + col.likes, 0)}
                </div>
                <div className="text-sm text-gray-400">총 좋아요</div>
              </div>
            </div>

            <div className="text-sm text-gray-400">
              <p>• 가장 인기 있는 컬렉션: {photoCollections.sort((a, b) => b.likes - a.likes)[0]?.title}</p>
              <p>• 최근 업로드: {photoCollections.sort((a, b) => new Date(b.date) - new Date(a.date))[0]?.title}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;