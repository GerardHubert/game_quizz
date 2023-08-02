import React, { useState } from 'react';
import '../game/game.css';

function Game(props) {

  const [attempts, setAttempts] = useState(1);
  const [score, setScore] = useState(0);

  const answers = [];
  // on choisit 4 jeux aléatoires parmi la liste de jeux passée en props, en veillant à ne pas tirer 2 fois le même jeu
  for (let i = 0; answers.length < 4; i++) {
    const randomIndex = Math.floor(Math.random() * props.gamesList.length);
    if (!answers.includes(props.gamesList[randomIndex])) {
      answers.push(props.gamesList[randomIndex]);
    }
  }

  // on choisit le jeu qui sera la bonne réponse
  const randomIndex = Math.floor(Math.random() * answers.length);
  const goodAnswer = answers[randomIndex];
  const listAnswers = answers.map((element) =>
    <span className='answer'
      key={element.id}
      onClick={(e) => handleClick(e, element.name)}>
      {element.name}
    </span>
  )

  /**
   * Gestion de la réponse: on incrémente les tentatives de 1
   * Si bonne réponse on incrémente le score de 1.
   * Game transmet à App la bonne réponse pour la supprimer de la liste
   * App transmet la nouvelle liste
   * Game choisit 4 nouvelles réponses
   */
  function handleClick(e, gameName) {
    setAttempts(attempts + 1);
    goodAnswer.name === gameName ? setScore(score + 1) : setScore(score);
    props.isClicked(goodAnswer, attempts, score);
  }

  return (
    <section className="game-board">
      <div className="stats-container">
        <div className="attempts-container">
          <span className='stat-name'>images:</span>
          <span className='attempt'>{attempts}</span>
          <span className='stat-total'> / 20</span>
        </div>
        <div className="score-container">
          <span className='stat-name'>score:</span>
          <span className='score'>{score}</span>
          <span className='stat-total'> / 20</span>
        </div>
      </div>
      <img className='image-to-guess'
        src={goodAnswer.background_image}
        alt="random answer buddy"
      />
      <div className="answers-container">
        {listAnswers}
      </div>
    </section >
  );
}

export default Game;