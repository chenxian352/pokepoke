import { combineReducers } from 'redux';

const initialStates = {
  stageHeight: 0,
  pokemonList: [],
  currentPokemonID: 1
};

export const mainReducer = (state = initialStates, action) => {
  switch (action.type) {
    case 'SET_CURRENT_ID':
      return { ...state, currentPokemonID: action.payload };
    case 'SET_STAGE_HEIGHT':
      return { ...state, stageHeight: action.payload };
    case 'SET_POKEMON_LIST':
      return { ...state, pokemonList: action.payload };
    case 'TOGGLE_FAVORITE':
      let newList = state.pokemonList.map(item => {
        if(item.name === action.payload) {
          item.favorite = !item.favorite;
        }
        return item;
      });
      return {...state, pokemonList: newList};
    default:
      return state;
  }
};

export default combineReducers({
  mainReducer
});
