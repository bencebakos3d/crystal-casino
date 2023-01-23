import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Index from './pages/Index/Index';
import Roulette from './pages/Roulette/Roulette';
import Slots from './pages/Slots/Slots';
import Blackjack from './pages/Blackjack/Blackjack';

function App() {
  const url = 'https://casino-s2oy.onrender.com';
  // || 'http://localhost:3001';

  if (!document.cookie.match('SessionID')) {
    console.log('You got a nice cookie ');
    fetch(`${url}/api/setcookie`, {
      credentials: 'include',
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    }).then((response) => {
      console.log(response);
    });
  }

  return (
    <div className="App">
      <Router>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/roulette" element={<Roulette />} />
          <Route path="/slots" element={<Slots />} />
          <Route path="/blackjack" element={<Blackjack />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
