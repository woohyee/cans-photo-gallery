import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../../hooks/useDarkMode';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, toggleDarkMode] = useDarkMode();

  // 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-sky-100/80 dark:bg-sky-900/80 backdrop-blur-md shadow-md' 
        : 'bg-sky-100/90 dark:bg-sky-900/90'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 lg:h-24">
          
          {/* 좌측: 로고 + 타이틀 */}
          <Link 
            to="/" 
            className="flex flex-col items-center space-y-1 hover:opacity-80 transition-opacity"
            onClick={closeMenu}
          >
            <img 
              src="/images/logo/logo.png" 
              alt="Can Photo" 
              className="h-8 w-8 lg:h-10 lg:w-10 filter dark:invert mt-1"
            />
            <h1 className="text-sm lg:text-lg font-bold text-gray-800 dark:text-white whitespace-nowrap">
              깡통의 사진 갤러리
            </h1>
          </Link>

          {/* 데스크탑 메뉴 */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-800 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
            >
              🏠 홈
            </Link>
            <Link 
              to="/archive" 
              className="text-gray-800 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
            >
              📅 주간 아카이브
            </Link>
            <Link 
              to="/daily" 
              className="text-gray-800 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
            >
              📆 일자별
            </Link>
            <Link 
              to="/theme" 
              className="text-gray-800 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
            >
              🎨 주제별
            </Link>
            <Link 
              to="/location" 
              className="text-gray-800 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
            >
              📍 장소별
            </Link>
            <Link 
              to="/admin" 
              className="text-gray-800 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
            >
              ⚙️ 관리자
            </Link>
            

          </div>

          {/* 우측: 다크모드 토글 + 햄버거 버튼 */}
          <div className="flex items-center space-x-3">
            {/* 다크모드 토글 (모바일에서도 표시) */}
            <button
              onClick={toggleDarkMode}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-sky-200 dark:bg-sky-700 hover:bg-sky-300 dark:hover:bg-sky-600 transition-colors"
              aria-label="다크모드 토글"
            >
              <span className="text-lg">{isDarkMode ? '☀️' : '🌙'}</span>
            </button>

            {/* 햄버거 버튼 */}
            <button
              onClick={toggleMenu}
              className="lg:hidden relative w-12 h-12 flex items-center justify-center rounded-lg bg-sky-200 dark:bg-sky-700 hover:bg-sky-300 dark:hover:bg-sky-600 transition-colors touch-manipulation"
              aria-label="메뉴 열기/닫기"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
                <span className={`block h-0.5 w-6 bg-gray-800 dark:bg-white transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                }`} />
                <span className={`block h-0.5 w-6 bg-gray-800 dark:bg-white transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`} />
                <span className={`block h-0.5 w-6 bg-gray-800 dark:bg-white transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`} />
              </div>
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 space-y-2 bg-sky-100/95 dark:bg-sky-900/95 backdrop-blur-md rounded-lg mt-2 shadow-lg">
            <Link 
              to="/" 
              className="block px-4 py-3 text-gray-800 dark:text-white hover:bg-orange-500/10 hover:text-orange-500 dark:hover:text-orange-400 transition-colors rounded-lg mx-2"
              onClick={closeMenu}
            >
              🏠 홈
            </Link>
            <Link 
              to="/archive" 
              className="block px-4 py-3 text-gray-800 dark:text-white hover:bg-orange-500/10 hover:text-orange-500 dark:hover:text-orange-400 transition-colors rounded-lg mx-2"
              onClick={closeMenu}
            >
              📅 주간 아카이브
            </Link>
            <Link 
              to="/daily" 
              className="block px-4 py-3 text-gray-800 dark:text-white hover:bg-orange-500/10 hover:text-orange-500 dark:hover:text-orange-400 transition-colors rounded-lg mx-2"
              onClick={closeMenu}
            >
              📆 일자별
            </Link>
            <Link 
              to="/theme" 
              className="block px-4 py-3 text-gray-800 dark:text-white hover:bg-orange-500/10 hover:text-orange-500 dark:hover:text-orange-400 transition-colors rounded-lg mx-2"
              onClick={closeMenu}
            >
              🎨 주제별
            </Link>
            <Link 
              to="/location" 
              className="block px-4 py-3 text-gray-800 dark:text-white hover:bg-orange-500/10 hover:text-orange-500 dark:hover:text-orange-400 transition-colors rounded-lg mx-2"
              onClick={closeMenu}
            >
              📍 장소별
            </Link>
            <Link 
              to="/admin" 
              className="block px-4 py-3 text-gray-800 dark:text-white hover:bg-orange-500/10 hover:text-orange-500 dark:hover:text-orange-400 transition-colors rounded-lg mx-2"
              onClick={closeMenu}
            >
              ⚙️ 관리자
            </Link>
            
            {/* 모바일 메뉴의 다크모드 토글 */}
            <div className="mx-2 px-4 py-3">
              <button
                onClick={toggleDarkMode}
                className="w-full flex items-center justify-between p-2 rounded-lg bg-sky-200 dark:bg-sky-800 hover:bg-sky-300 dark:hover:bg-sky-700 transition-colors"
                aria-label="다크모드 토글"
              >
                <span className="text-gray-800 dark:text-white">다크모드</span>
                <span>{isDarkMode ? '☀️' : '🌙'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;