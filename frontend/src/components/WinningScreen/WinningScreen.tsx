import React from 'react';
import winningVideo from './video/falling_coins.mp4';
import './WinningScreen.modules.css';

interface WinningScreenProps {
  prize: number;
  handleClick: any;
  number: number;
}

export default function WinningScreen({ prize, handleClick, number }: WinningScreenProps) {
  const RouletteReds = [32, 19, 21, 25, 34, 27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3];

  const numberDisplay = <div className={`number-display ${number === 0 ? 'number-green' : RouletteReds.includes(number) ? 'number-red' : 'number-black'}`}>{number}</div>;

  return (
    <div className="screen-wrapper " onClick={handleClick}>
      {prize > 0 ? (
        <div className="winning">
          <div className="winning-text">
            <h1>WINNER!</h1>
            <h2>+ $ {prize}</h2>
          </div>
          {numberDisplay}
          <p className="continue-text">Click to continue</p>
          <video preload="auto" autoPlay muted loop id="myVideo">
            <source src={winningVideo} type="video/mp4" />
          </video>
        </div>
      ) : (
        <div className="losing">
          {numberDisplay}
          <p className="continue-text">Click to continue</p>
        </div>
      )}
    </div>
  );
}

// setShowWinning(false);
// setBettingActive(true)
