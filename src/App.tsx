import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Index from './pages/Index/Index';
import Roulette from './pages/Roulette/Roulette';
import Slots from './pages/Slots/Slots';

function App() {
  return (
    <div className="App">
      <Router>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/roulette" element={<Roulette />} />
          <Route path="/slots" element={<Slots />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
