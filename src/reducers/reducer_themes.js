import { CHANGE_THEME, COUNTER_EMOTIONS } from '../actions/action_themes';

export default function reducer(state={
    theme: 'UNKNOWN',
    counterEmotions: false
  }, action) {

    switch (action.type) {
      case CHANGE_THEME:
        return {...state, theme: action.payload}
      case COUNTER_EMOTIONS:
        return {...state, counterEmotions: action.payload}
      default:
        return state;
    }
}
