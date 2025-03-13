import React from 'react';
import ReactDOM from 'react-dom/client';
import { Client } from 'boardgame.io/react';
import InnovationGame from './game/game';
import GameBoard from './components/GameBoard';
import './styles.css';

const App = Client({
  game: InnovationGame,
  board: GameBoard,
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);