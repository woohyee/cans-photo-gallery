import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../../hooks/useDarkMode';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isDarkMode, toggleDarkMode] = useDarkMode();

  // 스크롤 감지 및 윈도우 크기 감지
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navbarStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '80px',
    zIndex: 2000,
    transition: 'all 0.3s ease',
    backgroundColor: isScrolled
      ? (isDarkMode ? 'rgba(17, 24, 39, 0.9)' : 'rgba(255, 255, 255, 0.9)')
      : (isDarkMode ? 'rgba(17, 24, 39, 0.8)' : 'rgba(255, 255, 255, 0.8)'),
    backdropFilter: 'blur(12px)',
    boxShadow: isScrolled ? '0 2px 4px -1px rgba(0, 0, 0, 0.1)' : 'none',
  };

  const containerStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: windowWidth < 768 ? '0 12px' : '0 16px',
    height: '100%',
    position: 'relative',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '80px',
    padding: '0',
  };

  const logoContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: windowWidth < 768 ? '8px' : '16px',
    textDecoration: 'none',
    transition: 'opacity 0.3s ease',
    flex: 1,
    minWidth: 0,
  };

  const logoStyle = {
    height: windowWidth < 768 ? '40px' : '56px',
    width: windowWidth < 768 ? '40px' : '56px',
    filter: isDarkMode ? 'invert(1)' : 'none',
  };

  const titleStyle = {
    fontSize: windowWidth < 768 ? '18px' : '32px',
    fontWeight: 'bold',
    color: isDarkMode ? 'white' : '#1f2937',
    margin: 0,
    whiteSpace: 'nowrap',
    display: windowWidth < 480 ? 'none' : 'block',
  };

  const hamburgerButtonStyle = {
    width: windowWidth < 768 ? '48px' : '64px',
    height: windowWidth < 768 ? '48px' : '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '12px',
    backgroundColor: 'rgba(249, 115, 22, 0.2)',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    flexShrink: 0,
  };

  const hamburgerLineStyle = (index) => ({
    display: 'block',
    height: '3px',
    width: windowWidth < 768 ? '24px' : '36px',
    backgroundColor: isDarkMode ? 'white' : '#1f2937',
    transition: 'all 0.3s ease',
    transformOrigin: 'center',
    ...(isMenuOpen && index === 0 && { transform: 'rotate(45deg) translateY(6px)' }),
    ...(isMenuOpen && index === 1 && { opacity: 0 }),
    ...(isMenuOpen && index === 2 && { transform: 'rotate(-45deg) translateY(-6px)' }),
  });

  const mobileMenuStyle = {
    position: 'absolute',
    top: '80px',
    right: '16px',
    width: '200px',
    maxHeight: isMenuOpen ? '350px' : '0',
    opacity: isMenuOpen ? 1 : 0,
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    zIndex: 1000,
  };

  const mobileMenuContainerStyle = {
    padding: '12px',
    backgroundColor: isDarkMode ? 'rgba(17, 24, 39, 0.95)' : 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(12px)',
    borderRadius: '8px',
    boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1)',
    border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
  };

  const mobileLinkStyle = {
    display: 'block',
    padding: '8px 12px',
    color: isDarkMode ? 'white' : '#1f2937',
    textDecoration: 'none',
    borderRadius: '6px',
    transition: 'background-color 0.3s ease',
    marginBottom: '2px',
    fontSize: '14px',
    whiteSpace: 'nowrap',
  };

  return (
    <nav style={navbarStyle}>
      <div style={containerStyle}>
        <div style={headerStyle}>
          {/* 좌측: 로고 + 타이틀 */}
          <Link
            to="/"
            style={logoContainerStyle}
            onClick={closeMenu}
            onMouseEnter={(e) => e.target.style.opacity = '0.8'}
            onMouseLeave={(e) => e.target.style.opacity = '1'}
          >
            <img
              src="/images/logo/logo.png"
              alt="Can Photo"
              style={logoStyle}
            />
            <h1 style={titleStyle}>
              깡통의 사진 갤러리
            </h1>
          </Link>

          {/* 햄버거 메뉴 버튼 */}
          <button
            onClick={toggleMenu}
            style={hamburgerButtonStyle}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(249, 115, 22, 0.3)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(249, 115, 22, 0.2)'}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: windowWidth < 768 ? '4px' : '6px' }}>
              <span style={hamburgerLineStyle(0)} />
              <span style={hamburgerLineStyle(1)} />
              <span style={hamburgerLineStyle(2)} />
            </div>
          </button>
        </div>

        {/* 햄버거 메뉴 드롭다운 */}
        <div style={mobileMenuStyle}>
          <div style={mobileMenuContainerStyle}>
            <Link
              to="/"
              style={mobileLinkStyle}
              onClick={closeMenu}
              onMouseEnter={(e) => e.target.style.backgroundColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              🏠 홈
            </Link>
            <Link
              to="/archive"
              style={mobileLinkStyle}
              onClick={closeMenu}
              onMouseEnter={(e) => e.target.style.backgroundColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              📅 주간 아카이브
            </Link>
            <Link
              to="/daily"
              style={mobileLinkStyle}
              onClick={closeMenu}
              onMouseEnter={(e) => e.target.style.backgroundColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              📆 일자별
            </Link>
            <Link
              to="/theme"
              style={mobileLinkStyle}
              onClick={closeMenu}
              onMouseEnter={(e) => e.target.style.backgroundColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              🎨 주제별
            </Link>
            <Link
              to="/location"
              style={mobileLinkStyle}
              onClick={closeMenu}
              onMouseEnter={(e) => e.target.style.backgroundColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              📍 장소별
            </Link>
            <Link
              to="/admin"
              style={mobileLinkStyle}
              onClick={closeMenu}
              onMouseEnter={(e) => e.target.style.backgroundColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              ⚙️ 관리자
            </Link>

            <div style={{ height: '1px', backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)', margin: '8px 0' }} />

            <button
              onClick={() => {
                toggleDarkMode();
                closeMenu();
              }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                color: isDarkMode ? 'white' : '#1f2937',
                fontSize: '14px'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              <span>다크모드</span>
              <span style={{ fontSize: '16px' }}>{isDarkMode ? '☀️' : '🌙'}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;