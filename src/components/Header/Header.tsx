import { Link } from 'react-router-dom';
import './Header.css';
import headerImg from './images/diamond-logo.png';

export default function Header() {
  return (
    <div className="header-wrapper">
      <div className="header-logo">
        <img src={headerImg} alt="" />
      </div>
      <div className="header">
        <Link to="/" className="menu-button">
          HOME
        </Link>
        <Link to="/" className="menu-button">
          ROULETTE
        </Link>
        <Link to="/" className="menu-button">
          SLOTS
        </Link>
        <Link to="/" className="menu-button">
          BLACKJACK
        </Link>
      </div>
    </div>
  );
}
