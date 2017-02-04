export const CONNECT_HUE = 'CONNECT_HUE';
export const INPUT_HUE_USER = 'INPUT_HUE_USER';
export const INPUT_HUE_IP = 'INPUT_HUE_IP';
export const INPUT_LIGHT_ID = 'INPUT_LIGHT_ID';

export function connect_hue(connected) {
  return {
    type: 'CONNECT_HUE',
    payload: connected
  }
}

export function input_hue_user(hueUser) {
  return {
    type: 'INPUT_HUE_USER',
    payload: hueUser
  }
}

export function input_hue_ip(hueIP) {
  return {
    type: 'INPUT_HUE_IP',
    payload: hueIP
  }
}

export function input_hue_light_id(hueLightID) {
  return {
    type: 'INPUT_LIGHT_ID',
    payload: hueLightID
  }
}
