import { combineReducers } from 'redux';

import { clientesReducer } from './clientes/reducer';
import { funcionariosReducer } from './funcionarios/reducer';
import { estabelecimentosReducer } from './estabelecimentos/reducer';
import { usuariosReducer } from './usuarios/reducer';
import { horariosReducer } from './horarios/reducer';

const rootReducer = combineReducers({
  clientes: clientesReducer,
  funcionarios: funcionariosReducer,
  estabelecimentos: estabelecimentosReducer,
  usuarios: usuariosReducer,
  horarios: horariosReducer,
});

export default rootReducer;
