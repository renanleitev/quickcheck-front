import { combineReducers } from 'redux';
import { clientesReducer } from './clientes/reducer';
import { funcionariosReducer } from './funcionarios/reducer';
import { estabelecimentosReducer } from './estabelecimentos/reducer';

const rootReducer = combineReducers({
  clientes: clientesReducer,
  funcionarios: funcionariosReducer,
  estabelecimentos: estabelecimentosReducer,
});

export default rootReducer;