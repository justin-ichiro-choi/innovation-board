import React from 'react';
import Player from './Player';

const GameBoard = ({ G, ctx, moves }) => {
  return (
    <div>
      <h1>Innovation Board Game</h1>
      <h2>Player {ctx.currentPlayer}'s Turn</h2>
      <button onClick={() => moves.drawCard(G, ctx)}>Draw Card</button>
      <div>
        {Object.keys(G.players).map(playerId => (
          <Player key={playerId} player={G.players[playerId]} playerId={playerId} moves={moves} />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;