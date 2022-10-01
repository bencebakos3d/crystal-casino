import React from 'react';
import './Index.css';
import bgImg from './images/diamond-bg.png';

export default function Index() {
  // Ide jon a useState es useEffect kod meg mindenfele valtozo
  //

  const url = 'http://localhost:3001/api';

  fetch(`${url}/sessionstart`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    }
  })
    .then((response) => {
      console.log(response)
    })

  return (
    <div className="index-wrapper">
      <img src={bgImg} alt="Diamond Casino" className="bg-img" />
      <div className="textbox">
        <div className="experience-wrapper">
          <div className="divider"></div>
          <h2>EXPERIENCE EXCELLENCE</h2>
        </div>
        <h1>A LUXURY CASINO & RESORT IN THE HEART OF VINEWOOD</h1>
        <p>You've heard the rumors. You want to believe them, and there's only one way to find out. Abandon your preconceptions. Let go of your inhibitions, your doubts, your sense of proportion, vour credit rating. The rumors didn't begin to do it justice. Welcome to The Diamond. Grand Opening July 23.</p>
      </div>
    </div>
  );
}
