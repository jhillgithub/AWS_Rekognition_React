export const UPDATE_GALLERY = 'UPDATE_GALLERY';

export function update_gallery(arr) {
  return {
    type: UPDATE_GALLERY,
    payload: arr
  }
}
