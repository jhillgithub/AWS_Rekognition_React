import { UPDATE_GALLERY } from '../actions/action_gallery';

export default function reducer(state={
    images: []
  }, action) {

    switch (action.type) {
      case UPDATE_GALLERY:
        return {...state, images: state.images.concat(action.payload)}
      default:
        return state;
    }
}
