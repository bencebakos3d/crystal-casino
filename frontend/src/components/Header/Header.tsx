import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Header.modules.css';
import headerImg from './images/crystal-logo.png';

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
      </div>
    </div>
  );
}
