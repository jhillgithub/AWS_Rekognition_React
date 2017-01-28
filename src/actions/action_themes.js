export const CHANGE_THEME = 'CHANGE_THEME';

export function change_theme(color) {
  return {
    type: CHANGE_THEME,
    payload: color
  }
}
