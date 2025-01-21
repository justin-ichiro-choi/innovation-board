import { cards } from './cards';

export const Innovation = {
    name: 'Innovation',
    
    minPlayers: 2,
    maxPlayers: 4,
    
    setup: (ctx) => {
        // Create initial player states based on number of players
        const players = {};
        for (let i = 0; i < ctx.numPlayers; i++) {
            players[i] = {
                // Tracks cards in hand
                hand: [],
                score: [],
                boards: {}, // Keyed by color (red, green, blue, yellow, purple)
                achievements: [],
            };
        }
    

    // Tracking win condition of Achievments
        const numAchievementsNeeded = {
            2: 6,
            3: 5,
            4: 4
        }[ctx.numPlayers];

        return {
            players,
            deck: {
                1: [...cards.filter(card => card.age === 1)],
                2: [...cards.filter(card => card.age === 2)],
                3: [...cards.filter(card => card.age === 3)],
                4: [...cards.filter(card => card.age === 4)],
                5: [...cards.filter(card => card.age === 5)],
                6: [...cards.filter(card => card.age === 6)],
                7: [...cards.filter(card => card.age === 7)],
                8: [...cards.filter(card => card.age === 8)],
                9: [...cards.filter(card => card.age === 9)],
                10: [...cards.filter(card => card.age === 10)],
            },
            achievements: [], // Available achievements
            achievementsNeeded: numAchievementsNeeded,
        };
    },

    moves: {
        drawCard: ({ G, ctx }) => {
            const currentPlayer = G.players[ctx.currentPlayer];
            const age = 1;
            const deck = G.deck[age]

            if (deck && deck.length > 0) {
                const card = deck.shift();
                currentPlayer.hand.push(card);
            }
        },

        meldCard: ({ G, ctx }, cardId) => {
            const currentPlayer = G.players[ctx.currentPlayer];

            const card = currentPlayer.hand.findIndex(card => card.id === cardId);

            if (card === -1) return;

            currentPlayer.hand.splice(card, 1);

            if (!currentPlayer.boards[card.color]) {
                currentPlayer.boards[card.color] = [];
            }

            currentPlayer.boards[card.color].push(card);
        }
    
        // TODO: Add following moves: Achieve, Dogma, End Turn
    }

};


