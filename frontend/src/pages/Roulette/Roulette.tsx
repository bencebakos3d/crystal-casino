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

  function betOnNumber(arr: number[]) {
    console.log('bet on ' + arr);
  }
  function betOnColor(str: string) {
    console.log('bet on color: ' + str);
  }

  return (
    <div className="page-wrapper">
      <div className="roulette-table-wrapper">
        <div className="roulette-wheel-wrapper">
          <img src={rouletteWheelImg} alt="" className="roulette-wheel" id="rouletteWheel" />
          <img src={rouletteBallImg} alt="" className="roulette-ball" />
        </div>
        <div className="roulette-table">
          <div className="zero-col" onClick={() => betOnNumber([0])}></div>
          <div className="normal-col">
            <div className="roulette-table-row-upper">
              <div className="roulette-table-row">
                <div onClick={() => betOnNumber([0, 3])}></div>
                <div onClick={() => betOnNumber([3])}></div>
                <div onClick={() => betOnNumber([3, 6])}></div>
                <div onClick={() => betOnNumber([6])}></div>
                <div onClick={() => betOnNumber([6, 9])}></div>
                <div onClick={() => betOnNumber([9])}></div>
                <div onClick={() => betOnNumber([9, 12])}></div>
                <div onClick={() => betOnNumber([12])}></div>
                <div onClick={() => betOnNumber([12, 15])}></div>
                <div onClick={() => betOnNumber([15])}></div>
                <div onClick={() => betOnNumber([15, 18])}></div>
                <div onClick={() => betOnNumber([18])}></div>
                <div onClick={() => betOnNumber([18, 21])}></div>
                <div onClick={() => betOnNumber([21])}></div>
                <div onClick={() => betOnNumber([21, 24])}></div>
                <div onClick={() => betOnNumber([24])}></div>
                <div onClick={() => betOnNumber([24, 27])}></div>
                <div onClick={() => betOnNumber([27])}></div>
                <div onClick={() => betOnNumber([27, 30])}></div>
                <div onClick={() => betOnNumber([30])}></div>
                <div onClick={() => betOnNumber([30, 33])}></div>
                <div onClick={() => betOnNumber([33])}></div>
                <div onClick={() => betOnNumber([33, 36])}></div>
                <div onClick={() => betOnNumber([36])}></div>
              </div>
              <div className="roulette-table-row"></div>
              <div className="roulette-table-row"></div>
              <div className="roulette-table-row"></div>
              <div className="roulette-table-row"></div>
            </div>
            <div className="roulette-table-row-lower">
              <div className="roulette-table-row-thirds">
                <div onClick={() => betOnNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])}></div>
                <div></div>
                <div></div>
              </div>
              <div className="roulette-table-row-thirdHalves">
                <div></div>
                <div></div>
                <div onClick={() => betOnColor('red')}></div>
                <div onClick={() => betOnColor('black')}></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
          <div className="ending-col"></div>
        </div>
      </div>
      <button className="spin-btn" onClick={handleSpin}>
        SPIN
      </button>
    </div>
  );
}
