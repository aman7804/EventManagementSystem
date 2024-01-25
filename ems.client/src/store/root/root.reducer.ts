import { combineReducers } from "redux";
import authReducer from "../auth/reducer";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const rootReducer = combineReducers<unknown>({
  auth: persistReducer(
    {
      key: "main-root",
      storage,
    },
    authReducer,
  )
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;