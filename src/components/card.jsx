// Card.jsx - React component for individual cards
import React from 'react';

export function Card({ card, onClick, onScore, isTableau }) {
  return (
    <div className={`card ${card.color} age-${card.age}`} onClick={onClick}>
      <div className="card-header">
        <span className="card-age">{card.age}</span>
        <span className="card-name">{card.name}</span>
      </div>
      
      <div className="card-symbols">
        {card.symbols.map((symbol, index) => (
          <span key={index} className={`symbol ${symbol}`}>
            {symbol}
          </span>
        ))}
      </div>
      
      <div className="card-dogma">
        <div className="dogma-symbol">{card.dogmaSymbol}</div>
        {card.dogmaEffects.map((effect, index) => (
          <div key={index} className={`dogma-effect ${effect.type}`}>
            {effect.text}
          </div>
        ))}
      </div>
      
      {!isTableau && onScore && (
        <button className="score-button" onClick={(e) => {
          e.stopPropagation();
          onScore();
        }}>
          Score
        </button>
      )}
    </div>
  );
}