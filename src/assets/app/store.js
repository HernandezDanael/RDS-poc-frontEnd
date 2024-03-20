import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import ThemeReducer from '../feature/ThemeReducer';

const persistConfig = {
  key: 'rds',
  version: 1,
  storage,
  whitelist: ['theme', 'copieSaisie'],
};
const reducers = combineReducers({
  theme: ThemeReducer,
});

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
let persistor = persistStore(store);
export { persistor };

export default store;
