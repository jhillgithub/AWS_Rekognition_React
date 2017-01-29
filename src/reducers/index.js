import { combineReducers } from "redux"

import user from "./userReducer"
import userTableConfig from "./userTableReducer"
import themeReducer from "./reducer_themes"
import galleryReducer from "./reducer_gallery"
import rekogReducer from "./reducer_rekog"

export default combineReducers({
  user,
  userTableConfig,
  themes: themeReducer,
  gallery: galleryReducer,
  rekog: rekogReducer

})
