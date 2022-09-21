import React from 'react';
import './RouletteGame.modules.css';
import rouletteWheelImg from './images/roulette-wheel.png';
import rouletteBallImg from './images/roulette-ball.png';

export default function RouletteGame() {
  const url = 'http://localhost:3001/api';
  //
  // Spins roulette wheel and ball
  //
  function spinRoulette(angle: number): void {
    //
    // Total time of roulette animation
    //
    const animationDuration = '3000ms';

    const wheel = document.getElementById('rouletteWheel') as HTMLElement;
    const ball = document.getElementById('rouletteBall') as HTMLElement;
    wheel.style.transitionProperty = 'all';

    ball.style.transform = 'rotate(' + (angle + 720) + 'deg)';
    ball.style.transitionDuration = animationDuration;
    ball.style.transitionProperty = 'all';

    wheel.style.transform = 'rotate(-720deg)';
    wheel.style.transitionDuration = animationDuration;

    //
    // Resets the roulette wheel and ball
    //
    setTimeout(() => {
      wheel.style.transform = 'rotate(0deg)';
      wheel.style.transitionDuration = '0ms';
      ball.style.transform = 'rotate(0deg)';
      ball.style.transitionDuration = '0ms';
    }, 3500);
  }

  const RouletteFields = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];
  //
  // Sends chosen numbers and bets to the backend, returns the random number and the amount of money the player has
  //
  function handleSpin(): void {
    fetch(`${url}/spinRoulette`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        numbers: allNumbers,
        bets: allBets,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          let returnedNumber = 20;

          for (let i = 0; i < RouletteFields.length; i++) {
            if (returnedNumber == RouletteFields[i]) {
              let rouletteAngle = 10 * i - 5;
              spinRoulette(rouletteAngle);
            }
          }
          console.log(response.json());
        } else {
          console.log('Spin unsuccesful');
          return response.json();
        }
      })
      .catch((err) => {
        console.log(err);
        console.log('Server unavailable');
      });
  }

  let allNumbers: number[][] = [];
  let allBets: number[] = [];
  function betOnNumber(arr: number[]) {
    allNumbers.push(arr);
    allBets.push(100);
    console.log('bet on ' + arr);
  }
  return (
    <div>
      <div className="roulette-table-wrapper">
        <div className="roulette-wheel-wrapper">
          <img src={rouletteWheelImg} alt="" className="roulette-wheel" id="rouletteWheel" />
          <img src={rouletteBallImg} alt="" className="roulette-ball" id="rouletteBall" />
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
              <div className="roulette-table-row">
                <div onClick={() => betOnNumber([0, 2, 3])}></div>
                <div onClick={() => betOnNumber([2, 3])}></div>
                <div onClick={() => betOnNumber([2, 3, 5, 6])}></div>
                <div onClick={() => betOnNumber([5, 6])}></div>
                <div onClick={() => betOnNumber([5, 6, 8, 9])}></div>
                <div onClick={() => betOnNumber([8, 9])}></div>
                <div onClick={() => betOnNumber([8, 9, 11, 12])}></div>
                <div onClick={() => betOnNumber([11, 12])}></div>
                <div onClick={() => betOnNumber([11, 12, 14, 15])}></div>
                <div onClick={() => betOnNumber([14, 15])}></div>
                <div onClick={() => betOnNumber([14, 15, 17, 18])}></div>
                <div onClick={() => betOnNumber([17, 18])}></div>
                <div onClick={() => betOnNumber([17, 18, 20, 21])}></div>
                <div onClick={() => betOnNumber([20, 21])}></div>
                <div onClick={() => betOnNumber([20, 21, 23, 24])}></div>
                <div onClick={() => betOnNumber([23, 24])}></div>
                <div onClick={() => betOnNumber([23, 24, 26, 27])}></div>
                <div onClick={() => betOnNumber([26, 27])}></div>
                <div onClick={() => betOnNumber([26, 27, 29, 30])}></div>
                <div onClick={() => betOnNumber([29, 30])}></div>
                <div onClick={() => betOnNumber([29, 30, 32, 33])}></div>
                <div onClick={() => betOnNumber([32, 33])}></div>
                <div onClick={() => betOnNumber([32, 33, 35, 36])}></div>
                <div onClick={() => betOnNumber([35, 36])}></div>
              </div>
              <div className="roulette-table-row">
                <div onClick={() => betOnNumber([0, 2])}></div>
                <div onClick={() => betOnNumber([2])}></div>
                <div onClick={() => betOnNumber([2, 5])}></div>
                <div onClick={() => betOnNumber([5])}></div>
                <div onClick={() => betOnNumber([5, 8])}></div>
                <div onClick={() => betOnNumber([8])}></div>
                <div onClick={() => betOnNumber([8, 11])}></div>
                <div onClick={() => betOnNumber([11])}></div>
                <div onClick={() => betOnNumber([11, 14])}></div>
                <div onClick={() => betOnNumber([14])}></div>
                <div onClick={() => betOnNumber([14, 17])}></div>
                <div onClick={() => betOnNumber([17])}></div>
                <div onClick={() => betOnNumber([17, 20])}></div>
                <div onClick={() => betOnNumber([20])}></div>
                <div onClick={() => betOnNumber([20, 23])}></div>
                <div onClick={() => betOnNumber([23])}></div>
                <div onClick={() => betOnNumber([23, 26])}></div>
                <div onClick={() => betOnNumber([26])}></div>
                <div onClick={() => betOnNumber([26, 29])}></div>
                <div onClick={() => betOnNumber([29])}></div>
                <div onClick={() => betOnNumber([29, 32])}></div>
                <div onClick={() => betOnNumber([32])}></div>
                <div onClick={() => betOnNumber([32, 35])}></div>
                <div onClick={() => betOnNumber([35])}></div>
              </div>
              <div className="roulette-table-row">
                <div onClick={() => betOnNumber([0, 2, 1])}></div>
                <div onClick={() => betOnNumber([1, 2])}></div>
                <div onClick={() => betOnNumber([1, 2, 4, 5])}></div>
                <div onClick={() => betOnNumber([4, 5])}></div>
                <div onClick={() => betOnNumber([4, 5, 7, 8])}></div>
                <div onClick={() => betOnNumber([7, 8])}></div>
                <div onClick={() => betOnNumber([7, 8, 10, 11])}></div>
                <div onClick={() => betOnNumber([10, 11])}></div>
                <div onClick={() => betOnNumber([10, 11, 13, 14])}></div>
                <div onClick={() => betOnNumber([13, 14])}></div>
                <div onClick={() => betOnNumber([13, 14, 16, 17])}></div>
                <div onClick={() => betOnNumber([16, 17])}></div>
                <div onClick={() => betOnNumber([16, 17, 19, 20])}></div>
                <div onClick={() => betOnNumber([19, 20])}></div>
                <div onClick={() => betOnNumber([19, 20, 22, 23])}></div>
                <div onClick={() => betOnNumber([22, 23])}></div>
                <div onClick={() => betOnNumber([22, 23, 25, 26])}></div>
                <div onClick={() => betOnNumber([25, 26])}></div>
                <div onClick={() => betOnNumber([25, 26, 28, 29])}></div>
                <div onClick={() => betOnNumber([28, 29])}></div>
                <div onClick={() => betOnNumber([28, 29, 31, 32])}></div>
                <div onClick={() => betOnNumber([31, 32])}></div>
                <div onClick={() => betOnNumber([31, 32, 34, 35])}></div>
                <div onClick={() => betOnNumber([34, 35])}></div>
              </div>
              <div className="roulette-table-row">
                <div onClick={() => betOnNumber([0, 1])}></div>
                <div onClick={() => betOnNumber([1])}></div>
                <div onClick={() => betOnNumber([1, 4])}></div>
                <div onClick={() => betOnNumber([4])}></div>
                <div onClick={() => betOnNumber([4, 7])}></div>
                <div onClick={() => betOnNumber([7])}></div>
                <div onClick={() => betOnNumber([7, 10])}></div>
                <div onClick={() => betOnNumber([10])}></div>
                <div onClick={() => betOnNumber([10, 13])}></div>
                <div onClick={() => betOnNumber([13])}></div>
                <div onClick={() => betOnNumber([13, 16])}></div>
                <div onClick={() => betOnNumber([16])}></div>
                <div onClick={() => betOnNumber([16, 19])}></div>
                <div onClick={() => betOnNumber([19])}></div>
                <div onClick={() => betOnNumber([19, 22])}></div>
                <div onClick={() => betOnNumber([22])}></div>
                <div onClick={() => betOnNumber([22, 25])}></div>
                <div onClick={() => betOnNumber([25])}></div>
                <div onClick={() => betOnNumber([25, 28])}></div>
                <div onClick={() => betOnNumber([28])}></div>
                <div onClick={() => betOnNumber([28, 31])}></div>
                <div onClick={() => betOnNumber([31])}></div>
                <div onClick={() => betOnNumber([31, 34])}></div>
                <div onClick={() => betOnNumber([34])}></div>
              </div>
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
                <div onClick={() => betOnNumber([1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35])}></div>
                <div onClick={() => betOnNumber([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36])}></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
          <div className="ending-col">
            <div onClick={() => betOnNumber([3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36])}></div>
            <div onClick={() => betOnNumber([2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35])}></div>
            <div onClick={() => betOnNumber([1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34])}></div>
          </div>
        </div>
      </div>
      <button className="spin-btn large-button" onClick={handleSpin}>
        SPIN
      </button>
    </div>
  );
}
