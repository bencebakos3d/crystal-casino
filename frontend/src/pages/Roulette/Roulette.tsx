import React from 'react';
import './Roulette.css';
import rouletteWheelImg from './images/roulette-wheel.png';
import rouletteBallImg from './images/roulette-ball.png';

export default function Roulette() {
  function spinRoulette() {}

  return (
    <div className="page-wrapper">
      <div className="roulette-table-wrapper">
        <div className="roulette-wheel-wrapper">
          <img src={rouletteWheelImg} alt="" className="roulette-wheel" />
          <img src={rouletteBallImg} alt="" className="roulette-ball" />
        </div>
        <div className="roulette-table"></div>
      </div>
    </div>
  );
}
