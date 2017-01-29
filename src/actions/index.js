export const IMAGE_SELECTED = 'IMAGE_SELECTED';
export const UPDATE_BOUNDINGBOX = 'UPDATE_BOUNDINGBOX';

export function select_image(image_name) {
  return {
    type: IMAGE_SELECTED,
    payload: image_name
  }
}

export function update_boundingbox(boundingbox) {
  return {
    type: UPDATE_BOUNDINGBOX,
    payload: boundingbox
  }
}
