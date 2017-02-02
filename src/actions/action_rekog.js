export const UPDATE_PROGRESS = 'UPDATE_PROGRESS';
export const SAVE_FACE_DATA = 'SAVE_FACE_DATA';

export function update_progress(isProcessing) {
  return {
    type: UPDATE_PROGRESS,
    payload: isProcessing
  }
}

export function save_face_data(face) {
  return {
    type: SAVE_FACE_DATA,
    payload: face
  }
}
