import '../components/App';
import '../styles/App.css';
import controller from '../images/controller.jpg';
import arcade from '../images/arcade-neon.jpg';
import { useEffect, useState } from 'react';
import Header from '../components/header/Header';
import Menu from './menu/Menu';
import Footer from './footer/Footer';
import Game from './game/Game.jsx';
import GameOver from './gameOver/GameOver';

/**
 * Ce composant récupère une liste de jeux. la nettoie des jeux sans background_image.
 * et l'enregistre dans le state. c'est de cette liste que sont tirées les images aléatoires
 */

function App() {
  const games = [];
  const [gamesList, setGamesList] = useState(games);
  const [isGameStarted, setStartGame] = useState(false);
  const [isGameOver, setGameOver] = useState(false);
  const [maxAttempts, setMaxAttempts] = useState(20);
  const [finalScore, setFinalScore] = useState(0);
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    query();
  }, []);

  return (
    <div className="app">
      <Header />
      <section className='board'>
        {isGameStarted === false && isGameOver === false ?
          <Menu start={handleStartGame} /> : null}
        {isGameStarted === true && isGameOver === false ?
          <Game gamesList={gamesList}
            isClicked={(answer, attempts, score) => handleAnswer(answer, attempts, score)}
          /> : null}
        {isGameOver === true ?
          <GameOver finalScore={finalScore}
            handleNewGame={() => newGame()}
          /> : null}
      </section>

      <Footer />
    </div>
  );

  function handleAnswer(goodAnswer, attempts, score) {
    const list = [...gamesList];
    list.splice(goodAnswer, 1);
    setGamesList(list);
    if (attempts === maxAttempts) {
      setStartGame(false);
      setGameOver(true);
      setFinalScore(Math.floor(score * 100 / maxAttempts))
    }
  }

  // fonction pour éxécuter les requêtes, autant de fois que ne nombre de pages retournées
  async function query() {
    for (const page of randomPage()) {
      const response = await fetch(`https://api.rawg.io/api/games?key=${apiKey}&platforms=4,187,18,1,186,7&page_size=25&page=${page}`);
      const data = await response.json();
      const cleanData = removeGamesWithoutImage(data.results);
      for (const item of cleanData) {
        games.push(item)
      }
    }
    setGamesList(games);
  }

  // fonction pour obtenir une page aléatoire
  function randomPage() {
    const randomPages = [];
    for (let i = 0; i < 4; i++) {
      let randomPage = Math.floor(Math.random() * 400);
      while (randomPages.includes(randomPage === true)) {
        randomPage = Math.floor(Math.random() * 400);
      }
      randomPages.push(randomPage);
    }
    return randomPages;
  }

  // fonction pour supprimer les jeux sans background_image
  function removeGamesWithoutImage(data) {
    for (const element of data) {
      if (element.background_image === null) {
        data.splice(element)
      }
    }
    return data;
  };

  // fonction pour gérer le démarrage d'une partie (click depuis le composant Menu)
  function handleStartGame(e) {
    setStartGame(true);
  }

  // si nouvelle partie, on reset
  function newGame() {
    query();
    setStartGame(true);
    setGameOver(false);
    setFinalScore(0);
  }

}

export default App;
