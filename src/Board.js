import React from 'react';

export function Board({ G, ctx, moves }) {
  return (
    <div>
      <h2>Player {ctx.currentPlayer}'s Turn</h2>
      <button onClick={() => moves.drawCard()}>Draw Card</button>
      <div>
        <h3>Hand</h3>
        {G.players[ctx.currentPlayer].hand.map((card, index) => (
          <button key={index} onClick={() => moves.playCard(index)}>
            {card.name}
          </button>
        ))}
      </div>
    </div>
  );
}