const SYMBOLS = {
    CROWN: 'crown',
    LEAF: 'leaf',
    LIGHTBULB: 'lightbulb',
    CASTLE: 'castle',
    FACTORY: 'factory',
    CLOCK: 'clock'
};

const COLORS = {
    RED: 'red',
    GREEN: 'green',
    BLUE: 'blue',
    YELLOW: 'yellow',
    PURPLE: 'purple'
};

const createCard = ({
    id,
    name,
    age, 
    color,
    symbols,
    dogmaSymbol,
    dogmaEffects,
    isSpecial = false
}) => ({
    id,
    name,
    age, 
    color,
    symbols,
    dogmaSymbol,
    dogmaEffects,
    isSpecial
});

// Assume a very long lists unless a more efficient method is found: Works for testing
export const cards = [
    createCard({
        id: 1,
        name: 'Agriculture',
        age: 1,
        color: COLORS.YELLOW,
        symbols: [SYMBOLS.LEAF, SYMBOLS.LEAF, SYMBOLS.LEAF],
        dogmaSymbol: SYMBOLS.LEAF,
        dogmaEffects: ["I DEMAND you transfer a card with a {CASTLE} from your hand to my score pile!",
      "Draw and meld a {1}."],
    })
];

// Helpers to get card
export const getCardById = (id) => cards.find(card => card.id === id);

export const getCardsByAge = (age) => cards.filter(card => card.age === age);

export const getCardsByColor = (color) => cards.filter(card => card.color === color);

export { SYMBOLS, COLORS };