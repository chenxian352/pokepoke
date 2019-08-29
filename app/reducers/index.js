import { combineReducers } from 'redux';

const initialStates = {
  stageSprite: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/3f3a3831234507.564a1d2338123.gif',
  stageHeight: 0,
  pokemonList: [],
  nextUrl: ''
};

export const mainReducer = (state = initialStates, action) => {
  switch (action.type) {
    case 'SET_STAGE_SPRITE':
      return { ...state, stageSprite: action.payload };
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
