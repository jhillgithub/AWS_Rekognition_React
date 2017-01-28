export function create_user(username, email) {
  return {
    type: 'CREATE_USER',
    payload: {
      username: username,
      email: email,
    },
  }
}

export function input_username(username) {
  return {
    type: 'INPUT_USERNAME',
    payload: username
  }
}

export function input_email(email) {
  return {
    type: 'INPUT_EMAIL',
    payload: email
  }
}
