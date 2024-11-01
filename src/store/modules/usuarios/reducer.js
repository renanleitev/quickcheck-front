import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axiosInstance, { baseUsuariosURL } from '../../../services/axios';
import fetchStatus, { errorMessage } from '../../../config/fetchStatus';

// Atributos comuns para todas as entidades (cliente, funcionario e estabelecimento)
export const initialUsuario = {
  id: '',
  nome: '',
  email: '',
  role: '',
  telefone: '',
  endereco: '',
  imagem: '',
};

export const initialState = {
  fetchStatus: fetchStatus.IDLE,
  isLoggedIn: false,
  error: '',
  usuario: initialUsuario,
  usuarios: []
};

export const getUsuario = createAsyncThunk('usuarios/getUsuario', async (id) => {
  try {
    const url = `${baseUsuariosURL}/${id}`;
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Não foi possível obter os dados");
  }
});

export const loginUsuario = createAsyncThunk('usuarios/loginUsuario', async (loginUsuario) => {
  try {
    const url = `${baseUsuariosURL}/login`;
    const response = await axiosInstance.post(url, loginUsuario);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Usuário e/ou senha inválidos");
  }
});

export const usuariosSlice = createSlice({
  name: 'usuarios',
  initialState,
  reducers: {
    logoutUsuario: (state) => {
      state.isLoggedIn = false;
      state.usuario = initialUsuario;
      state.error = '';
      state.usuarios = [];
      state.fetchStatus = fetchStatus.IDLE;
    }
  },
  extraReducers(builder) {
    builder
      // getUsuario
      .addCase(getUsuario.fulfilled, (state, action) => {
        state.fetchStatus = fetchStatus.SUCCESS;
        state.usuario = action.payload;
      })
      .addCase(getUsuario.pending, (state) => {
        state.fetchStatus = fetchStatus.PENDING;
      })
      .addCase(getUsuario.rejected, (state, action) => {
        state.fetchStatus = fetchStatus.FAILURE;
        state.error = action.error.message || errorMessage;
        toast.error(state.error);
      })
      // loginUsuario
      .addCase(loginUsuario.fulfilled, (state, action) => {
        state.fetchStatus = fetchStatus.SUCCESS;
        state.usuario = action.payload;
        state.isLoggedIn = true;
        toast.success('Usuário autenticado com sucesso. Redirecionando...');
      })
      .addCase(loginUsuario.pending, (state) => {
        state.fetchStatus = fetchStatus.PENDING;
      })
      .addCase(loginUsuario.rejected, (state, action) => {
        state.fetchStatus = fetchStatus.FAILURE;
        state.error = action.error.message || errorMessage;
        toast.error(state.error);
      });
  }
});

export const { logoutUsuario } = usuariosSlice.actions;

export const usuariosReducer = usuariosSlice.reducer;
