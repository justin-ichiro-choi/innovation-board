import { INVALID_MOVE } from 'boardgame.io/core';
import { CARDS } from './cards';

function createCardDecks() {
  const decks = {};
  for (let age = 1; age <= 10; age++) {
    decks[`age${age}`] = [CARDS[`age${age}`]];
  }
  return decks;
}

function initialHands(numPlayers) {
  const hands = {};
  for (let i = 0; i < numPlayers; i++) {
    hands[i] = [];
  }
  return hands;
}

function initialTableaus(numPlayers) {
  const tableaus = {};
  for (let i = 0; i < numPlayers; i++) {
    tableaus[i] = {
      red: [],
      green: [],
      blue: [],
      yellow: [],
      purple: []
    };
  }
  return tableaus;
}

function countSymbols(tableau) {
  const symbols = { leaf: 0, crown: 0, lightbulb: 0, castle: 0, factory: 0, clock: 0 };
  
  Object.values(tableau).forEach(stack => {
    if (stack.length > 0) {
      const topCard = stack[stack.length - 1];
      topCard.symbols.forEach(symbol => {
        symbols[symbol]++;
      });
    }
  });
  
  return symbols;
}

export const InnovationGame = {
    name: 'innovation',
    setup: ({ctx, random}) => {
      // Initialize the deck
      const decks = createCardDecks();
      
      Object.keys(decks).forEach(age => {
        random.Shuffle(decks[age]);
      });
      
      console.log("Deck initialized:", decks);
      console.log(ctx.numPlayers)
      return {
        decks,
        hands: initialHands(ctx.numPlayers),
        tableaus: initialTableaus(ctx.numPlayers),
        scores: Array(ctx.numPlayers).fill(0),
        achievements: Array.from({ length: 10 }, (_, i) => i + 1),
        specialAchievements: {}
      };
    },
    moves: {
      drawCard: ({ G, ctx }) => {
        for (let age = 1; age <= 10; age++) { // Assuming age ranges from 1 to 10
          const deck = G.decks[`age${age}`][0];
          if (deck.length > 0) {
            const card = deck.pop();
            console.log(card.name);
            G.hands[ctx.currentPlayer].push(card);
            return;
          }
        }
        console.log("No cards left in any deck");
      },
      
      meldCard: ({G, ctx}, cardId) => {
        const hand = G.hands[ctx.currentPlayer];
        const cardIndex = hand.findIndex(card => card.id === cardId);
        
        if (cardIndex === -1) return;
        
        const card = hand.splice(cardIndex, 1)[0];
        G.tableaus[ctx.currentPlayer][card.color].push(card);
      },

      activateDogma: ({G, ctx}, cardId) => {
        // Find the card in the player's tableau
        const color = Object.keys(G.tableaus[ctx.currentPlayer]).find(color => 
          G.tableaus[ctx.currentPlayer][color].length > 0 && 
          G.tableaus[ctx.currentPlayer][color][G.tableaus[ctx.currentPlayer][color].length - 1].id === cardId
        );
        
        if (!color) return;
        
        const card = G.tableaus[ctx.currentPlayer][color][G.tableaus[ctx.currentPlayer][color].length - 1];
        
        // Count dogma symbols
        const playerSymbols = countSymbols(G.tableaus[ctx.currentPlayer]);
        const dominantSymbol = card.dogmaSymbol;
        
        // Apply dogma effects (would be implemented based on each card's unique effects)
        // For sharing, check if other players have >= the same symbol count
        
        // This is a placeholder for the actual implementation
        console.log(`Player ${ctx.currentPlayer} activated dogma of ${card.name}`);
      },

      scoreCard: ({G, ctx}, cardId) => {
        const hand = G.hands[ctx.currentPlayer];
        const cardIndex = hand.findIndex(card => card.id === cardId);
        
        if (cardIndex === -1) return;
        
        const card = hand.splice(cardIndex, 1)[0];
        G.scores[ctx.currentPlayer] += card.age;
      }
    },
    turn: {
      minMoves:2,
      maxMoves:2,
      
      onBegin: (G, ctx) => {
        // Any setup for the beginning of a turn
      },
      
      onEnd: (G, ctx) => {
        // Check for achievements at end of turn
        checkAchievements(G, ctx);
      }
    },
    
    endIf: ({G, ctx}) => {
      // A player wins if they have 6 achievements
      for (let i = 0; i < ctx.numPlayers; i++) {
        if (G.achievements.filter(a => a.player === i).length >= 6) {
          return { winner: i };
        }
      }
      
      // Or if all age 10 achievements are claimed
      if (G.achievements.filter(a => a.age === 10).length === 5) {
        // Determine winner based on score
        const highScore = Math.max(...G.scores);
        const winners = G.scores
          .map((score, player) => ({ score, player }))
          .filter(item => item.score === highScore)
          .map(item => item.player);
        
        return { winner: winners.length === 1 ? winners[0] : winners };
      }
    }
  };
  
  function checkAchievements({G, ctx}) {
    // Check for age achievements
    for (let age = 1; age <= 9; age++) {
      if (G.scores[ctx.currentPlayer] >= age * 5) {
        const ageAchievement = G.achievements.find(a => a.age === age);
        if (!ageAchievement) {
          G.achievements.push({ age, player: ctx.currentPlayer });
        }
      }
    }
};

