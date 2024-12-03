import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import axiosInstance, { baseClientesURL, baseUsuariosURL } from '../../../services/axios';
import fetchStatus, { errorMessage } from '../../../config/fetchStatus';

// Atributos exclusivos de cliente
export const initialCliente = {
  id: '',
  cpf: '',
  nascimento: new Date(),
  sexo: '',
  latitude: '',
  longitude: '',
  comorbidades: []
};

export const initialState = {
  fetchStatus: fetchStatus.IDLE,
  error: '',
  cliente: initialCliente,
  clientes: []
};

export const getCliente = createAsyncThunk('clientes/getCliente', async (id) => {
  try {
    const url = `${baseClientesURL}/${id}`;
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Não foi possível obter os dados');
  }
});

export const cadastrarCliente = createAsyncThunk('clientes/cadastrarCliente', async (cliente) => {
  try {
    // Primeiro cadastra o usuário e obtém o id como retorno
    const usuario = cliente?.usuario;
    const responseUsuario = await axiosInstance.post(baseUsuariosURL, usuario);
    const usuarioId = responseUsuario.data;
    // Depois, cadastra o cliente (relacionando com o usuário)
    const clienteFinal = {
      ...cliente,
      usuario: { ...usuario, id: usuarioId }
    };
    const responseCliente = await axiosInstance.post(baseClientesURL, clienteFinal);
    return { ...clienteFinal, id: responseCliente.data };
  } catch (error) {
    console.log(error);
    throw new Error('Não foi possível cadastrar usuário');
  }
});

export const atualizarCliente = createAsyncThunk('clientes/atualizarCliente', async (cliente) => {
  try {
    const url = `${baseClientesURL}/${cliente?.id}`;
    await axiosInstance.put(url, cliente);
    return cliente;
  } catch (error) {
    console.log(error);
    throw new Error('Não foi possível atualizar usuário');
  }
});

export const clientesSlice = createSlice({
  name: 'clientes',
  initialState,
  extraReducers(builder) {
    builder
      // getCliente
      .addCase(getCliente.fulfilled, (state, action) => {
        state.fetchStatus = fetchStatus.SUCCESS;
        state.cliente = action.payload;
      })
      .addCase(getCliente.pending, (state) => {
        state.fetchStatus = fetchStatus.PENDING;
      })
      .addCase(getCliente.rejected, (state, action) => {
        state.fetchStatus = fetchStatus.FAILURE;
        state.error = action.error.message || errorMessage;
      })
      // cadastrarCliente
      .addCase(cadastrarCliente.fulfilled, (state, action) => {
        state.fetchStatus = fetchStatus.SUCCESS;
        state.cliente = action.payload;
        toast.success('Usuário cadastrado com sucesso! Redirecionando...');
      })
      .addCase(cadastrarCliente.pending, (state) => {
        state.fetchStatus = fetchStatus.PENDING;
      })
      .addCase(cadastrarCliente.rejected, (state, action) => {
        state.fetchStatus = fetchStatus.FAILURE;
        state.error = action.error.message || errorMessage;
        toast.error(state.error);
      })
      // atualizarCliente
      .addCase(atualizarCliente.fulfilled, (state, action) => {
        state.fetchStatus = fetchStatus.SUCCESS;
        state.cliente = action.payload;
        toast.success('Dados atualizados com sucesso!');
      })
      .addCase(atualizarCliente.pending, (state) => {
        state.fetchStatus = fetchStatus.PENDING;
      })
      .addCase(atualizarCliente.rejected, (state, action) => {
        state.fetchStatus = fetchStatus.FAILURE;
        state.error = action.error.message || errorMessage;
        toast.error(state.error);
      });
  }
});

export const clientesReducer = clientesSlice.reducer;
