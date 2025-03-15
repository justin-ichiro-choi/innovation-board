import React from 'react';
import { Card } from './card';

export function GameBoard({ G, ctx, moves }) {
  const currentPlayer = parseInt(ctx.currentPlayer);
  
  const handleDrawCard = (age) => {
    moves.drawCard(age);
  };
  
  const handleMeldCard = (cardId) => {
    moves.meldCard(cardId);
  };
  
  const handleActivateDogma = (cardId) => {
    moves.activateDogma(cardId);
  };
  
  const handleScoreCard = (cardId) => {
    moves.scoreCard(cardId);
  };
  
  return (
    <div className="game-board">
      <div className="game-info">
        <h2>Innovation</h2>
        <div>Current Player: {currentPlayer + 1}</div>
        <div>Score: {G.scores[currentPlayer]}</div>
        <div>Achievements: {G.achievements.filter(a => a.player === currentPlayer).length}</div>
      </div>
      
      <div className="decks">
        <h3>Draw Piles</h3>
        <div className="age-decks">
          {Object.keys(G.decks).map(age => (
            <div 
              key= {age} 
              className="deck"
              onClick={() => handleDrawCard(parseInt(age.substring(3)))}
            >
              {age.substring(3)}: {G.decks[age][0].length}
            </div>
          ))}
        </div>
      </div>
      
      <div className="player-hand">
        <h3>Your Hand</h3>
        <div className="cards">
          {G.hands[currentPlayer].map(card => (
            <Card 
              key={card.id}
              card={card}
              onClick={() => handleMeldCard(card.id)}
              onScore={() => handleScoreCard(card.id)}
            />
          ))}
        </div>
      </div>
      
      <div className="player-tableau">
        <h3>Your Tableau</h3>
        {Object.entries(G.tableaus[currentPlayer]).map(([color, stack]) => (
          <div key={color} className={`tableau-stack ${color}`}>
            <h4>{color}</h4>
            {stack.length > 0 ? (
              <Card 
                card={stack[stack.length - 1]} 
                onClick={() => handleActivateDogma(stack[stack.length - 1].id)}
                isTableau
              />
            ) : (
              <div className="empty-stack">Empty</div>
            )}
          </div>
        ))}
      </div>
      
      <div className="opponents">
        <h3>Opponents</h3>
        {Array.from(Array(ctx.numPlayers).keys())
          .filter(player => player !== currentPlayer)
          .map(player => (
            <div key={player} className="opponent">
              <h4>Player {player + 1}</h4>
              <div>Score: {G.scores[player]}</div>
              <div>Achievements: {G.achievements.filter(a => a.player === player).length}</div>
              <div className="opponent-tableau">
                {Object.entries(G.tableaus[player]).map(([color, stack]) => (
                  <div key={color} className={`tableau-mini ${color}`}>
                    {stack.length > 0 ? stack[stack.length - 1].name : ""}
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}