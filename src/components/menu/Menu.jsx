import React from 'react';
import './menu.css';

function Menu(props) {
  return (
    <section className="menu">
      <h2 className='app-rules'>
        Envie de tester vos connaissances sur les jeux video ? Tentez ce quizz : une série d'images tirées de jeux vidéo (PS4, PS5, XBOX ONE, XBOX Series, Switch et PC) et 4 propositions de réponses. Il n'y a plus qu'à faire le meilleur score.
      </h2>
      <button className='start-button' onClick={(e) => props.start(e)}>
        <span className='start'>start</span>
      </button>
    </section>
  )
}

export default Menu;