import axios from 'axios';

export const GET_DATA = 'GET_DATA';
export const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS';
export const GET_DATA_FAILURE = 'GET_DATA_FAILURE';

function getDataSuccess(response) {
  console.log(response);
  return {
    type: GET_DATA_SUCCESS,
    payload: response
  };
}

function getDataFailure(response) {
  console.log(err);
  return {
    type: GET_DATA_FAILURE,
    payload: err
  };
}

export function getData() {
  const URL = '/api/v1/data';
  return function(dispatch) {
    axios.get(URL)
    .then((response) => {
      if (response.status === 200) {
        dispatch(getDataSuccess(response));
      } else {
        dispatch(getDataFailure(response));
      }
    })
    .catch((err) => {
      dispatch(getDataFailure(err));
    });
  };
}
