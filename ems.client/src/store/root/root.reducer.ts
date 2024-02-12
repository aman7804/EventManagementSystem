import { combineReducers } from "redux";
import authReducer from "../auth/reducer";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import venueReducer from "../venue/reducer"
import cityReducer from "../city/reducer"
import photographyReducer from "../photography/reducer"
import decorationReducer from "../decoration/reducer"

const rootReducer = combineReducers<unknown>({
  auth: persistReducer(
    {
      key: "main-root",
      storage,
    },
    authReducer,
    ),
  city: cityReducer,
  venue: venueReducer,
  photography: photographyReducer,
  decoration: decorationReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;