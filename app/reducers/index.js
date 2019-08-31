import { combineReducers } from 'redux';
import * as CONFIGS from '../configs'

const initialStates = {
  stagePokemon: {name:"Loading...", specs: {sprites: {front_default: CONFIGS.imagePlaceHolder}}},
  stageHeight: 0,
  pokemonList: [],
  nextUrl: ''
};

export const mainReducer = (state = initialStates, action) => {
  switch (action.type) {
    case 'SET_STAGE_POKEMON':
      return { ...state, stagePokemon: action.payload };
    case 'SET_STAGE_HEIGHT':
      return { ...state, stageHeight: action.payload };
    case 'SET_POKEMON_LIST':
      return { ...state, pokemonList: action.payload };
    case 'SET_NEXT_URL':
      return { ...state, nextUrl: action.payload };
    default:
      return state;
  }
};

export default combineReducers({
  mainReducer
});
