import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import axiosInstance, { baseUsuariosURL } from '../../../services/axios';
import fetchStatus, { errorMessage } from '../../../config/fetchStatus';

// Atributos comuns para todas as entidades (cliente, funcionario e estabelecimento)
export const initialEntidade = {
  id: '',
  nome: '',
  email: '',
  role: '',
  telefone: '',
  endereco: '',
  imagem: '',
  usuario: undefined
};

export const initialState = {
  fetchStatus: fetchStatus.IDLE,
  isLoggedIn: false,
  error: '',
  latitude: 0,
  longitude: 0,
  // entidade = cliente | funcionario | estabelecimento => todos possuem um usuario
  entidade: initialEntidade,
  usuarios: []
};

export const getUsuario = createAsyncThunk('usuarios/getUsuario', async (id) => {
  try {
    const url = `${baseUsuariosURL}/${id}`;
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Não foi possível obter os dados');
  }
});

export const loginUsuario = createAsyncThunk('usuarios/loginUsuario', async (loginUsuario) => {
  try {
    const url = `${baseUsuariosURL}/login`;
    const response = await axiosInstance.post(url, loginUsuario);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Usuário e/ou senha inválidos');
  }
});

export const alterarSenha = createAsyncThunk('usuarios/alterarSenha', async (loginUsuario) => {
  try {
    if (loginUsuario?.senha !== loginUsuario?.repetirSenha) {
      throw new Error('As senhas estão diferentes');
    }
    const url = `${baseUsuariosURL}/${loginUsuario?.id}`;
    await axiosInstance.put(url, loginUsuario);
    return loginUsuario;
  } catch (error) {
    console.log(error);
    throw new Error('Não foi possível atualizar a senha');
  }
});

export const atualizarUsuario = createAsyncThunk('usuarios/atualizarUsuario', async (usuario) => {
  try {
    const url = `${baseUsuariosURL}/${usuario?.id}`;
    await axiosInstance.put(url, usuario);
    return usuario;
  } catch (error) {
    console.log(error);
    throw new Error('Não foi possível atualizar usuário');
  }
});

export const usuariosSlice = createSlice({
  name: 'usuarios',
  initialState,
  reducers: {
    loginCadastro: (state, action) => {
      state.isLoggedIn = true;
      state.entidade = action.payload;
      state.fetchStatus = fetchStatus.SUCCESS;
    },
    logoutUsuario: (state) => {
      state.isLoggedIn = false;
      state.entidade = initialEntidade;
      state.error = '';
      state.usuarios = [];
      state.fetchStatus = fetchStatus.IDLE;
    },
    updateCoords: (state, action) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    }
  },
  extraReducers(builder) {
    builder
      // getUsuario
      .addCase(getUsuario.fulfilled, (state, action) => {
        state.fetchStatus = fetchStatus.SUCCESS;
        state.entidade = { ...action.payload };
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
        state.entidade = { ...action.payload };
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
      })
      // alterarSenha
      .addCase(alterarSenha.fulfilled, (state, action) => {
        state.fetchStatus = fetchStatus.SUCCESS;
        state.entidade.usuario = { ...action.payload };
        toast.success('Senha atualizada com sucesso');
      })
      .addCase(alterarSenha.pending, (state) => {
        state.fetchStatus = fetchStatus.PENDING;
      })
      .addCase(alterarSenha.rejected, (state, action) => {
        state.fetchStatus = fetchStatus.FAILURE;
        state.error = action.error.message || errorMessage;
        toast.error(state.error);
      })
      // atualizarCliente
      .addCase(atualizarUsuario.fulfilled, (state, action) => {
        state.fetchStatus = fetchStatus.SUCCESS;
        state.entidade = action.payload;
      })
      .addCase(atualizarUsuario.pending, (state) => {
        state.fetchStatus = fetchStatus.PENDING;
      })
      .addCase(atualizarUsuario.rejected, (state, action) => {
        state.fetchStatus = fetchStatus.FAILURE;
        state.error = action.error.message || errorMessage;
        toast.error(state.error);
      });
  }
});

export const { logoutUsuario, loginCadastro, updateCoords } = usuariosSlice.actions;

export const usuariosReducer = usuariosSlice.reducer;
