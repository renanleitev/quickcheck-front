import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axiosInstance, { baseHorariosURL } from '../../../services/axios';
import fetchStatus, { errorMessage } from '../../../config/fetchStatus';
import { AgendamentoStatus } from '../../../config/enums';

// Atributos exclusivos de horario
export const initialHorario = {
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

export const getHorariosByEstabelecimentoIdAndStatusAndEspecialidade = createAsyncThunk(
  'horarios/getHorariosByEstabelecimentoIdAndStatusAndEspecialidade',
  async ({ estabelecimentoId, status, especialidade }) => {
    try {
      const url = `${baseHorariosURL}/search?estabelecimentoId=${estabelecimentoId}&status=${status}&especialidade=${especialidade}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Não foi possível obter os dados');
    }
  }
);

export const updateHorarioProntuario = createAsyncThunk(
  'horarios/updateHorarioProntuario',
  async ({ horario }) => {
    try {
      const url = `${baseHorariosURL}/${horario.id}`;
      await axiosInstance.put(url, horario);
      return horario;
    } catch (error) {
      console.log(error);
      throw new Error('Não foi possível atualizar os dados');
    }
  }
);

export const updateHorarioStatus = createAsyncThunk(
  'horarios/updateHorarioStatus',
  async ({ horario }) => {
    try {
      const url = `${baseHorariosURL}/${horario.id}`;
      await axiosInstance.put(url, horario);
      return horario;
    } catch (error) {
      console.log(error);
      throw new Error('Não foi possível atualizar os dados');
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
      })
      // updateHorarioProntuario
      .addCase(updateHorarioProntuario.fulfilled, (state, action) => {
        state.horarios.forEach((horario, index) => {
          if (horario.id === action.payload.id) {
            state.horarios[index] = { ...action.payload };
          }
        });
        state.fetchStatus = fetchStatus.SUCCESS;
        toast.success('Prontuário atualizado com sucesso!');
      })
      .addCase(updateHorarioProntuario.pending, (state) => {
        state.fetchStatus = fetchStatus.PENDING;
      })
      .addCase(updateHorarioProntuario.rejected, (state, action) => {
        state.fetchStatus = fetchStatus.FAILURE;
        state.error = action.error.message || errorMessage;
        toast.error(state.error);
      })
      // updateHorarioStatus
      .addCase(updateHorarioStatus.fulfilled, (state, action) => {
        state.horarios.forEach((horario, index) => {
          if (horario.id === action.payload.id) {
            state.horarios[index] = { ...action.payload };
          }
        });
        state.fetchStatus = fetchStatus.SUCCESS;
        switch (action.payload?.status) {
          case AgendamentoStatus.DISPONÍVEL:
            toast.success('Consulta criada com sucesso!');
            break;
          case AgendamentoStatus.AGENDADO:
            toast.success('Consulta agendada com sucesso!');
            break;
          case AgendamentoStatus.PENDENTE:
            toast.success('Consulta remarcada com sucesso!');
            break;
          case AgendamentoStatus.CANCELADO:
            toast.success('Consulta cancelada com sucesso!');
            break;
          case AgendamentoStatus.CONCLUÍDO:
          default:
            toast.success('Consulta concluída com sucesso!');
            break;
        }
      })
      .addCase(updateHorarioStatus.pending, (state) => {
        state.fetchStatus = fetchStatus.PENDING;
      })
      .addCase(updateHorarioStatus.rejected, (state, action) => {
        state.fetchStatus = fetchStatus.FAILURE;
        state.error = action.error.message || errorMessage;
        toast.error(state.error);
      });
  }
});

export const horariosReducer = horariosSlice.reducer;
