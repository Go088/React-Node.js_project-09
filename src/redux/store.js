import { configureStore, combineReducers } from "@reduxjs/toolkit";
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
import authReducer from "./features/auth/authSlice.js";
import boardsReducer from "./features/boards/boardsSlice.js";
import cardsReducer from "./features/cards/cardsSlice.js";
import needHelpModalReducer from "./features/modals/needHelpModal/slice";
import themeReducer from "./features/theme/themeSlice.js";
import userReducer from "./features/user/userSlice.js";
import { boardReducer } from "./features/boardss/slice.js";
import { filterReducer } from "./features/filter/slice.js";

const authPersistConfig = {
  key: "authSlice",
  storage,
  whitelist: ["token", "isLoggedIn"],
};
const filterPersistConfig = {
  key: "filter",
  storage,
  whitelist: ["text"],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const rootReducer = combineReducers({
  board: boardReducer,
  auth: persistedAuthReducer,
  boards: boardsReducer,
  cards: cardsReducer,
  needHelpModal: needHelpModalReducer,
  theme: themeReducer,
  user: userReducer,
  filter: persistReducer(filterPersistConfig, filterReducer),
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
