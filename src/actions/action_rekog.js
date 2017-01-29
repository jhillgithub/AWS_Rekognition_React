export const UPDATE_PROGRESS = 'UPDATE_PROGRESS';

export function update_progress(isProcessing) {
  return {
    type: UPDATE_PROGRESS,
    payload: isProcessing
  }
}
