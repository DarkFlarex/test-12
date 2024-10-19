import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {usersReducer} from "../features/users/usersSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore } from 'redux-persist';
import {photosReducer} from "../features/Photo/PhotosSlice";

const usersPersistConfig = {
  key: 'photoGalleries:users',
  storage,
  whitelist: ['user']
};

const rootReducer = combineReducers({
  photos: photosReducer,
  users: persistReducer(usersPersistConfig, usersReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware:(getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck:{
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE,REGISTER],
      }
    });
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
