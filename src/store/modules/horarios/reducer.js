import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axiosInstance, { baseHorariosURL } from '../../../services/axios';
import fetchStatus, { errorMessage } from '../../../config/fetchStatus';

// Atributos exclusivos de horario
export const initialHorario = {
  id: '',
  descricao: '',
  horarioAtendimento: new Date(),
  horarioAgendamento: new Date(),
  prontuario: '',
  status: ''
};

export const initialState = {
  fetchStatus: fetchStatus.IDLE,
  error: '',
  horarios: []
};

export const getHorarios = createAsyncThunk('horarios/getHorarios', async () => {
  try {
    const response = await axiosInstance.get(baseHorariosURL);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Não foi possível obter os dados');
  }
});

export const getHorariosByEstabelecimentoIdAndStatus = createAsyncThunk(
  'horarios/getHorariosByEstabelecimentoIdAndStatus',
  async ({ estabelecimentoId, status }) => {
    try {
      const url = `${baseHorariosURL}/search?estabelecimentoId=${estabelecimentoId}&status=${status}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Não foi possível obter os dados');
    }
  }
);

export const horariosSlice = createSlice({
  name: 'horarios',
  initialState,
  extraReducers(builder) {
    builder
      // getHorarios
      .addCase(getHorarios.fulfilled, (state, action) => {
        state.fetchStatus = fetchStatus.SUCCESS;
        state.horarios = action.payload;
      })
      .addCase(getHorarios.pending, (state) => {
        state.fetchStatus = fetchStatus.PENDING;
      })
      .addCase(getHorarios.rejected, (state, action) => {
        state.fetchStatus = fetchStatus.FAILURE;
        state.error = action.error.message || errorMessage;
        toast.error(state.error);
      })
      // getHorariosByEstabelecimentoIdAndStatus
      .addCase(getHorariosByEstabelecimentoIdAndStatus.fulfilled, (state, action) => {
        state.fetchStatus = fetchStatus.SUCCESS;
        state.horarios = action.payload;
      })
      .addCase(getHorariosByEstabelecimentoIdAndStatus.pending, (state) => {
        state.fetchStatus = fetchStatus.PENDING;
      })
      .addCase(getHorariosByEstabelecimentoIdAndStatus.rejected, (state, action) => {
        state.fetchStatus = fetchStatus.FAILURE;
        state.error = action.error.message || errorMessage;
        toast.error(state.error);
      });
  }
});

export const horariosReducer = horariosSlice.reducer;
