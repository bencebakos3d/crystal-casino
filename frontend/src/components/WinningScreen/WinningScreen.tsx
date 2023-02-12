import { type } from 'os';
import React from 'react';
import winningVideo from './video/falling_coins.mp4';
import './WinningScreen.modules.css';

interface WinningScreenProps {
  prize: number;
  handleClick: any;
}

export default function WinningScreen({ prize, handleClick }: WinningScreenProps) {
  console.log(typeof handleClick);
  return (
    <div className="winning-screen " onClick={handleClick}>
      <h1>WINNER!</h1>
      <h2>+ $ {prize}</h2>
      <p>Click to continue</p>
      <video preload="auto" autoPlay muted loop id="myVideo">
        <source src={winningVideo} type="video/mp4" />
      </video>
    </div>
  );
}

// setShowWinning(false);
// setBettingActive(true)
