import * as CONFIGS from '../configs'

export function setStageHeight (height) {
  return (dispatch) => {
    dispatch({ type: 'SET_STAGE_HEIGHT', payload: height})
  }
}

export function toggleFavorite (name) {
  return (dispatch) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: name });
  }
}

export function nextPokemon () {
  return (dispatch, getState) => {
    const currentID = parseInt(getState().mainReducer.currentPokemonID);
    dispatch({ type: 'SET_CURRENT_ID', payload: (currentID+1) });
  }
}

export function prevPokemon () {
  return (dispatch, getState) => {
    const currentID = parseInt(getState().mainReducer.currentPokemonID);
    dispatch({ type: 'SET_CURRENT_ID', payload: (currentID-1 < 0 ? 0 : currentID-1) });
  }
}

export function getPokemonList(nextUrl) {
  let defaultParams = new URLSearchParams();
  defaultParams.append("offset", CONFIGS.offset);
  defaultParams.append("limit", CONFIGS.limit);
  const url = nextUrl ? nextUrl : (CONFIGS.apiEndpoint + "?" + defaultParams.toString());

  return async (dispatch, getState) => {

    let result = await apiFetch(url);

    const getData = async () => {
      return await Promise.all(result.results.map(item => fetchAndCombineSinglePokemon(item)))
    };
    const fetchAndCombineSinglePokemon = async (item) => {
      let specs = await apiFetch(item.url);
      return {...item, specs, favorite: false};
    };

    let newList = await getData();

    dispatch({
      type: 'SET_POKEMON_LIST',
      payload: newList
    });

  }
}

const apiFetch = async (url) => {
  const options = {
    method: "GET",
    header: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "dataType": "json"
    }
  };
  let response = await fetch(url, options);
  return await response.json();
};

