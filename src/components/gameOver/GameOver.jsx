import React from 'react';
import '../gameOver/gameover.css'

function GameOver(props) {
  return (
    <section className='gameover-container'>
      <span className='gameover-title'>game over</span>
      <div className="final-score-container">
        <span className="final-score-title">Ton score:</span>
        <span className='final-score'>{props.finalScore}%</span>
      </div>
      <button className="play-again-btn" onClick={() => props.handleNewGame()}>new game</button>
    </section>
  );
}

export default GameOver;