import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import axiosInstance, { baseUsuariosURL, baseFuncionariosURL } from '../../../services/axios';
import fetchStatus, { errorMessage } from '../../../config/fetchStatus';

// Atributos exclusivos de funcionario
export const initialFuncionario = {
  id: '',
  cpf: '',
  nascimento: new Date(),
  sexo: '',
  especialidade: '',
  crm: ''
};

export const initialState = {
  fetchStatus: fetchStatus.IDLE,
  error: '',
  funcionario: initialFuncionario,
  funcionarios: []
};

export const getFuncionario = createAsyncThunk('funcionarios/getFuncionario', async (id) => {
  try {
    const url = `${baseFuncionariosURL}/${id}`;
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Não foi possível obter os dados');
  }
});

export const getFuncionariosOptions = createAsyncThunk(
  'funcionarios/getFuncionariosOptions',
  async ({ especialidade, estabelecimentoNome, estabelecimentoTipo }) => {
    try {
      const url = `${baseFuncionariosURL}/search?especialidade=${especialidade}&estabelecimentoNome=${estabelecimentoNome}&estabelecimentoTipo=${estabelecimentoTipo}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Não foi possível obter os dados');
    }
  }
);

export const cadastrarFuncionario = createAsyncThunk(
  'funcionarios/cadastrarFuncionario',
  async (funcionario) => {
    try {
      // Primeiro cadastra o usuário e obtém o id como retorno
      const usuario = funcionario?.usuario;
      const responseUsuario = await axiosInstance.post(baseUsuariosURL, usuario);
      const usuarioId = responseUsuario.data;
      // Depois, cadastra o funcionario (relacionando com o usuário)
      const funcionarioFinal = {
        ...funcionario,
        usuario: { ...usuario, id: usuarioId }
      };
      const responseFuncionario = await axiosInstance.post(baseFuncionariosURL, funcionarioFinal);
      return { ...funcionarioFinal, id: responseFuncionario.data };
    } catch (error) {
      console.log(error);
      throw new Error('Não foi possível cadastrar usuário');
    }
  }
);

export const atualizarFuncionario = createAsyncThunk(
  'funcionarios/atualizarFuncionario',
  async (funcionario) => {
    try {
      const url = `${baseFuncionariosURL}/${funcionario?.id}`;
      await axiosInstance.put(url, funcionario);
      return funcionario;
    } catch (error) {
      console.log(error);
      throw new Error('Não foi possível atualizar usuário');
    }
  }
);

export const funcionariosSlice = createSlice({
  name: 'funcionarios',
  initialState,
  extraReducers(builder) {
    builder
      // getFuncionario
      .addCase(getFuncionario.fulfilled, (state, action) => {
        state.fetchStatus = fetchStatus.SUCCESS;
        state.funcionario = action.payload;
      })
      .addCase(getFuncionario.pending, (state) => {
        state.fetchStatus = fetchStatus.PENDING;
      })
      .addCase(getFuncionario.rejected, (state, action) => {
        state.fetchStatus = fetchStatus.FAILURE;
        state.error = action.error.message || errorMessage;
      })
      // getFuncionariosOptions
      .addCase(getFuncionariosOptions.fulfilled, (state, action) => {
        state.fetchStatus = fetchStatus.SUCCESS;
        state.funcionarios = action.payload;
      })
      .addCase(getFuncionariosOptions.pending, (state) => {
        state.fetchStatus = fetchStatus.PENDING;
      })
      .addCase(getFuncionariosOptions.rejected, (state, action) => {
        state.fetchStatus = fetchStatus.FAILURE;
        state.error = action.error.message || errorMessage;
      })
      // cadastrarFuncionario
      .addCase(cadastrarFuncionario.fulfilled, (state, action) => {
        state.fetchStatus = fetchStatus.SUCCESS;
        state.funcionario = action.payload;
        toast.success('Usuário cadastrado com sucesso! Redirecionando...');
      })
      .addCase(cadastrarFuncionario.pending, (state) => {
        state.fetchStatus = fetchStatus.PENDING;
      })
      .addCase(cadastrarFuncionario.rejected, (state, action) => {
        state.fetchStatus = fetchStatus.FAILURE;
        state.error = action.error.message || errorMessage;
        toast.error(state.error);
      })
      // atualizarFuncionario
      .addCase(atualizarFuncionario.fulfilled, (state, action) => {
        state.fetchStatus = fetchStatus.SUCCESS;
        state.cliente = action.payload;
        toast.success('Dados atualizados com sucesso!');
      })
      .addCase(atualizarFuncionario.pending, (state) => {
        state.fetchStatus = fetchStatus.PENDING;
      })
      .addCase(atualizarFuncionario.rejected, (state, action) => {
        state.fetchStatus = fetchStatus.FAILURE;
        state.error = action.error.message || errorMessage;
        toast.error(state.error);
      });
  }
});

export const funcionariosReducer = funcionariosSlice.reducer;
