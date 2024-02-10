import { combineReducers } from "redux";
import authReducer from "../auth/reducer";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import venueReducer from "../venue/reducer"
import cityReducer from "../city/reducer"
import photographyReducer from "../photography/reducer"

const rootReducer = combineReducers<unknown>({
  auth: persistReducer(
    {
      key: "main-root",
      storage,
    },
    authReducer,
    ),
  venue: venueReducer,
  city: cityReducer,
  photography: photographyReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;