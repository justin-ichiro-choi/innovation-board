import {Client} from 'boardgame.io/react';
import { Innovation } from './Game';

const App = Client({
  game: Innovation,
  numPlayers: 2, // Adjust to make this dynamic
});

export default App;
