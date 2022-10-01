import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Header.modules.css';
import headerImg from './images/diamond-logo.png';

export default function Header() {
  const { pathname } = useLocation();

  return (
    <div className="header-wrapper">
      <div className="header-logo">
        <img src={headerImg} alt="" />
      </div>
      <div className="header">
        <NavLink to="/" className="menu-button">
          HOME
        </NavLink>
        <NavLink to="/roulette" className="menu-button">
          ROULETTE
        </NavLink>
        <NavLink to="/slots" className="menu-button">
          SLOTS
        </NavLink>
        <NavLink to="/blackjack" className="menu-button">
          BLACKJACK
        </NavLink>
      </div>
    </div>
  );
}
