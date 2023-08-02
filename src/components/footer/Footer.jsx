import React from 'react';
import './footer.css'

function Footer(props) {

  return (
    <footer className='footer'>
      <div className="about-me">
        <div className="copyright">
          <i className="fa-solid fa-copyright"></i>
          <span className="name">gerard hubert</span>
        </div>
        <div className="network">
          <a href="https://www.linkedin.com/in/g%C3%A9rard-hubert-ab6213206/" target="_blank" rel="noreferrer"><i className="fa-brands fa-linkedin-in"></i></a>
        </div>
      </div>
      <div className="rawg-attribution">
        <a href="https://rawg.io/apidocs" target="_blank" rel="noreferrer"><span className="rawg-attribution-text">Données de jeu récupérées via l'Api Rawg.io</span></a>
      </div>
    </footer>
  );
}

export default Footer;