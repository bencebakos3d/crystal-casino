import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Index from './pages/Index/Index';
import Roulette from './pages/Roulette/Roulette';

function App() {
  const url = process.env.REACT_APP_BACKEND_URL;

  if (!document.cookie.match('connect.sid')) {
    localStorage.setItem('user-balance', '2000');
    console.log('You got a nice cookie ');
    fetch(`${url}/setcookie`, {
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
