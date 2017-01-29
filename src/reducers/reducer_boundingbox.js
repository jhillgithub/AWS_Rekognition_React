import { UPDATE_BOUNDINGBOX } from '../actions/index';

export default function(state={
  Left: 0,
  Right: 0,
  Height: 0,
  Width: 0
}, action) {
  switch (action.type) {
    case UPDATE_BOUNDINGBOX:
      return action.payload;
      break;
    default:
      return state;
  }
  return state;
}
