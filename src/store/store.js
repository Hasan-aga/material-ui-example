import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "@redux-saga/core";
import { rootSaga } from "./root-saga";

const sagaMiddleware = createSagaMiddleware(rootSaga);

const middleWares = [
  process.env.NODE_ENV === "none" && logger,
  sagaMiddleware,
].filter(Boolean);

const persistConfig = {
  key: "root", //save everything
  storage, //save in local storage
  blacklist: ["user", "categories"], //do not save user and categories
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
