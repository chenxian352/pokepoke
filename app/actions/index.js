import * as CONFIGS from '../configs'

export function setStageHeight (height) {
  return (dispatch, getState) => {
    dispatch({ type: 'SET_STAGE_HEIGHT', payload: height})
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
      return await Promise.all(result.results.map(item => fetchAndCombileSinglePokemon(item)))
    };
    const fetchAndCombileSinglePokemon = async (item) => {
      let specs = await apiFetch(item.url);
      return {...item, specs};
    };

    let newList = await getData();

    dispatch({
      type: 'SET_STAGE_SPRITE',
      payload: newList[0].specs.sprites.front_default
    });

    dispatch({
      type: 'SET_POKEMON_LIST',
      payload: newList
    });

    dispatch({
      type: 'SET_NEXT_URL',
      payload: result.next
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

