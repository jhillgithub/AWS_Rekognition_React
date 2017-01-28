import { combineReducers } from "redux"

import user from "./userReducer"
import userTableConfig from "./userTableReducer"
import themeReducer from "./reducer_themes"

export default combineReducers({
  user,
  userTableConfig,
  themes: themeReducer

})
