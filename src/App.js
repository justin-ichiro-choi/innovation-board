import { Client } from 'boardgame.io/react';
import { Local } from 'boardgame.io/multiplayer';
import { Innovation } from './Game';
import { Board } from './Board';

const App = Client({
  game: Innovation,
  board: Board,
  multiplayer: Local(),
});

export default App;