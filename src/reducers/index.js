import { combineReducers } from "redux"

import userReducer from "./reducer_user"
import userTableReducer from "./reducer_user_table"
import themeReducer from "./reducer_themes"
import galleryReducer from "./reducer_gallery"
import rekogReducer from "./reducer_rekog"
import selectedReducer from "./reducer_selected"
import boundingboxReducer from "./reducer_boundingbox"
import hueReducer from "./reducer_hue"

export default combineReducers({
  user: userReducer,
  userTableConfig: userTableReducer,
  themes: themeReducer,
  gallery: galleryReducer,
  rekog: rekogReducer,
  selected_image: selectedReducer,
  boundingbox: boundingboxReducer,
  hue: hueReducer
})
