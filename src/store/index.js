import { persistStore } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import persistedReducers from './modules/reduxPersist';
import rootReducer from './modules/rootReducer';

const store = configureStore({
  middleware: () => [thunk],
  reducer: persistedReducers(rootReducer),
});

export const persistor = persistStore(store);

export default store;