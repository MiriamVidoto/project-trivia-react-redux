import React from 'react';
import { Route } from 'react-router-dom';
// import logo from './trivia.png';
import './App.css';
import Game from './pages/Game';
import Login from './pages/Login';

export default function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>SUA VEZ DE BRILHAR</p>
      </header> */}
      <body>
        <Route exact path="/" component={ Login } />
        <Route exact path="/game" component={ Game } />
      </body>
    </div>
  );
}
