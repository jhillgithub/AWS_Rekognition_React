import { UPDATE_PROGRESS, SAVE_FACE_DATA } from '../actions/action_rekog';

export default function reducer(state={
    processing: false,
    face: null
  }, action) {

    switch (action.type) {
      case UPDATE_PROGRESS:
        return {...state, processing: action.payload}
      case SAVE_FACE_DATA:
        return {...state, face: action.payload}
      default:
        return state;
    }
}
