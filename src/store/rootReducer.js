import { combineReducers } from "redux";

import { authReducer } from "./slices/authSlice";
import { gamesReducer } from "./slices/gamesSlice";
import { userReducer } from "./slices/userSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  games: gamesReducer,
})

export default rootReducer
