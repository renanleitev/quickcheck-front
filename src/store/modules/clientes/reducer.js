import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, { baseClientesURL } from '../../../services/axios';
import fetchStatus, { errorMessage } from '../../../config/fetchStatus';

export const initialCliente = {
  id: '',
  cpf: '',
  idade: 0,
  nascimento: new Date(),
  sexo: '',
  latitude: '',
  longitude: '',
  numeroCartaoSUS: '',
  comorbidades: [],
  usuario: undefined
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
    throw new Error("Não foi possível obter os dados");
  }
});

export const clientesSlice = createSlice({
  name: 'clientes',
  initialState,
  reducers: {
    loginCliente: (state, action) => {
      state.cliente = { ...action.payload };
    },
    logoutCliente: (state) => {
      state.cliente = initialCliente;
      state.error = '';
      state.clientes = [];
      state.fetchStatus = fetchStatus.IDLE;
    }
  },
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
      });
  }
});

export const { loginCliente, logoutCliente } = clientesSlice.actions;

export const clientesReducer = clientesSlice.reducer;
