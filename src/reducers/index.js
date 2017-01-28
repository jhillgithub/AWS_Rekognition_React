import { combineReducers } from "redux"

import user from "./userReducer"
import userTableConfig from "./userTableReducer"
import themeReducer from "./reducer_themes"
import galleryReducer from "./reducer_gallery"

export default combineReducers({
  user,
  userTableConfig,
  themes: themeReducer,
  images: galleryReducer

})
