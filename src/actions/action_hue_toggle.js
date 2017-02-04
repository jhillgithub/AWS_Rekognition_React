import axios from 'axios';

export const TOGGLE_HUE_LIGHT = 'TOGGLE_HUE_LIGHT';
export const TOGGLE_HUE_LIGHT_SUCCESS = 'TOGGLE_HUE_LIGHT_SUCCESS';
export const TOGGLE_HUE_LIGHT_FAILURE = 'TOGGLE_HUE_LIGHT_FAILURE';

function toggle_success(response) {
  console.log(response);
  return {
    type: TOGGLE_HUE_LIGHT_SUCCESS,
    payload: response
  };
}

function toggle_failure(response) {
  console.log(err);
  return {
    type: TOGGLE_HUE_LIGHT_FAILURE,
    payload: err
  };
}

export function toggle_hue_light(hue) {
  const URL = "http://"+hue.hueIP+"/api/"+hue.hueUser+"/lights/1/state"
  console.log(URL);
  return function(dispatch) {
    axios.put(URL, {"on": !hue.hueOn})
    .then((response) => {
      if (response.status === 200) {
        dispatch(toggle_success(response));
      } else {
        dispatch(toggle_failure(response));
      }
    })
    .catch((err) => {
      dispatch(toggle_failure(err));
    });
  };
}
