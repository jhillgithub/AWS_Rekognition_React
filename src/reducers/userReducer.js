import { default_users } from '../test/default_users';

export default function reducer(state={
    user: default_users,
    inputUsername: '',
    inputEmail: '',
  }, action) {

    switch (action.type) {
      case 'CREATE_USER':
        return {...state, user: state.user.concat(action.payload), inputUsername: '', inputEmail: ''}
      case 'INPUT_USERNAME':
        return {...state, inputUsername: action.payload}
      case 'INPUT_EMAIL':
        return {...state, inputEmail: action.payload}
      default:
        return state;
    }
}
