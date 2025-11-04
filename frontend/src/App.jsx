import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import PayCallback from './pages/PayCallback';

export default function App() {
  return (
    <div className="site">
      <header className="site-header">
        <h1>Ocean Crown</h1>
        <nav><Link to="/">Shop</Link></nav>
      </header>
      <main className="site-main">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/pay/callback" element={<PayCallback />} />
        </Routes>
      </main>
    </div>
  );
}
