import { combineReducers } from "redux";

import { authReducer } from "./slices/authSlice";
import { categoriesReducer } from "./slices/categoriesSlice";
import { gamesReducer } from "./slices/gamesSlice";
import { userReducer } from "./slices/userSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  games: gamesReducer,
  categories: categoriesReducer,
})

export default rootReducer
