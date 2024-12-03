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
  updateFetchStatus: fetchStatus.IDLE,
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

export const updateHorario = createAsyncThunk('horarios/updateHorario', async ({ horario }) => {
  try {
    const url = `${baseHorariosURL}/${horario.id}`;
    await axiosInstance.put(url, horario);
    return horario;
  } catch (error) {
    console.log(error);
    throw new Error('Houve um erro. Por favor, tente novamente mais tarde.');
  }
});

export const createHorario = createAsyncThunk('horarios/createHorario', async ({ horario }) => {
  try {
    await axiosInstance.post(baseHorariosURL, horario);
    return horario;
  } catch (error) {
    console.log(error);
    throw new Error('Não foi possível cadastrar a consulta');
  }
});

export const searchHorarios = createAsyncThunk(
  'horarios/searchHorarios',
  async ({ horarioAtendimento, status, especialidade, nomeFuncionario, nomeEstabelecimento }) => {
    try {
      const url = `${baseHorariosURL}/search/horarios?horarioAtendimento=${horarioAtendimento}&status=${status}&especialidade=${especialidade}&nomeEstabelecimento=${nomeEstabelecimento}&nomeFuncionario=${nomeFuncionario}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Não foi possível obter os dados');
    }
  }
);

export const getHorariosByClienteAndStatus = createAsyncThunk(
  'horarios/getHorariosByClienteAndStatus',
  async ({ clienteId, status, especialidade, nomeEstabelecimento, nomeFuncionario }) => {
    try {
      let url = `${baseHorariosURL}/search/clientes?clienteId=${clienteId}`;
      if (status) {
        url += `&status=${status}`;
      }
      if (especialidade) {
        url += `&especialidade=${especialidade}`;
      }
      if (nomeEstabelecimento) {
        url += `&nomeEstabelecimento=${nomeEstabelecimento}`;
      }
      if (nomeFuncionario) {
        url += `&nomeFuncionario=${nomeFuncionario}`;
      }
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Não foi possível obter os dados');
    }
  }
);

export const getHorariosByFuncionarioAndStatus = createAsyncThunk(
  'horarios/getHorariosByFuncionarioAndStatus',
  async ({ funcionarioId, status, nomeEstabelecimento, nomeCliente }) => {
    try {
      let url = `${baseHorariosURL}/search/funcionarios?funcionarioId=${funcionarioId}`;
      if (status) {
        url += `&status=${status}`;
      }
      if (nomeEstabelecimento) {
        url += `&nomeEstabelecimento=${nomeEstabelecimento}`;
      }
      if (nomeCliente) {
        url += `&nomeCliente=${nomeCliente}`;
      }
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Não foi possível obter os dados');
    }
  }
);

export const getHorariosByEstabelecimentoAndStatus = createAsyncThunk(
  'horarios/getHorariosByEstabelecimentoAndStatus',
  async ({ estabelecimentoId, status, nomeFuncionario, especialidade, nomeCliente }) => {
    try {
      let url = `${baseHorariosURL}/search/estabelecimentos?estabelecimentoId=${estabelecimentoId}`;
      if (status) {
        url += `&status=${status}`;
      }
      if (nomeFuncionario) {
        url += `&nomeFuncionario=${nomeFuncionario}`;
      }
      if (especialidade) {
        url += `&especialidade=${especialidade}`;
      }
      if (nomeCliente) {
        url += `&nomeCliente=${nomeCliente}`;
      }
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
  reducers: {
    resetHorarios: (state) => {
      state.horarios = [];
      state.fetchStatus = fetchStatus.IDLE;
      state.updateFetchStatus = fetchStatus.IDLE;
      state.error = '';
    }
  },
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
      // createHorario
      .addCase(createHorario.fulfilled, (state) => {
        state.fetchStatus = fetchStatus.SUCCESS;
        toast.success('Horário cadastrado com sucesso!');
      })
      .addCase(createHorario.pending, (state) => {
        state.fetchStatus = fetchStatus.PENDING;
      })
      .addCase(createHorario.rejected, (state, action) => {
        state.fetchStatus = fetchStatus.FAILURE;
        state.error = action.error.message || errorMessage;
        toast.error(state.error);
      })
      // searchHorarios
      .addCase(searchHorarios.fulfilled, (state, action) => {
        if (action.payload.length > 0) {
          toast.success(`Encontrado(s) ${action.payload.length} resultado(s)`);
          state.fetchStatus = fetchStatus.SUCCESS;
          state.horarios = action.payload;
        } else {
          toast.error('Não foi possível encontrar resultados');
          state.fetchStatus = fetchStatus.FAILURE;
          state.horarios = action.payload;
        }
      })
      .addCase(searchHorarios.pending, (state) => {
        state.fetchStatus = fetchStatus.PENDING;
      })
      .addCase(searchHorarios.rejected, (state, action) => {
        state.fetchStatus = fetchStatus.FAILURE;
        state.error = action.error.message || errorMessage;
      })
      // getHorariosByClienteAndStatus
      .addCase(getHorariosByClienteAndStatus.fulfilled, (state, action) => {
        state.fetchStatus = fetchStatus.SUCCESS;
        state.horarios = action.payload;
      })
      .addCase(getHorariosByClienteAndStatus.pending, (state) => {
        state.fetchStatus = fetchStatus.PENDING;
      })
      .addCase(getHorariosByClienteAndStatus.rejected, (state, action) => {
        state.fetchStatus = fetchStatus.FAILURE;
        state.error = action.error.message || errorMessage;
      })
      // getHorariosByFuncionarioAndStatus
      .addCase(getHorariosByFuncionarioAndStatus.fulfilled, (state, action) => {
        state.fetchStatus = fetchStatus.SUCCESS;
        state.horarios = action.payload;
      })
      .addCase(getHorariosByFuncionarioAndStatus.pending, (state) => {
        state.fetchStatus = fetchStatus.PENDING;
      })
      .addCase(getHorariosByFuncionarioAndStatus.rejected, (state, action) => {
        state.fetchStatus = fetchStatus.FAILURE;
        state.error = action.error.message || errorMessage;
      })
      // getHorariosByEstabelecimentoAndStatus
      .addCase(getHorariosByEstabelecimentoAndStatus.fulfilled, (state, action) => {
        state.fetchStatus = fetchStatus.SUCCESS;
        state.horarios = action.payload;
      })
      .addCase(getHorariosByEstabelecimentoAndStatus.pending, (state) => {
        state.fetchStatus = fetchStatus.PENDING;
      })
      .addCase(getHorariosByEstabelecimentoAndStatus.rejected, (state, action) => {
        state.fetchStatus = fetchStatus.FAILURE;
        state.error = action.error.message || errorMessage;
      })
      // updateHorario
      .addCase(updateHorario.fulfilled, (state, action) => {
        state.horarios.forEach((horario, index) => {
          if (horario.id === action.payload.id) {
            state.horarios[index] = { ...action.payload };
          }
        });
        state.updateFetchStatus = fetchStatus.SUCCESS;
        state.error = '';
        if (action.payload?.mensagemSucesso) {
          toast.success(action.payload?.mensagemSucesso);
        } else {
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
              toast.success('Consulta atualizada com sucesso!');
              break;
          }
        }
      })
      .addCase(updateHorario.pending, (state) => {
        state.updateFetchStatus = fetchStatus.PENDING;
      })
      .addCase(updateHorario.rejected, (state, action) => {
        state.updateFetchStatus = fetchStatus.FAILURE;
        state.error = action.error.message || errorMessage;
        toast.error(state.error);
      });
  }
});

export const { resetHorarios } = horariosSlice.actions;

export const horariosReducer = horariosSlice.reducer;
