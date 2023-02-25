import React from 'react';
import './RouletteGame.css';
import rouletteWheelImg from './images/roulette-wheel.png';
import rouletteBallImg from './images/roulette-ball.png';
import { useState, useEffect } from 'react';
import WinningScreen from '../WinningScreen/WinningScreen';

export default function RouletteGame() {
  const [allNumbers, setAllNumbers] = useState<number[][]>([]);
  const [allBets, setAllBets] = useState<number[]>([]);
  const [value, setValue] = useState(1);
  const [balance, setBalance] = useState(2000);
  const [showWinning, setShowWinning] = useState(false);
  const [bettingActive, setBettingActive] = useState(true);
  const [prize, setPrize] = useState(0);
  const [pastNumbers, setPastNumbers] = useState<number[]>([]);

  const userBalance = localStorage.getItem('user-balance');

  useEffect(() => {
    if (userBalance === null) {
      localStorage.setItem('user-balance', balance.toString());
    } else {
      if (parseInt(userBalance) !== balance) {
        setBalance(parseInt(userBalance));
      }
    }
  }, []);

  // Sets the duration of the wheel spinning animation in millisecons
  const animationDuration = 5000;

  const url = process.env.REACT_APP_BACKEND_URL;

  // Spins roulette wheel and ball
  function spinRoulette(angle: number): void {
    const wheel = document.getElementById('rouletteWheel') as HTMLElement;
    const ball = document.getElementById('rouletteBall') as HTMLElement;
    wheel.style.transitionProperty = 'all';

    ball.style.transform = 'rotate(' + (angle + 720) + 'deg)';
    ball.style.transition = `transform 5000ms, opacity 300ms`;
    ball.style.opacity = '1';

    wheel.style.transform = 'rotate(-720deg)';
    wheel.style.transitionDuration = animationDuration + 'ms';

    //
    // Resets the roulette wheel and ball
    //
    setTimeout(() => {
      wheel.style.transform = 'rotate(0deg)';
      wheel.style.transitionDuration = '0ms';
      ball.style.transform = 'rotate(0deg)';
      ball.style.transition = 'transform 0ms, opcaity 0ms';
      ball.style.opacity = '0';
    }, 7000);
  }

  const betOnNumber = (event: React.SyntheticEvent, arr: number[]) => {
    if (bettingActive) {
      console.log(event.currentTarget);
      event.currentTarget.classList.add(`bet-${value}`);
      if (balance - value >= 0) {
        setAllNumbers((current) => [...current, arr]);
        setAllBets((current) => [...current, value]);
        setBalance((prevbalance) => prevbalance - value);
      } else {
        alert("You don't have the money");
      }
    }
  };
  const RouletteFields = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];
  const RouletteReds = [32, 19, 21, 25, 34, 27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3];

  // Sends chosen numbers and bets to the backend, returns the random number and the amount of money the player has
  function handleSpin(): void {
    if (bettingActive === false || allBets.length === 0 || allNumbers.length === 0) {
      alert('There are no bets.');
      return;
    }
    setBettingActive(false);
    setTimeout(() => {
      removeBets();
    }, animationDuration + 500);
    setAllNumbers([]);
    setAllBets([]);

    // Sends all bets and numbers to the backend
    fetch(`${url}/api/spinRoulette`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        numbers: allNumbers,
        bets: allBets,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        let returnedNumber = parseInt(data.winnerNumber);
        let userBalance = data.balance;
        let prize = data.prize;
        setPrize(prize);
        console.log(data.balance);

        for (let i = 0; i < RouletteFields.length; i++) {
          if (returnedNumber === RouletteFields[i]) {
            let rouletteAngle = (360 / 37) * i;
            spinRoulette(rouletteAngle);
            setTimeout(() => {
              setBalance(userBalance);
              setShowWinning(true);
              localStorage.setItem('user-balance', userBalance.toString());
            }, animationDuration + 700);
          }
        }
        console.log(data);

        // Adds the number to the list of past numbers
        setTimeout(() => {
          if (pastNumbers.length < 10) {
            setPastNumbers((current) => [...current, returnedNumber]);
          } else {
            const pastNumbersList: number[] = pastNumbers;
            pastNumbersList.shift();
            pastNumbersList.push(returnedNumber);
            setPastNumbers(pastNumbersList);
          }
        }, animationDuration + 700);
      })
      .catch((err) => {
        console.log(err);
        console.log('Server unavailable');
      });
  }

  // Resets all active bets
  function removeBets(): void {
    let divs = document.querySelectorAll('.bet-1, .bet-5, .bet-25, .bet-100, .bet-500');
    divs.forEach((div) => {
      div.classList.remove('bet-1', 'bet-5', 'bet-25', 'bet-100', 'bet-500');
    });
    setAllBets([]);
    setAllNumbers([]);
  }

  // Creates DOM for every past number (max. 10)
  const pastItems = pastNumbers.map((number, index) => (
    <div key={index} className="pastnumber-wrapper">
      <div key={number} className={`${number === 0 ? 'pastnumber-green' : RouletteReds.includes(number) ? 'pastnumber-red' : 'pastnumber-black'}`}>
        {number}
      </div>
    </div>
  ));

  return (
    <div className="main-wrapper">
      <div className="roulette-table-border">
        <div className="roulette-table-wrapper">
          {showWinning ? (
            <WinningScreen
              prize={prize}
              handleClick={() => {
                setShowWinning(false);
                setBettingActive(true);
              }}
              number={pastNumbers[pastNumbers.length - 1]}
            />
          ) : null}

          <div className="roulette-wheel-wrapper">
            <img src={rouletteWheelImg} alt="" className="roulette-wheel" id="rouletteWheel" />
            <img src={rouletteBallImg} alt="" className="roulette-ball" id="rouletteBall" style={{ opacity: 0 }} />
          </div>
          <div className="roulette-right">
            <div className="roulette-numbers">{pastItems}</div>
            <div className="roulette-fields">
              <div className="zero-col" onClick={(event) => betOnNumber(event, [0])}></div>
              <div className="normal-col">
                <div className="roulette-table-row-upper">
                  <div className="roulette-table-row">
                    <div onClick={(event) => betOnNumber(event, [0, 1, 2, 3])}></div>
                    <div onClick={(event) => betOnNumber(event, [1, 2, 3])}></div>
                    <div onClick={(event) => betOnNumber(event, [1, 2, 3, 4, 5, 6])}></div>
                    <div onClick={(event) => betOnNumber(event, [4, 5, 6])}></div>
                    <div onClick={(event) => betOnNumber(event, [4, 5, 6, 7, 8, 9])}></div>
                    <div onClick={(event) => betOnNumber(event, [7, 8, 9])}></div>
                    <div onClick={(event) => betOnNumber(event, [7, 8, 9, 10, 11, 12])}></div>
                    <div onClick={(event) => betOnNumber(event, [10, 11, 12])}></div>
                    <div onClick={(event) => betOnNumber(event, [10, 11, 12, 13, 14, 15])}></div>
                    <div onClick={(event) => betOnNumber(event, [13, 14, 15])}></div>
                    <div onClick={(event) => betOnNumber(event, [13, 14, 15, 16, 17, 18])}></div>
                    <div onClick={(event) => betOnNumber(event, [16, 17, 18])}></div>
                    <div onClick={(event) => betOnNumber(event, [16, 17, 18, 19, 20, 21])}></div>
                    <div onClick={(event) => betOnNumber(event, [19, 20, 21])}></div>
                    <div onClick={(event) => betOnNumber(event, [19, 20, 21, 22, 23, 24])}></div>
                    <div onClick={(event) => betOnNumber(event, [22, 23, 24])}></div>
                    <div onClick={(event) => betOnNumber(event, [22, 23, 24, 25, 26, 27])}></div>
                    <div onClick={(event) => betOnNumber(event, [25, 26, 27])}></div>
                    <div onClick={(event) => betOnNumber(event, [25, 26, 27, 28, 29, 30])}></div>
                    <div onClick={(event) => betOnNumber(event, [28, 29, 30])}></div>
                    <div onClick={(event) => betOnNumber(event, [28, 29, 30, 31, 32, 33])}></div>
                    <div onClick={(event) => betOnNumber(event, [31, 32, 33])}></div>
                    <div onClick={(event) => betOnNumber(event, [31, 32, 33, 34, 35, 36])}></div>
                    <div onClick={(event) => betOnNumber(event, [34, 35, 36])}></div>
                  </div>
                  <div className="roulette-table-row">
                    <div onClick={(event) => betOnNumber(event, [0, 3])}></div>
                    <div onClick={(event) => betOnNumber(event, [3])}></div>
                    <div onClick={(event) => betOnNumber(event, [3, 6])}></div>
                    <div onClick={(event) => betOnNumber(event, [6])}></div>
                    <div onClick={(event) => betOnNumber(event, [6, 9])}></div>
                    <div onClick={(event) => betOnNumber(event, [9])}></div>
                    <div onClick={(event) => betOnNumber(event, [9, 12])}></div>
                    <div onClick={(event) => betOnNumber(event, [12])}></div>
                    <div onClick={(event) => betOnNumber(event, [12, 15])}></div>
                    <div onClick={(event) => betOnNumber(event, [15])}></div>
                    <div onClick={(event) => betOnNumber(event, [15, 18])}></div>
                    <div onClick={(event) => betOnNumber(event, [18])}></div>
                    <div onClick={(event) => betOnNumber(event, [18, 21])}></div>
                    <div onClick={(event) => betOnNumber(event, [21])}></div>
                    <div onClick={(event) => betOnNumber(event, [21, 24])}></div>
                    <div onClick={(event) => betOnNumber(event, [24])}></div>
                    <div onClick={(event) => betOnNumber(event, [24, 27])}></div>
                    <div onClick={(event) => betOnNumber(event, [27])}></div>
                    <div onClick={(event) => betOnNumber(event, [27, 30])}></div>
                    <div onClick={(event) => betOnNumber(event, [30])}></div>
                    <div onClick={(event) => betOnNumber(event, [30, 33])}></div>
                    <div onClick={(event) => betOnNumber(event, [33])}></div>
                    <div onClick={(event) => betOnNumber(event, [33, 36])}></div>
                    <div onClick={(event) => betOnNumber(event, [36])}></div>
                  </div>
                  <div className="roulette-table-row">
                    <div onClick={(event) => betOnNumber(event, [0, 2, 3])}></div>
                    <div onClick={(event) => betOnNumber(event, [2, 3])}></div>
                    <div onClick={(event) => betOnNumber(event, [2, 3, 5, 6])}></div>
                    <div onClick={(event) => betOnNumber(event, [5, 6])}></div>
                    <div onClick={(event) => betOnNumber(event, [5, 6, 8, 9])}></div>
                    <div onClick={(event) => betOnNumber(event, [8, 9])}></div>
                    <div onClick={(event) => betOnNumber(event, [8, 9, 11, 12])}></div>
                    <div onClick={(event) => betOnNumber(event, [11, 12])}></div>
                    <div onClick={(event) => betOnNumber(event, [11, 12, 14, 15])}></div>
                    <div onClick={(event) => betOnNumber(event, [14, 15])}></div>
                    <div onClick={(event) => betOnNumber(event, [14, 15, 17, 18])}></div>
                    <div onClick={(event) => betOnNumber(event, [17, 18])}></div>
                    <div onClick={(event) => betOnNumber(event, [17, 18, 20, 21])}></div>
                    <div onClick={(event) => betOnNumber(event, [20, 21])}></div>
                    <div onClick={(event) => betOnNumber(event, [20, 21, 23, 24])}></div>
                    <div onClick={(event) => betOnNumber(event, [23, 24])}></div>
                    <div onClick={(event) => betOnNumber(event, [23, 24, 26, 27])}></div>
                    <div onClick={(event) => betOnNumber(event, [26, 27])}></div>
                    <div onClick={(event) => betOnNumber(event, [26, 27, 29, 30])}></div>
                    <div onClick={(event) => betOnNumber(event, [29, 30])}></div>
                    <div onClick={(event) => betOnNumber(event, [29, 30, 32, 33])}></div>
                    <div onClick={(event) => betOnNumber(event, [32, 33])}></div>
                    <div onClick={(event) => betOnNumber(event, [32, 33, 35, 36])}></div>
                    <div onClick={(event) => betOnNumber(event, [35, 36])}></div>
                  </div>
                  <div className="roulette-table-row">
                    <div onClick={(event) => betOnNumber(event, [0, 2])}></div>
                    <div onClick={(event) => betOnNumber(event, [2])}></div>
                    <div onClick={(event) => betOnNumber(event, [2, 5])}></div>
                    <div onClick={(event) => betOnNumber(event, [5])}></div>
                    <div onClick={(event) => betOnNumber(event, [5, 8])}></div>
                    <div onClick={(event) => betOnNumber(event, [8])}></div>
                    <div onClick={(event) => betOnNumber(event, [8, 11])}></div>
                    <div onClick={(event) => betOnNumber(event, [11])}></div>
                    <div onClick={(event) => betOnNumber(event, [11, 14])}></div>
                    <div onClick={(event) => betOnNumber(event, [14])}></div>
                    <div onClick={(event) => betOnNumber(event, [14, 17])}></div>
                    <div onClick={(event) => betOnNumber(event, [17])}></div>
                    <div onClick={(event) => betOnNumber(event, [17, 20])}></div>
                    <div onClick={(event) => betOnNumber(event, [20])}></div>
                    <div onClick={(event) => betOnNumber(event, [20, 23])}></div>
                    <div onClick={(event) => betOnNumber(event, [23])}></div>
                    <div onClick={(event) => betOnNumber(event, [23, 26])}></div>
                    <div onClick={(event) => betOnNumber(event, [26])}></div>
                    <div onClick={(event) => betOnNumber(event, [26, 29])}></div>
                    <div onClick={(event) => betOnNumber(event, [29])}></div>
                    <div onClick={(event) => betOnNumber(event, [29, 32])}></div>
                    <div onClick={(event) => betOnNumber(event, [32])}></div>
                    <div onClick={(event) => betOnNumber(event, [32, 35])}></div>
                    <div onClick={(event) => betOnNumber(event, [35])}></div>
                  </div>
                  <div className="roulette-table-row">
                    <div onClick={(event) => betOnNumber(event, [0, 2, 1])}></div>
                    <div onClick={(event) => betOnNumber(event, [1, 2])}></div>
                    <div onClick={(event) => betOnNumber(event, [1, 2, 4, 5])}></div>
                    <div onClick={(event) => betOnNumber(event, [4, 5])}></div>
                    <div onClick={(event) => betOnNumber(event, [4, 5, 7, 8])}></div>
                    <div onClick={(event) => betOnNumber(event, [7, 8])}></div>
                    <div onClick={(event) => betOnNumber(event, [7, 8, 10, 11])}></div>
                    <div onClick={(event) => betOnNumber(event, [10, 11])}></div>
                    <div onClick={(event) => betOnNumber(event, [10, 11, 13, 14])}></div>
                    <div onClick={(event) => betOnNumber(event, [13, 14])}></div>
                    <div onClick={(event) => betOnNumber(event, [13, 14, 16, 17])}></div>
                    <div onClick={(event) => betOnNumber(event, [16, 17])}></div>
                    <div onClick={(event) => betOnNumber(event, [16, 17, 19, 20])}></div>
                    <div onClick={(event) => betOnNumber(event, [19, 20])}></div>
                    <div onClick={(event) => betOnNumber(event, [19, 20, 22, 23])}></div>
                    <div onClick={(event) => betOnNumber(event, [22, 23])}></div>
                    <div onClick={(event) => betOnNumber(event, [22, 23, 25, 26])}></div>
                    <div onClick={(event) => betOnNumber(event, [25, 26])}></div>
                    <div onClick={(event) => betOnNumber(event, [25, 26, 28, 29])}></div>
                    <div onClick={(event) => betOnNumber(event, [28, 29])}></div>
                    <div onClick={(event) => betOnNumber(event, [28, 29, 31, 32])}></div>
                    <div onClick={(event) => betOnNumber(event, [31, 32])}></div>
                    <div onClick={(event) => betOnNumber(event, [31, 32, 34, 35])}></div>
                    <div onClick={(event) => betOnNumber(event, [34, 35])}></div>
                  </div>
                  <div className="roulette-table-row">
                    <div onClick={(event) => betOnNumber(event, [0, 1])}></div>
                    <div onClick={(event) => betOnNumber(event, [1])}></div>
                    <div onClick={(event) => betOnNumber(event, [1, 4])}></div>
                    <div onClick={(event) => betOnNumber(event, [4])}></div>
                    <div onClick={(event) => betOnNumber(event, [4, 7])}></div>
                    <div onClick={(event) => betOnNumber(event, [7])}></div>
                    <div onClick={(event) => betOnNumber(event, [7, 10])}></div>
                    <div onClick={(event) => betOnNumber(event, [10])}></div>
                    <div onClick={(event) => betOnNumber(event, [10, 13])}></div>
                    <div onClick={(event) => betOnNumber(event, [13])}></div>
                    <div onClick={(event) => betOnNumber(event, [13, 16])}></div>
                    <div onClick={(event) => betOnNumber(event, [16])}></div>
                    <div onClick={(event) => betOnNumber(event, [16, 19])}></div>
                    <div onClick={(event) => betOnNumber(event, [19])}></div>
                    <div onClick={(event) => betOnNumber(event, [19, 22])}></div>
                    <div onClick={(event) => betOnNumber(event, [22])}></div>
                    <div onClick={(event) => betOnNumber(event, [22, 25])}></div>
                    <div onClick={(event) => betOnNumber(event, [25])}></div>
                    <div onClick={(event) => betOnNumber(event, [25, 28])}></div>
                    <div onClick={(event) => betOnNumber(event, [28])}></div>
                    <div onClick={(event) => betOnNumber(event, [28, 31])}></div>
                    <div onClick={(event) => betOnNumber(event, [31])}></div>
                    <div onClick={(event) => betOnNumber(event, [31, 34])}></div>
                    <div onClick={(event) => betOnNumber(event, [34])}></div>
                  </div>
                  <div className="roulette-table-row">
                    <div onClick={(event) => betOnNumber(event, [0, 1, 2, 3])}></div>
                    <div onClick={(event) => betOnNumber(event, [1, 2, 3])}></div>
                    <div onClick={(event) => betOnNumber(event, [1, 2, 3, 4, 5, 6])}></div>
                    <div onClick={(event) => betOnNumber(event, [4, 5, 6])}></div>
                    <div onClick={(event) => betOnNumber(event, [4, 5, 6, 7, 8, 9])}></div>
                    <div onClick={(event) => betOnNumber(event, [7, 8, 9])}></div>
                    <div onClick={(event) => betOnNumber(event, [7, 8, 9, 10, 11, 12])}></div>
                    <div onClick={(event) => betOnNumber(event, [10, 11, 12])}></div>
                    <div onClick={(event) => betOnNumber(event, [10, 11, 12, 13, 14, 15])}></div>
                    <div onClick={(event) => betOnNumber(event, [13, 14, 15])}></div>
                    <div onClick={(event) => betOnNumber(event, [13, 14, 15, 16, 17, 18])}></div>
                    <div onClick={(event) => betOnNumber(event, [16, 17, 18])}></div>
                    <div onClick={(event) => betOnNumber(event, [16, 17, 18, 19, 20, 21])}></div>
                    <div onClick={(event) => betOnNumber(event, [19, 20, 21])}></div>
                    <div onClick={(event) => betOnNumber(event, [19, 20, 21, 22, 23, 24])}></div>
                    <div onClick={(event) => betOnNumber(event, [22, 23, 24])}></div>
                    <div onClick={(event) => betOnNumber(event, [22, 23, 24, 25, 26, 27])}></div>
                    <div onClick={(event) => betOnNumber(event, [25, 26, 27])}></div>
                    <div onClick={(event) => betOnNumber(event, [25, 26, 27, 28, 29, 30])}></div>
                    <div onClick={(event) => betOnNumber(event, [28, 29, 30])}></div>
                    <div onClick={(event) => betOnNumber(event, [28, 29, 30, 31, 32, 33])}></div>
                    <div onClick={(event) => betOnNumber(event, [31, 32, 33])}></div>
                    <div onClick={(event) => betOnNumber(event, [31, 32, 33, 34, 35, 36])}></div>
                    <div onClick={(event) => betOnNumber(event, [34, 35, 36])}></div>
                  </div>
                </div>
                <div className="roulette-table-row-lower">
                  <div className="roulette-table-row-thirds">
                    <div onClick={(event) => betOnNumber(event, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])}></div>
                    <div onClick={(event) => betOnNumber(event, [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24])}></div>
                    <div onClick={(event) => betOnNumber(event, [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36])}></div>
                  </div>
                  <div className="roulette-table-row-thirdHalves">
                    <div onClick={(event) => betOnNumber(event, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18])}></div>
                    <div onClick={(event) => betOnNumber(event, [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36])}></div>
                    <div onClick={(event) => betOnNumber(event, [32, 19, 21, 25, 34, 27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3])}></div>
                    <div onClick={(event) => betOnNumber(event, [15, 4, 2, 17, 6, 13, 11, 8, 10, 24, 33, 20, 31, 22, 29, 28, 35, 26])}></div>
                    <div onClick={(event) => betOnNumber(event, [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35])}></div>
                    <div onClick={(event) => betOnNumber(event, [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36])}></div>
                  </div>
                </div>
              </div>
              <div className="ending-col">
                <div onClick={(event) => betOnNumber(event, [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36])}></div>
                <div onClick={(event) => betOnNumber(event, [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35])}></div>
                <div onClick={(event) => betOnNumber(event, [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34])}></div>
              </div>
            </div>
          </div>
          <button className="reset-bets" onClick={removeBets}></button>
        </div>
      </div>
      <div className="roulette-footer">
        <div className="footer-element-wrapper">
          <div>
            <p className="footer-balance">Balance:</p>
            <h2>$ {balance}</h2>
          </div>
        </div>

        <div className="chips-wrapper">
          <div id="chip-1" onClick={() => setValue(1)} className={value === 1 ? 'activeChip' : ''}></div>
          <div id="chip-5" onClick={() => setValue(5)} className={value === 5 ? 'activeChip' : ''}></div>
          <div id="chip-25" onClick={() => setValue(25)} className={value === 25 ? 'activeChip' : ''}></div>
          <div id="chip-100" onClick={() => setValue(100)} className={value === 100 ? 'activeChip' : ''}></div>
          <div id="chip-500" onClick={() => setValue(500)} className={value === 500 ? 'activeChip' : ''}></div>
        </div>
        <div className="footer-button-wrapper">
          <button disabled={!bettingActive} className={`spin-btn large-button ${!bettingActive ? 'inactive-btn' : ''}`} onClick={handleSpin}>
            SPIN
          </button>
        </div>
      </div>
    </div>
  );
}
