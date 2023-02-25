import React from 'react';
import './Index.css';
import bgImg from './images/crystal-bg.jpg';

export default function Index() {
  // Ide jon a useState es useEffect kod meg mindenfele valtozo
  //

  return (
    <div className="index-wrapper">
      <img src={bgImg} alt="The Crystal" className="bg-img" />
      <div className="textbox">
        <h1>MAKE YOUR DREAMS COME TRUE. RIGHT NOW.</h1>
        <p>
          Do you have the courage to put all your savings on the black 22? Or maybe on the red 36? Your choice. You can change your whole life with just a few clicks. <br />
          Welcome to The Crystal.
        </p>
      </div>
    </div>
  );
}
