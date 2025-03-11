import { cards } from './cards';
import { applyEffects } from './effects';

export const Innovation = {
    setup: (ctx) => {
        const supply = cards.reduce((acc, card) => {
            const ageKey = `age${card.age}`;
            if (!acc[ageKey]) {
            acc[ageKey] = [];
            }
            acc[ageKey].push(card);
            return acc;
        }, {});

        return {
            players: {
            0: { tableau: [], hand: [], score: 0 },
            1: { tableau: [], hand: [], score: 0 },
            },
            supply,
            achievements: [],
            currentAge: 1,
        };
    },
    moves: {
      drawCard: (G, ctx) => {
        console.log('ctx:', ctx); // Add this line to debug
        if (!ctx) {
          throw new Error('test: ctxUndefined');
        }
        const player = G.players[ctx.currentPlayer];
        const card = G.supply[`age${G.currentAge}`].pop();
        player.hand.push(card);
      },
      playCard: (G, ctx, cardIndex) => {
        const player = G.players[ctx.currentPlayer];
        const card = player.hand.splice(cardIndex, 1)[0];
        player.tableau.push(card);
        applyEffects(G, ctx, card.effects);
      },
    },
  };