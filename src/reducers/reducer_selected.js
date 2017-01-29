import { IMAGE_SELECTED } from '../actions/index';

export default function(state = null, action) {
  switch (action.type) {
    case IMAGE_SELECTED:
      return action.payload;
      break;
    default:
      return state;
  }
  return state;
}
