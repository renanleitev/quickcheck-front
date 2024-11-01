import { combineReducers } from 'redux';
import { clientesReducer } from './clientes/reducer';
import { funcionariosReducer } from './funcionarios/reducer';
import { estabelecimentosReducer } from './estabelecimentos/reducer';
import { usuariosReducer } from './usuarios/reducer';

const rootReducer = combineReducers({
  clientes: clientesReducer,
  funcionarios: funcionariosReducer,
  estabelecimentos: estabelecimentosReducer,
  usuarios: usuariosReducer,
});

export default rootReducer;
