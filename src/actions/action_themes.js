export const CHANGE_THEME = 'CHANGE_THEME';
export const COUNTER_EMOTIONS = 'COUNTER_EMOTIONS';

export function change_theme(color) {
  return {
    type: CHANGE_THEME,
    payload: color
  }
}

export function counter_emotions(counterEmotions) {
  return {
    type: COUNTER_EMOTIONS,
    payload: counterEmotions
  }
}
