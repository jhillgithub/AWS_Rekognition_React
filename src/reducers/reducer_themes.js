import { CHANGE_THEME } from '../actions/action_themes';

export default function reducer(state={
    theme: ''
  }, action) {

    switch (action.type) {
      case CHANGE_THEME:
        return {...state, theme: action.payload}
      default:
        return state;
    }
}
