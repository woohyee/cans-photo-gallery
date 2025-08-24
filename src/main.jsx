// 📄 src/main.jsx
// 애플리케이션 진입점
// - React 렌더링 시작
// - 전역 CSS 파일 임포트

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'  // ✅ Tailwind CSS 적용

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)