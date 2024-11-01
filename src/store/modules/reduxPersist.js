import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persistedReducers = persistReducer(
    {
      key: 'react-base',
      storage,
      whitelist: ['clientes', 'funcionarios', 'estabelecimentos', 'usuarios']
    },
    reducers
  );
  return persistedReducers;
};
