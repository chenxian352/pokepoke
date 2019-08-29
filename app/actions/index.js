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

  const options = {
    method: "GET",
    header: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "dataType": "json"
    }
  };
  return (dispatch, getState) => {
    fetch(url, options)
        .then(response => response.json())
        .then(result => {
          dispatch({
            type: 'SET_POKEMON_LIST',
            payload: result.results
          });
          dispatch({
            type: 'SET_NEXT_URL',
            payload: result.next
          });
        })
        .catch( error => console.log(error));
  }
}
