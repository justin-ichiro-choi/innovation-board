import { INVALID_MOVE } from 'boardgame.io/core';
import { AGES, COLORS } from './constants';
import { CARDS } from './cards';
import { plugin } from 'boardgame.io/dist/types/src/core/action-creators';

export const InnovationGame = {
    name: 'innovation',
    setup: (ctx) => {
        // Initialize the deck
        const deck = [CARDS];
        ctx.random.Shuffle(deck);
      
        // Initialize players
        const players = {};
        for (let i = 0; i < ctx.numPlayers; i++) {
          players[i] = {
            hand: [],
            score: 0,
            tableau: []
            // Add other player-specific properties here
          };
        }
      
        // Distribute initial cards to players
        for (let i = 0; i < ctx.numPlayers; i++) {
          players[i].hand.push(deck.pop());
          players[i].hand.push(deck.pop());
        }
      
        return {
          deck,
          players,
          achievements: [],
          currentTurn: 0,
          timer: 0
        };
      },
    moves: {
        drawCard: ({ G, ctx }) => {
            console.log(G.deck[0])
            console.log(ctx)
            const card = G.deck.pop();
            console.log(card)
            players.deck(card);
        },
        meldCard: ({G, ctx, cardIndex}) => {
            console.log("Meld Card was called");
            console.log("G:", G);
            console.log("ctx:", ctx); 
            G.timer += 1;
        },
        activateDogma: (G, ctx, color) => { /* ... */ },
        scoreCard: (G, ctx, cardIndex) => { /* ... */ },
    },
};

