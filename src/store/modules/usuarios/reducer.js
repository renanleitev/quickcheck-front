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

export const criarUsuario = createAsyncThunk('usuarios/criarUsuario', async (usuario) => {
  try {
    await axiosInstance.post(baseUsuariosURL, usuario);
    return loginUsuario;
  } catch (error) {
    console.log(error);
    throw new Error('Não foi possível criar o usuário');
  }
});

export const usuariosSlice = createSlice({
  name: 'usuarios',
  initialState,
  reducers: {
    logoutUsuario: (state) => {
      state.isLoggedIn = false;
      state.entidade = initialEntidade;
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
      // alterarSenha
      .addCase(criarUsuario.fulfilled, (state, action) => {
        state.fetchStatus = fetchStatus.SUCCESS;
        state.entidade.usuario = { ...action.payload };
        toast.success('Usuário criado com sucesso! Redirecionando...');
      })
      .addCase(criarUsuario.pending, (state) => {
        state.fetchStatus = fetchStatus.PENDING;
      })
      .addCase(criarUsuario.rejected, (state, action) => {
        state.fetchStatus = fetchStatus.FAILURE;
        state.error = action.error.message || errorMessage;
        toast.error(state.error);
      });
  }
});

export const { logoutUsuario } = usuariosSlice.actions;

export const usuariosReducer = usuariosSlice.reducer;
