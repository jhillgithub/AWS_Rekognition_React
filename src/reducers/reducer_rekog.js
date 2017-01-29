import { UPDATE_PROGRESS } from '../actions/action_rekog';

export default function reducer(state={
    processing: false
  }, action) {

    switch (action.type) {
      case UPDATE_PROGRESS:
        return {...state, processing: action.payload}
      default:
        return state;
    }
}
