import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import './App.css';
import { QiankunProps } from './types';

interface AppProps extends QiankunProps {

}

// 动态设置路由基础路径
const basename = window.__POWERED_BY_QIANKUN__ ? '/react-app' : '/';

const App: React.FC<AppProps> = (props: AppProps) => {
  return (
    <Router basename={basename}>
      <div className="app-container">
        <header className="app-header">
          <h1>React 子应用 (TS)</h1>
          <nav className="app-nav">
            <Link to="/" className="nav-link">首页</Link>
            <Link to="/about" className="nav-link">关于</Link>
          </nav>
        </header>
        
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
