export { GET_DATA_SUCCESS, GET_DATA_FAILURE } from '../actions/action_example_using_axios_thunk';

export default function(state={
  data: ''
}, action) {
  switch (action.type) {
    case GET_DATA_SUCCESS:
      return {...state, data: action.payload.data};
      break;
    case GET_DATA_FAILURE:
      return {...state, data: action.payload.data};
      break;
    default:
      return state;
  }
  return state;
}
