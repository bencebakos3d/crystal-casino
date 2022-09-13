import React from 'react';
import './Roulette.css';
import rouletteWheelImg from './images/roulette-wheel.png';
import rouletteBallImg from './images/roulette-ball.png';

export default function Roulette() {
  function spinRoulette(angle: number, time: number): void {
    let wheel = document.getElementById('rouletteWheel') as HTMLElement;
    wheel.style.transform = 'rotate(' + angle + 'deg)';
    wheel.style.transitionDuration = time.toString() + 'ms';
    wheel.style.transitionProperty = 'all';
    console.log('You clicked submit.');
  }

  function handleSpin(): void {
    spinRoulette(370, 2000);
    setTimeout(() => spinRoulette(0, 0), 2000);
  }

  return (
    <div className="page-wrapper">
      <div className="roulette-table-wrapper">
        <div className="roulette-wheel-wrapper">
          <img src={rouletteWheelImg} alt="" className="roulette-wheel" id="rouletteWheel" />
          <img src={rouletteBallImg} alt="" className="roulette-ball" />
        </div>
        <div className="roulette-table"></div>
      </div>
      <button className="spin-btn" onClick={handleSpin}>
        SPIN
      </button>
    </div>
  );
}
