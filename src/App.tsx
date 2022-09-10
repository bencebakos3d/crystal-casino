import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Index from './pages/Index/Index';
import Roulette from './pages/Roulette/Roulette';

function App() {
  return (
    <div className="App">
      <Router>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/roulette" element={<Roulette />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
