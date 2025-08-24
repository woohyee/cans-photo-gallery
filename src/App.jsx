// 📄 src/App.jsx
// 메인 애플리케이션 컴포넌트
// - 전체 화면 기반 사진 갤러리
// - 햄버거 메뉴 + React Router 라우팅
// - 모든 UI 텍스트: 한국어

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import HeroSlide from './components/HeroSlide/HeroSlide';  // 전체 슬라이드
import Archive from './pages/Archive/Archive';            // 주간 아카이브
import Daily from './pages/Daily/Daily';                  // 일자별
import Theme from './pages/Theme/Theme';                  // 주제별
import Location from './pages/Location/Location';         // 장소별
import Admin from './pages/Admin/Admin';                  // 관리자

function App() {
  return (
    <Router basename="/">
      <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
        
        {/* 상단 타이틀 영역 (모바일 최적화) */}
        <header style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          height: window.innerWidth <= 480 ? '80px' : window.innerWidth <= 768 ? '100px' : '15vh',
          minHeight: '80px',
          background: 'linear-gradient(180deg, rgba(255, 140, 0, 0.9) 0%, rgba(255, 165, 0, 0.8) 70%, rgba(255, 140, 0, 0.6) 100%)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: window.innerWidth <= 768 ? '12px' : '0 40px'
        }}>
          {/* 로고 + 타이틀 (중앙) */}
          <Link to="/" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: window.innerWidth <= 480 ? '8px' : window.innerWidth <= 768 ? '12px' : '20px', 
            textDecoration: 'none',
            flexDirection: window.innerWidth <= 480 ? 'column' : 'row',
            textAlign: 'center',
            position: 'relative',
            top: window.innerWidth <= 480 ? '-8px' : window.innerWidth <= 768 ? '-12px' : '-15px'
          }}>
            <img 
              src="/images/logo/logo.png" 
              alt="Can Photo" 
              style={{ 
                height: window.innerWidth <= 480 ? '150px' : window.innerWidth <= 768 ? '180px' : '720px', 
                width: window.innerWidth <= 480 ? '150px' : window.innerWidth <= 768 ? '180px' : '720px',
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
              }}
            />
            <h1 style={{ 
              fontSize: window.innerWidth <= 480 ? '22px' : window.innerWidth <= 768 ? '28px' : '72px',
              fontWeight: '700', 
              color: 'white', 
              margin: 0, 
              letterSpacing: window.innerWidth <= 768 ? '0.5px' : '3px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              fontFamily: '"Noto Sans KR", sans-serif',
              lineHeight: '1.1',
              whiteSpace: window.innerWidth <= 480 ? 'nowrap' : 'normal'
            }}>
              깡통의 사진 갤러리
            </h1>
          </Link>

          {/* 햄버거 메뉴 (우상단) */}
          <nav style={{ 
            position: 'absolute', 
            top: window.innerWidth <= 480 ? '15px' : window.innerWidth <= 768 ? '20px' : '15px', 
            right: window.innerWidth <= 480 ? '12px' : window.innerWidth <= 768 ? '15px' : '30px' 
          }}>
            <button 
              id="hamburger-btn"
              style={{ 
                fontSize: window.innerWidth <= 480 ? '32px' : window.innerWidth <= 768 ? '40px' : '60px',
                color: 'white', 
                background: 'rgba(255, 140, 0, 0.8)', 
                border: '1px solid rgba(255,255,255,0.3)', 
                cursor: 'pointer',
                padding: window.innerWidth <= 480 ? '12px' : window.innerWidth <= 768 ? '16px' : '20px',
                borderRadius: '8px',
                transition: 'all 0.3s',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                minWidth: window.innerWidth <= 480 ? '56px' : '64px',
                minHeight: window.innerWidth <= 480 ? '56px' : '64px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 140, 0, 1)';
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 140, 0, 0.8)';
                e.target.style.transform = 'scale(1)';
              }}
              onClick={(e) => {
                const menu = document.getElementById('hamburger-menu');
                menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
              }}
            >
              ☰
            </button>
            <div 
              id="hamburger-menu"
              style={{
                position: 'absolute',
                right: 0,
                top: '100%',
                marginTop: '12px',
                width: window.innerWidth <= 768 ? '240px' : '280px',
                backgroundColor: 'rgba(0,0,0,0.95)',
                border: '2px solid #4a5568',
                borderRadius: '12px',
                overflow: 'hidden',
                display: 'none',
                backdropFilter: 'blur(15px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
              }}
            >
              <Link to="/" style={{ display: 'block', padding: '20px 28px', color: 'white', textDecoration: 'none', fontSize: '20px', borderBottom: '1px solid #2d3748' }} 
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.15)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                onClick={() => document.getElementById('hamburger-menu').style.display = 'none'}>
                🏠 홈
              </Link>
              <Link to="/archive" style={{ display: 'block', padding: '20px 28px', color: 'white', textDecoration: 'none', fontSize: '20px', borderBottom: '1px solid #2d3748' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.15)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                onClick={() => document.getElementById('hamburger-menu').style.display = 'none'}>
                📅 주간 아카이브
              </Link>
              <Link to="/daily" style={{ display: 'block', padding: '20px 28px', color: 'white', textDecoration: 'none', fontSize: '20px', borderBottom: '1px solid #2d3748' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.15)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                onClick={() => document.getElementById('hamburger-menu').style.display = 'none'}>
                📆 일자별
              </Link>
              <Link to="/theme" style={{ display: 'block', padding: '20px 28px', color: 'white', textDecoration: 'none', fontSize: '20px', borderBottom: '1px solid #2d3748' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.15)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                onClick={() => document.getElementById('hamburger-menu').style.display = 'none'}>
                🎨 주제별
              </Link>
              <Link to="/location" style={{ display: 'block', padding: '20px 28px', color: 'white', textDecoration: 'none', fontSize: '20px', borderBottom: '1px solid #2d3748' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.15)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                onClick={() => document.getElementById('hamburger-menu').style.display = 'none'}>
                📍 장소별
              </Link>
              <Link to="/admin" style={{ display: 'block', padding: '20px 28px', color: 'white', textDecoration: 'none', fontSize: '20px' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.15)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                onClick={() => document.getElementById('hamburger-menu').style.display = 'none'}>
                ⚙️ 관리자
              </Link>
            </div>
          </nav>
        </header>

        {/* 페이지 라우팅 */}
        <Routes>
          <Route path="/" element={<HeroSlide />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/daily" element={<Daily />} />
          <Route path="/theme" element={<Theme />} />
          <Route path="/location" element={<Location />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;