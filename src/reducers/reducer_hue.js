import { CONNECT_HUE, DISCONNECT_HUE, INPUT_HUE_USER, INPUT_HUE_IP, INPUT_LIGHT_ID } from '../actions/action_hue';
import { TOGGLE_HUE_LIGHT_SUCCESS } from '../actions/action_hue_toggle';

import { loadState, clearState } from '../localStorage';

function getInitialState() {
  const persistedState = loadState();
  console.log("persistedState", persistedState);
  try {
    if (persistedState.hue) return persistedState;
  } catch(err) {
    return {
        hueIP: '',
        hueLightID: '',
        hueConnected: false,
        hueUser: '',
        hueOn: false
      };
  }
}

export default function reducer(state=getInitialState(), action) {

    switch (action.type) {
      case CONNECT_HUE:
        return {...state, hueConnected: action.payload}
      case DISCONNECT_HUE:
        clearState();
        const cleanState = getInitialState();
        return {...state, ...cleanState, ...action.payload}
      case INPUT_HUE_USER:
        return {...state, hueUser: action.payload}
      case INPUT_HUE_IP:
        return {...state, hueIP: action.payload}
      case INPUT_LIGHT_ID:
        return {...state, hueLightID: action.payload}
      case TOGGLE_HUE_LIGHT_SUCCESS:
        return {...state, hueOn: !state.hueOn}
      default:
        return state;
    }
}
