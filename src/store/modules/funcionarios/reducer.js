import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, { baseFuncionariosURL } from '../../../services/axios';
import fetchStatus, { errorMessage } from '../../../config/fetchStatus';

export const initialFuncionario = {
  id: '',
  cpf: '',
  idade: 0,
  nascimento: new Date(),
  sexo: '',
  especialidade: '',
  crm: '',
};

export const initialState = {
  fetchStatus: fetchStatus.IDLE,
  error: '',
  funcionario: initialFuncionario,
  funcionarios: []
};

export const getFuncionario = createAsyncThunk('Funcionarios/getFuncionario', async (id) => {
  try {
    const url = `${baseFuncionariosURL}/${id}`;
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Não foi possível obter os dados");
  }
});

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
      });
  }
});

export const funcionariosReducer = funcionariosSlice.reducer;
