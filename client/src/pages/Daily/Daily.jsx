// 📄 src/pages/Daily/Daily.jsx
import React, { useState, useEffect } from 'react';

function Daily() {
  const [selectedDate, setSelectedDate] = useState('all');
  const [dailyCollections, setDailyCollections] = useState([]);
  const [modalImage, setModalImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentCollection, setCurrentCollection] = useState(null);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [imageErrors, setImageErrors] = useState(new Set());
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [expandedCollections, setExpandedCollections] = useState(new Set());

  // 실제 아카이브 폴더 기반 데이터
  const archiveDates = [
    {
      folder: '7월27일',
      date: '2024.07.27',
      title: '7월 마지막 주말 나들이',
      location: '서울 근교',
      description: '날씨가 너무 좋아서 오랜만에 카메라를 들고 나갔습니다. 평범한 일상이지만 소중한 순간들을 담아봤어요.',
      images: [
        'TalkMedia_i_2b386d713df5.jpg.jpg',
        'TalkMedia_i_3c5df1fd52bf.jpg.jpg',
        'TalkMedia_i_5820363d6561.jpg.jpg',
        'TalkMedia_i_6cc33457f38f.jpg.jpg',
        'TalkMedia_i_6d026ee1f099.jpg.jpg',
        'TalkMedia_i_7cf3c3e38433.jpg.jpg',
        'TalkMedia_i_8d2b3c1bfe73.jpg.jpg',
        'TalkMedia_i_9255ab60777a.jpg.jpg',
        'TalkMedia_i_956e1ec9dfd8.jpg.jpg',
        'TalkMedia_i_a9eaf0936d2f.jpg.jpg'
      ],
      tags: ['일상', '주말', '나들이', '여름'],
      likes: 15
    },
    {
      folder: '7월13일',
      date: '2024.07.13',
      title: '여름 중반의 특별한 하루',
      location: '한강공원',
      description: '더위를 피해 한강으로 나왔습니다. 시원한 바람과 함께 여유로운 시간을 보냈어요.',
      images: [
        'TalkMedia_i_3fa32b2ca39e 2.jpg.jpg',
        'TalkMedia_i_50de2ed63630 2.jpg.jpg',
        'TalkMedia_i_53edb0b08c3f 2.jpg.jpg',
        'TalkMedia_i_81e8dd6a7c31 2.jpg.jpg',
        'TalkMedia_i_9eb98e8ae77d 2.jpg.jpg',
        'TalkMedia_i_a368fa2516d7 2.jpg.jpg',
        'TalkMedia_i_a8d0996d7da6 2.jpg.jpg',
        'TalkMedia_i_c6276d6b3bf7 2.jpg.jpg'
      ],
      tags: ['한강', '여름', '휴식', '자연'],
      likes: 22
    },
    {
      folder: '7월6일',
      date: '2024.07.06',
      title: '7월 첫 주말의 기록',
      location: '동네 근처',
      description: '7월이 시작되는 첫 주말, 동네를 산책하며 소소한 일상을 담았습니다.',
      images: [
        'TalkMedia_i_1d1927b09657.jpg.jpg',
        'TalkMedia_i_2a99380870a0.jpg.jpg',
        'TalkMedia_i_37bf28b00b6b.jpg.jpg',
        'TalkMedia_i_3a12673435e2.jpg.jpg',
        'TalkMedia_i_56f6ee369694.jpg.jpg',
        'TalkMedia_i_81406b7912e3.jpg.jpg',
        'TalkMedia_i_cb0058b837d1.jpg.jpg',
        'TalkMedia_i_f85965c118e4.jpg.jpg'
      ],
      tags: ['동네', '산책', '일상', '7월'],
      likes: 18
    },
    {
      folder: '6월29일',
      date: '2024.06.29',
      title: '6월의 마지막 기록',
      location: '공원과 카페',
      description: '6월이 끝나가는 아쉬움을 담아 여러 곳을 돌아다니며 사진을 찍었습니다.',
      images: [
        'TalkMedia_i_3772f5ebf15a.jpg.jpg',
        'TalkMedia_i_389520e06e33.jpg.jpg',
        'TalkMedia_i_3c057c4d13dc.jpg.jpg',
        'TalkMedia_i_44082615ecf2.jpg.jpg',
        'TalkMedia_i_5b1b784d12ed.jpg.jpg',
        'TalkMedia_i_642d72a1c14d.jpg.jpg',
        'TalkMedia_i_74a6589e76a4.jpg.jpg',
        'TalkMedia_i_772248cf8301.jpg.jpg',
        'TalkMedia_i_910f60c89431.jpg.jpg',
        'TalkMedia_i_a71e2379695c.jpg.jpg'
      ],
      tags: ['6월', '마지막', '공원', '카페'],
      likes: 12
    },
    {
      folder: '6월23일',
      date: '2024.06.23',
      title: '6월 중순의 여유로운 하루',
      location: '시내 곳곳',
      description: '날씨가 좋아서 시내 여러 곳을 돌아다니며 다양한 풍경을 담았습니다.',
      images: [
        'TalkMedia_i_0719af813333.jpg.jpg',
        'TalkMedia_i_1d0f761fce4e.jpg.jpg',
        'TalkMedia_i_36be55949bdf.jpg.jpg',
        'TalkMedia_i_3d7eaf82e06b.jpg.jpg',
        'TalkMedia_i_662fd349582b.jpg.jpg',
        'TalkMedia_i_672dadf11b3f.jpg.jpg',
        'TalkMedia_i_9508a5ab79d6.jpg.jpg',
        'TalkMedia_i_a80bc548fc6a.jpg.jpg',
        'TalkMedia_i_b401c713efac.jpg.jpg',
        'TalkMedia_i_fa21422cdbec.jpg.jpg'
      ],
      tags: ['시내', '여유', '풍경', '6월'],
      likes: 20
    },
    {
      folder: '6월15일',
      date: '2024.06.15',
      title: '6월 중순의 소중한 순간들',
      location: '다양한 장소',
      description: '6월 중순, 여러 장소에서 만난 아름다운 순간들을 기록했습니다.',
      images: [
        'TalkMedia_i_0e46e1922d75.jpg.jpg',
        'TalkMedia_i_1a274e6d508b.jpg.jpg',
        'TalkMedia_i_1d7b25198ee2.jpg.jpg',
        'TalkMedia_i_1eda6527ab8c.jpg.jpg',
        'TalkMedia_i_4269e12ea2d5.jpg.jpg',
        'TalkMedia_i_7a742a3c0265.jpg.jpg',
        'TalkMedia_i_7f8c68e99dc7.jpg.jpg',
        'TalkMedia_i_8f0e30f48ef8.jpg.jpg',
        'TalkMedia_i_a701901d68ca.jpg.jpg',
        'TalkMedia_i_b035c79bc3b8.jpg.jpg'
      ],
      tags: ['6월', '중순', '다양한', '순간'],
      likes: 16
    }
  ];

  useEffect(() => {
    // 이미지 존재 여부를 확인하고 필터링
    const validateCollections = async () => {
      const validatedCollections = await Promise.all(
        archiveDates.map(async (collection) => {
          const validImages = [];
          for (const image of collection.images) {
            const imageKey = `${collection.folder}/${image}`;
            if (!imageErrors.has(imageKey)) {
              validImages.push(image);
            }
          }
          return { ...collection, images: validImages };
        })
      );
      setDailyCollections(validatedCollections.filter(col => col.images.length > 0));
    };

    validateCollections();
  }, [imageErrors]);

  const dates = archiveDates.map(item => item.date).sort((a, b) => new Date(b) - new Date(a));
  
  const filteredCollections = selectedDate === 'all' 
    ? dailyCollections 
    : dailyCollections.filter(collection => collection.date === selectedDate);

  // 이미지 모달 열기
  const openModal = (collection, imageIndex) => {
    setCurrentCollection(collection);
    setCurrentImageIndex(imageIndex);
    setModalImage(collection.images[imageIndex]);
  };

  // 이미지 모달 닫기
  const closeModal = () => {
    setModalImage(null);
    setCurrentCollection(null);
    setCurrentImageIndex(0);
  };

  // 다음 이미지
  const nextImage = () => {
    if (currentCollection && currentImageIndex < currentCollection.images.length - 1) {
      const newIndex = currentImageIndex + 1;
      setCurrentImageIndex(newIndex);
      setModalImage(currentCollection.images[newIndex]);
    }
  };

  // 이전 이미지
  const prevImage = () => {
    if (currentCollection && currentImageIndex > 0) {
      const newIndex = currentImageIndex - 1;
      setCurrentImageIndex(newIndex);
      setModalImage(currentCollection.images[newIndex]);
    }
  };

  // 관리자 인증
  const handleAdminLogin = () => {
    // 간단한 패스워드 체크 (실제 운영에서는 더 안전한 방법 사용)
    if (adminPassword === 'canphoto2024') {
      setIsAdminMode(true);
      setShowAdminLogin(false);
      setAdminPassword('');
      alert('관리자 모드가 활성화되었습니다.');
    } else {
      alert('잘못된 패스워드입니다.');
      setAdminPassword('');
    }
  };

  // 관리자 모드 해제
  const handleAdminLogout = () => {
    setIsAdminMode(false);
    alert('관리자 모드가 해제되었습니다.');
  };

  // 이미지 삭제 (관리자 전용)
  const handleDeleteImage = (collection, imageIndex) => {
    if (!isAdminMode) return;
    
    const confirmDelete = window.confirm(`이 사진을 삭제하시겠습니까?\n\n${collection.title} - ${imageIndex + 1}번째 사진`);
    if (confirmDelete) {
      const imageKey = `${collection.folder}/${collection.images[imageIndex]}`;
      setImageErrors(prev => new Set([...prev, imageKey]));
      
      // 모달이 열려있다면 닫기
      if (modalImage) {
        closeModal();
      }
      
      alert('사진이 삭제되었습니다.');
    }
  };

  // 컬렉션 확장/축소
  const toggleCollection = (collectionId) => {
    setExpandedCollections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(collectionId)) {
        newSet.delete(collectionId);
      } else {
        newSet.add(collectionId);
      }
      return newSet;
    });
  };

  // 키보드 이벤트
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (modalImage) {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') closeModal();
        if (e.key === 'Delete' && isAdminMode) {
          handleDeleteImage(currentCollection, currentImageIndex);
        }
      }
      // 관리자 모드 토글 (Ctrl + Alt + A)
      if (e.ctrlKey && e.altKey && e.key === 'a') {
        if (isAdminMode) {
          handleAdminLogout();
        } else {
          setShowAdminLogin(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [modalImage, currentImageIndex, currentCollection, isAdminMode]);

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: 'black', 
      color: 'white', 
      paddingTop: window.innerWidth <= 480 ? '120px' : window.innerWidth <= 768 ? '140px' : '20vh',
      padding: window.innerWidth <= 480 ? '120px 12px 20px 12px' : window.innerWidth <= 768 ? '140px 16px 24px 16px' : '20vh 32px 32px 32px',
      overflowX: 'hidden'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* 헤더 섹션 */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          marginBottom: window.innerWidth <= 480 ? '16px' : '24px',
          flexDirection: window.innerWidth <= 480 ? 'column' : 'row',
          gap: window.innerWidth <= 480 ? '12px' : '0'
        }}>
          <h1 style={{ 
            fontSize: window.innerWidth <= 480 ? '20px' : window.innerWidth <= 768 ? '24px' : '32px', 
            fontWeight: '600', 
            margin: 0,
            fontFamily: '"Noto Sans KR", sans-serif',
            textAlign: window.innerWidth <= 480 ? 'center' : 'left'
          }}>
            일자별 갤러리
          </h1>
          
          {/* 관리자 모드 표시 및 토글 */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            flexDirection: window.innerWidth <= 480 ? 'column' : 'row'
          }}>
            {isAdminMode && (
              <span style={{ 
                backgroundColor: 'rgba(239, 68, 68, 0.2)', 
                color: '#ef4444', 
                padding: '4px 8px', 
                borderRadius: '12px', 
                fontSize: window.innerWidth <= 480 ? '12px' : '14px',
                fontWeight: '600'
              }}>
                🔧 관리자 모드
              </span>
            )}
            <button
              onClick={() => isAdminMode ? handleAdminLogout() : setShowAdminLogin(true)}
              style={{
                backgroundColor: isAdminMode ? 'rgba(239, 68, 68, 0.2)' : 'rgba(75, 85, 99, 0.3)',
                color: isAdminMode ? '#ef4444' : '#9ca3af',
                border: 'none',
                padding: window.innerWidth <= 480 ? '6px 12px' : '8px 16px',
                borderRadius: '16px',
                fontSize: window.innerWidth <= 480 ? '12px' : '14px',
                cursor: 'pointer',
                transition: 'all 0.3s',
                whiteSpace: 'nowrap'
              }}
            >
              {isAdminMode ? '🔓 관리자 해제' : '🔒 관리자 모드'}
            </button>
          </div>
        </div>
        
        {/* 날짜 필터 (가로 스크롤) */}
        <div style={{ 
          marginBottom: window.innerWidth <= 480 ? '20px' : '32px', 
          overflow: 'hidden',
          paddingBottom: '8px'
        }}>
          <div style={{ 
            display: 'flex', 
            gap: window.innerWidth <= 480 ? '6px' : '12px', 
            paddingBottom: '8px',
            overflowX: 'auto',
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(255,255,255,0.3) transparent',
            WebkitOverflowScrolling: 'touch',
            msOverflowStyle: 'none'
          }}>
            <button
              onClick={() => setSelectedDate('all')}
              style={{
                padding: window.innerWidth <= 480 ? '8px 12px' : '12px 20px',
                borderRadius: window.innerWidth <= 480 ? '16px' : '20px',
                fontSize: window.innerWidth <= 480 ? '12px' : '14px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s',
                backgroundColor: selectedDate === 'all' ? 'white' : 'rgba(255,255,255,0.1)',
                color: selectedDate === 'all' ? 'black' : 'white',
                whiteSpace: 'nowrap',
                minWidth: window.innerWidth <= 480 ? '60px' : '80px',
                fontWeight: selectedDate === 'all' ? '600' : '400',
                flexShrink: 0
              }}
            >
              📋 전체
            </button>
            {dates.map((date) => (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                style={{
                  padding: window.innerWidth <= 480 ? '8px 10px' : '12px 16px',
                  borderRadius: window.innerWidth <= 480 ? '16px' : '20px',
                  fontSize: window.innerWidth <= 480 ? '12px' : '14px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  backgroundColor: selectedDate === date ? 'white' : 'rgba(255,255,255,0.1)',
                  color: selectedDate === date ? 'black' : 'white',
                  whiteSpace: 'nowrap',
                  minWidth: window.innerWidth <= 480 ? '100px' : '120px',
                  fontWeight: selectedDate === date ? '600' : '400',
                  flexShrink: 0
                }}
              >
                📅 {date}
              </button>
            ))}
          </div>
        </div>

        {/* 타임라인 스타일 결과 */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: window.innerWidth <= 480 ? '16px' : '24px',
          paddingBottom: window.innerWidth <= 480 ? '20px' : '32px'
        }}>
          {filteredCollections.map((collection) => (
            <div key={collection.id} style={{ 
              backgroundColor: 'rgba(255,255,255,0.05)', 
              borderRadius: '12px', 
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              {/* 날짜 헤더 */}
              <div style={{ 
                padding: window.innerWidth <= 480 ? '12px' : '20px', 
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                backgroundColor: 'rgba(255,255,255,0.05)'
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: window.innerWidth <= 480 ? 'flex-start' : 'center', 
                  marginBottom: '8px',
                  flexDirection: window.innerWidth <= 480 ? 'column' : 'row',
                  gap: window.innerWidth <= 480 ? '6px' : '0'
                }}>
                  <h2 style={{ 
                    fontSize: window.innerWidth <= 480 ? '16px' : '20px', 
                    fontWeight: '500', 
                    margin: 0,
                    fontFamily: '"Noto Sans KR", sans-serif'
                  }}>
                    {collection.title}
                  </h2>
                  <span style={{ 
                    fontSize: window.innerWidth <= 480 ? '12px' : '14px', 
                    color: '#60a5fa',
                    backgroundColor: 'rgba(96, 165, 250, 0.1)',
                    padding: window.innerWidth <= 480 ? '3px 8px' : '4px 12px',
                    borderRadius: '12px',
                    alignSelf: window.innerWidth <= 480 ? 'flex-start' : 'auto'
                  }}>
                    📅 {collection.date}
                  </span>
                </div>
                <p style={{ 
                  fontSize: window.innerWidth <= 480 ? '12px' : '14px', 
                  color: '#9ca3af', 
                  margin: '4px 0' 
                }}>
                  📍 {collection.location}
                </p>
                <p style={{ 
                  fontSize: window.innerWidth <= 480 ? '12px' : '14px', 
                  color: '#d1d5db', 
                  margin: 0,
                  lineHeight: '1.4'
                }}>
                  {collection.description}
                </p>
              </div>
              
              {/* 이미지 그리드 */}
              <div style={{ padding: window.innerWidth <= 480 ? '12px' : '20px' }}>
                {/* 이미지 개수 및 더보기 정보 */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  marginBottom: window.innerWidth <= 480 ? '8px' : '12px',
                  flexDirection: window.innerWidth <= 480 ? 'column' : 'row',
                  gap: window.innerWidth <= 480 ? '6px' : '0'
                }}>
                  <span style={{ 
                    fontSize: window.innerWidth <= 480 ? '12px' : '14px', 
                    color: '#9ca3af' 
                  }}>
                    📸 총 {collection.images.filter(img => !imageErrors.has(`${collection.folder}/${img}`)).length}장
                  </span>
                  {collection.images.filter(img => !imageErrors.has(`${collection.folder}/${img}`)).length > 6 && (
                    <button
                      onClick={() => toggleCollection(collection.id)}
                      style={{
                        backgroundColor: 'rgba(59, 130, 246, 0.2)',
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                        color: '#60a5fa',
                        padding: window.innerWidth <= 480 ? '4px 8px' : '6px 12px',
                        borderRadius: '12px',
                        fontSize: window.innerWidth <= 480 ? '11px' : '12px',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        whiteSpace: 'nowrap'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.2)';
                      }}
                    >
                      {expandedCollections.has(collection.id) ? '📤 접기' : '📥 모두보기'}
                    </button>
                  )}
                </div>

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: window.innerWidth <= 480 ? 'repeat(2, 1fr)' : window.innerWidth <= 768 ? 'repeat(3, 1fr)' : 'repeat(auto-fit, minmax(180px, 1fr))', 
                  gap: window.innerWidth <= 480 ? '8px' : window.innerWidth <= 768 ? '10px' : '12px' 
                }}>
                  {collection.images
                    .filter(img => !imageErrors.has(`${collection.folder}/${img}`))
                    .slice(0, expandedCollections.has(collection.id) ? undefined : 6)
                    .map((image, index) => {
                      const originalIndex = collection.images.indexOf(image);
                      
                      return (
                        <div key={index} className="image-container" style={{ 
                          aspectRatio: '1', 
                          overflow: 'hidden', 
                          borderRadius: '8px',
                          backgroundColor: 'rgba(255,255,255,0.05)',
                          position: 'relative'
                        }}>
                          <img
                            src={`/images/images/archive/${collection.folder}/${image}`}
                            alt={`${collection.title} - ${originalIndex + 1}`}
                            style={{ 
                              width: '100%', 
                              height: '100%', 
                              objectFit: 'cover',
                              transition: 'transform 0.3s',
                              cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                            onClick={() => openModal(collection, originalIndex)}
                            onError={() => {
                              const imageKey = `${collection.folder}/${image}`;
                              setImageErrors(prev => new Set([...prev, imageKey]));
                            }}
                          />
                          
                          {/* 확대 아이콘 */}
                          <div style={{
                            position: 'absolute',
                            top: '4px',
                            right: isAdminMode ? '36px' : '4px',
                            backgroundColor: 'rgba(0,0,0,0.6)',
                            borderRadius: '50%',
                            width: window.innerWidth <= 480 ? '24px' : '28px',
                            height: window.innerWidth <= 480 ? '24px' : '28px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: window.innerWidth <= 480 ? '12px' : '14px',
                            opacity: 0,
                            transition: 'opacity 0.3s',
                            pointerEvents: 'none'
                          }}
                          className="zoom-icon"
                          >
                            🔍
                          </div>

                          {/* 관리자 삭제 버튼 */}
                          {isAdminMode && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteImage(collection, originalIndex);
                              }}
                              style={{
                                position: 'absolute',
                                top: '4px',
                                right: '4px',
                                backgroundColor: 'rgba(239, 68, 68, 0.8)',
                                border: 'none',
                                borderRadius: '50%',
                                width: window.innerWidth <= 480 ? '24px' : '28px',
                                height: window.innerWidth <= 480 ? '24px' : '28px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: window.innerWidth <= 480 ? '12px' : '14px',
                                color: 'white',
                                cursor: 'pointer',
                                opacity: 0,
                                transition: 'opacity 0.3s',
                                zIndex: 10
                              }}
                              className="delete-btn"
                              onMouseEnter={(e) => {
                                e.target.style.backgroundColor = 'rgba(239, 68, 68, 1)';
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.8)';
                              }}
                            >
                              🗑️
                            </button>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
              
              {/* 태그 및 상호작용 */}
              <div style={{ 
                padding: window.innerWidth <= 480 ? '0 12px 12px 12px' : '0 20px 20px 20px' 
              }}>
                <div style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: window.innerWidth <= 480 ? '6px' : '8px', 
                  marginBottom: window.innerWidth <= 480 ? '12px' : '16px' 
                }}>
                  {collection.tags.map((tag, index) => (
                    <span key={index} style={{ 
                      fontSize: window.innerWidth <= 480 ? '11px' : '12px', 
                      backgroundColor: 'rgba(255,255,255,0.1)', 
                      padding: window.innerWidth <= 480 ? '4px 8px' : '4px 10px', 
                      borderRadius: '12px',
                      color: '#e5e7eb'
                    }}>
                      #{tag}
                    </span>
                  ))}
                </div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  fontSize: window.innerWidth <= 480 ? '12px' : '14px', 
                  color: '#9ca3af' 
                }}>
                  <span>❤️ {collection.likes}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>📸 {collection.images.filter(img => !imageErrors.has(`${collection.folder}/${img}`)).length}장</span>
                    {!expandedCollections.has(collection.id) && 
                     collection.images.filter(img => !imageErrors.has(`${collection.folder}/${img}`)).length > 6 && (
                      <span style={{ 
                        fontSize: window.innerWidth <= 480 ? '11px' : '12px', 
                        color: '#6b7280' 
                      }}>
                        (+{collection.images.filter(img => !imageErrors.has(`${collection.folder}/${img}`)).length - 6}장)
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCollections.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            color: '#9ca3af', 
            marginTop: '48px', 
            fontSize: window.innerWidth <= 480 ? '16px' : '18px' 
          }}>
            선택한 날짜의 사진이 없습니다.
          </div>
        )}
      </div>

      {/* 이미지 모달 */}
      {modalImage && currentCollection && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.95)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: window.innerWidth <= 480 ? '10px' : '20px'
          }}
          onClick={closeModal}
        >
          {/* 모달 컨텐츠 */}
          <div style={{ 
            position: 'relative', 
            maxWidth: '95vw', 
            maxHeight: '95vh' 
          }} onClick={(e) => e.stopPropagation()}>
            {/* 닫기 버튼 */}
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: window.innerWidth <= 480 ? '-40px' : '-50px',
                right: '0',
                backgroundColor: 'transparent',
                border: 'none',
                color: 'white',
                fontSize: window.innerWidth <= 480 ? '24px' : '32px',
                cursor: 'pointer',
                zIndex: 2001
              }}
            >
              ✕
            </button>

            {/* 이전 버튼 */}
            {currentImageIndex > 0 && (
              <button
                onClick={prevImage}
                style={{
                  position: 'absolute',
                  left: window.innerWidth <= 480 ? '-40px' : '-60px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  border: 'none',
                  color: 'white',
                  fontSize: window.innerWidth <= 480 ? '24px' : '32px',
                  cursor: 'pointer',
                  borderRadius: '50%',
                  width: window.innerWidth <= 480 ? '36px' : '50px',
                  height: window.innerWidth <= 480 ? '36px' : '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.3)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
              >
                ‹
              </button>
            )}

            {/* 다음 버튼 */}
            {currentImageIndex < currentCollection.images.length - 1 && (
              <button
                onClick={nextImage}
                style={{
                  position: 'absolute',
                  right: window.innerWidth <= 480 ? '-40px' : '-60px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  border: 'none',
                  color: 'white',
                  fontSize: window.innerWidth <= 480 ? '24px' : '32px',
                  cursor: 'pointer',
                  borderRadius: '50%',
                  width: window.innerWidth <= 480 ? '36px' : '50px',
                  height: window.innerWidth <= 480 ? '36px' : '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.3)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
              >
                ›
              </button>
            )}

            {/* 메인 이미지 */}
            <img
              src={`/images/images/archive/${currentCollection.folder}/${modalImage}`}
              alt={`${currentCollection.title} - ${currentImageIndex + 1}`}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                borderRadius: '8px'
              }}
            />

            {/* 이미지 정보 */}
            <div style={{
              position: 'absolute',
              bottom: window.innerWidth <= 480 ? '-60px' : '-80px',
              left: 0,
              right: 0,
              color: 'white',
              textAlign: 'center'
            }}>
              <p style={{ 
                margin: '8px 0', 
                fontSize: window.innerWidth <= 480 ? '14px' : '18px', 
                fontWeight: '500' 
              }}>
                {currentCollection.title}
              </p>
              <p style={{ 
                margin: '4px 0', 
                fontSize: window.innerWidth <= 480 ? '12px' : '14px', 
                color: '#9ca3af' 
              }}>
                {currentImageIndex + 1} / {currentCollection.images.length} • {currentCollection.date}
              </p>
              {isAdminMode && (
                <button
                  onClick={() => handleDeleteImage(currentCollection, currentImageIndex)}
                  style={{
                    backgroundColor: 'rgba(239, 68, 68, 0.8)',
                    border: 'none',
                    color: 'white',
                    padding: window.innerWidth <= 480 ? '6px 12px' : '8px 16px',
                    borderRadius: '16px',
                    fontSize: window.innerWidth <= 480 ? '12px' : '14px',
                    cursor: 'pointer',
                    marginTop: '8px',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(239, 68, 68, 1)'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.8)'}
                >
                  🗑️ 이 사진 삭제
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 관리자 로그인 모달 */}
      {showAdminLogin && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            zIndex: 3000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setShowAdminLogin(false)}
        >
          <div 
            style={{
              backgroundColor: 'rgba(17, 24, 39, 0.95)',
              borderRadius: '16px',
              padding: window.innerWidth <= 480 ? '24px' : '32px',
              maxWidth: '400px',
              width: '100%',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(75, 85, 99, 0.3)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ 
              fontSize: window.innerWidth <= 480 ? '20px' : '24px', 
              fontWeight: '600', 
              marginBottom: '24px', 
              textAlign: 'center',
              color: 'white',
              fontFamily: '"Noto Sans KR", sans-serif'
            }}>
              🔒 관리자 인증
            </h3>
            
            <input
              type="password"
              placeholder="관리자 패스워드를 입력하세요"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAdminLogin();
                }
              }}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid rgba(75, 85, 99, 0.5)',
                backgroundColor: 'rgba(31, 41, 55, 0.8)',
                color: 'white',
                fontSize: '16px',
                marginBottom: '24px',
                outline: 'none'
              }}
              autoFocus
            />
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setShowAdminLogin(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(75, 85, 99, 0.5)',
                  backgroundColor: 'transparent',
                  color: '#9ca3af',
                  fontSize: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                취소
              </button>
              <button
                onClick={handleAdminLogin}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                로그인
              </button>
            </div>
            
            <p style={{ 
              fontSize: '12px', 
              color: '#6b7280', 
              textAlign: 'center', 
              marginTop: '16px',
              marginBottom: 0
            }}>
              단축키: Ctrl + Alt + A
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Daily;