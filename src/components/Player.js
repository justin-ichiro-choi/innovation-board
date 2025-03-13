import React from 'react';

const Player = ({ player, playerId, moves }) => {
  return (
    <div>
      <h3>Player {playerId}</h3>
      <div>
        <h4>Hand</h4>
        {player.hand.map((card, index) => (
          <button key={index} onClick={() => moves.meldCard(index)}>
            {card.name} (Age: {card.age}, Color: {card.color})
          </button>
        ))}
      </div>
      <div>
        <h4>Tableau</h4>
        {player.tableau && player.tableau.map((card, index) => (
          <div key={index}>
            {card.name} (Age: {card.age}, Color: {card.color})
          </div>
        ))}
      </div>
      <div>
        <button onClick={() => moves.activateDogma(playerId)}>Activate Dogma</button>
        <button onClick={() => moves.scoreCard(playerId)}>Score Card</button>
      </div>
    </div>
  );
};

export default Player;
