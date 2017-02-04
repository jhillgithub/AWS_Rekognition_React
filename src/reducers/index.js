import { combineReducers } from "redux"

import user from "./userReducer"
import userTableConfig from "./userTableReducer"
import themeReducer from "./reducer_themes"
import galleryReducer from "./reducer_gallery"
import rekogReducer from "./reducer_rekog"
import selectedReducer from "./reducer_selected"
import boundingboxReducer from "./reducer_boundingbox"
import hueReducer from "./reducer_hue"

export default combineReducers({
  user,
  userTableConfig,
  themes: themeReducer,
  gallery: galleryReducer,
  rekog: rekogReducer,
  selected_image: selectedReducer,
  boundingbox: boundingboxReducer,
  hue: hueReducer
})
