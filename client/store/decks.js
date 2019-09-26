const initialState = {
  all: [],
  activeDeck: {
    cards: []
  }
};

// ACTION TYPES
const ADD_CARD = 'ADD_CARD';
const DELETE_CARD = 'DELETE_CARD';

// ACTION CREATOR
export const addCard = card => {
  return { type: ADD_CARD, card };
};
export const deleteCard = cardId => {
  return { type: DELETE_CARD, cardId };
};


// REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_CARD:
      return {
        ...state,
        activeDeck: {
          ...state.activeDeck,
          cards: [ ...state.activeDeck.cards, action.card ]
        }
      };
    case DELETE_CARD:
      return {
        ...state,
        activeDeck: {
          ...state.activeDeck,
          cards: [ ...state.activeDeck.cards.filter(card => card.id === action.cardId)]
        }
      };
    default:
      return state;
  }
}
