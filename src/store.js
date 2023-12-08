import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "./redux/cartSlice";
import apiReducer from "../src/redux/reducers";
import wishReducer from "./wishSLice";

// Cart Reducer Configuration
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);

// Main Store Configuration
export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    data: apiReducer,
    wish: wishReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Persistor Configuration
export const persistor = persistStore(store);
