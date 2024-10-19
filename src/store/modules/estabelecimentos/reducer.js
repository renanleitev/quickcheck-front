import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, { baseEstabelecimentosURL } from '../../../services/axios';
import fetchStatus, { errorMessage } from '../../../config/fetchStatus';

export const initialEstabelecimento = {
  id: '',
  cnpj: '',
  horarioFuncionamento: '',
  latitude: '',
  longitude: '',
  descricao: '',
  assinante: false
};

export const initialState = {
  fetchStatus: fetchStatus.IDLE,
  error: '',
  estabelecimento: initialEstabelecimento,
  estabelecimentos: []
};

export const getEstabelecimento = createAsyncThunk(
  'estabelecimentos/getEstabelecimento',
  async (id) => {
    try {
      const url = `${baseEstabelecimentosURL}/${id}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const estabelecimentosSlice = createSlice({
  name: 'estabelecimentos',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // getEstabelecimento
      .addCase(getEstabelecimento.fulfilled, (state, action) => {
        state.fetchStatus = fetchStatus.SUCCESS;
        state.estabelecimento = action.payload;
      })
      .addCase(getEstabelecimento.pending, (state) => {
        state.fetchStatus = fetchStatus.PENDING;
      })
      .addCase(getEstabelecimento.rejected, (state, action) => {
        state.fetchStatus = fetchStatus.FAILURE;
        state.error = action.error.message || errorMessage;
      });
  }
});

export const estabelecimentosReducer = estabelecimentosSlice.reducer;
