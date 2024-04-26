import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";


import { rootSaga } from "./root.saga";
import rootReducer from "./root.reducer";
import { persistStore } from "redux-persist";

const sagaMiddleware = createSagaMiddleware();


const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;

export const persistStorage = persistStore(store);