// 📄 src/App.jsx
// 메인 애플리케이션 컴포넌트
// - 전체 화면 기반 사진 갤러리
// - 햄버거 메뉴 + React Router 라우팅
// - 모든 UI 텍스트: 한국어

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';          // 네비게이션 바
import HeroSlide from './components/HeroSlide/HeroSlide';  // 전체 슬라이드
import Archive from './pages/Archive/Archive';            // 주간 아카이브
import Daily from './pages/Daily/Daily';                  // 일자별
import Theme from './pages/Theme/Theme';                  // 주제별
import Location from './pages/Location/Location';         // 장소별
import Admin from './pages/Admin/Admin';                  // 관리자

function App() {
  return (
    <Router basename="/">
      <div style={{width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden'}}>
        
        {/* 새로운 Navbar 컴포넌트 */}
        <Navbar />

        {/* 페이지 라우팅 */}
        <div style={{paddingTop: '80px', height: '100%'}}>
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
      </div>
    </Router>
  );
}

export default App;