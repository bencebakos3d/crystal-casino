import React from 'react';
import './Roulette.css';
import rouletteWheelImg from './images/roulette-wheel.png';

export default function Roulette() {
  function spinRoulette() {}

  return (
    <div className="page-wrapper">
      <div className="roulette-table-wrapper">
        <img src={rouletteWheelImg} alt="" className="roulette-wheel" />
        <div className="roulette-table"></div>
      </div>
    </div>
  );
}
