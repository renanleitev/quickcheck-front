import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import axiosInstance, {
  baseEstabelecimentosURL,
  baseHorariosURL,
  baseUsuariosURL
} from '../../../services/axios';
import fetchStatus, { errorMessage } from '../../../config/fetchStatus';

// Atributos exclusivos de estabelecimento
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
  latitude: 0,
  longitude: 0,
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
      console.log(error);
      throw new Error('Não foi possível obter os dados');
    }
  }
);

export const criarEstabelecimento = createAsyncThunk(
  'estabelecimentos/criarEstabelecimento',
  async (estabelecimento) => {
    try {
      // Primeiro cadastra o usuário e obtém o id como retorno
      const usuario = estabelecimento?.usuario;
      const responseUsuario = await axiosInstance.post(baseUsuariosURL, usuario);
      const usuarioId = responseUsuario.data;
      // Depois, cadastra o funcionario (relacionando com o usuário)
      const responseEstabelecimento = await axiosInstance.post(baseEstabelecimentosURL, {
        ...estabelecimento,
        usuario: { ...usuario, id: usuarioId }
      });
      return responseEstabelecimento.data;
    } catch (error) {
      console.log(error);
      throw new Error('Não foi possível cadastrar usuário');
    }
  }
);

export const getEstabelecimentos = createAsyncThunk(
  'estabelecimentos/getEstabelecimentos',
  async () => {
    try {
      const response = await axiosInstance.get(baseEstabelecimentosURL);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Não foi possível obter os dados');
    }
  }
);

export const getEstabelecimentosByStatusAndEspecialidadeAndHorario = createAsyncThunk(
  'estabelecimentos/getEstabelecimentosByStatusAndEspecialidadeAndHorario',
  async ({ horarioAtendimento, status, especialidade, nomeFuncionario, nomeEstabelecimento }) => {
    try {
      // Estamos usando a URL de horários pois a pesquisa irá retornar os médicos (especialidade) e os respectivos hospitais/clínicas (nome)
      const url = `${baseHorariosURL}/search/estabelecimentos?horarioAtendimento=${horarioAtendimento}&status=${status}&especialidade=${especialidade}&nomeEstabelecimento=${nomeEstabelecimento}&nomeFuncionario=${nomeFuncionario}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Não foi possível obter os dados');
    }
  }
);

export const atualizarEstabelecimento = createAsyncThunk(
  'estabelecimentos/atualizarEstabelecimentos',
  async (estabelecimento) => {
    try {
      const url = `${baseEstabelecimentosURL}/${estabelecimento?.id}`;
      await axiosInstance.put(url, estabelecimento);
      return estabelecimento;
    } catch (error) {
      console.log(error);
      throw new Error('Não foi possível atualizar usuário');
    }
  }
);

export const estabelecimentosSlice = createSlice({
  name: 'estabelecimentos',
  initialState,
  reducers: {
    setEstabelecimentoCoords: (state, action) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    }
  },
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
      })
      // getEstabelecimentos
      .addCase(getEstabelecimentos.fulfilled, (state, action) => {
        state.fetchStatus = fetchStatus.SUCCESS;
        state.estabelecimentos = action.payload;
      })
      .addCase(getEstabelecimentos.pending, (state) => {
        state.fetchStatus = fetchStatus.PENDING;
      })
      .addCase(getEstabelecimentos.rejected, (state, action) => {
        state.fetchStatus = fetchStatus.FAILURE;
        state.error = action.error.message || errorMessage;
      })
      // getEstabelecimentosByStatusAndEspecialidadeAndHorario
      .addCase(getEstabelecimentosByStatusAndEspecialidadeAndHorario.fulfilled, (state, action) => {
        const estabelecimentos = action.payload?.map((item) => item?.estabelecimento) || [];
        if (estabelecimentos.length > 0) {
          toast.success(`Encontrado(s) ${estabelecimentos.length} resultado(s)`);
          state.fetchStatus = fetchStatus.SUCCESS;
          state.estabelecimentos = estabelecimentos;
          state.latitude = estabelecimentos[0]?.latitude ?? 0;
          state.longitude = estabelecimentos[0]?.longitude ?? 0;
        } else {
          toast.error('Não foi possível encontrar resultados');
          state.fetchStatus = fetchStatus.FAILURE;
          state.estabelecimentos = estabelecimentos;
          state.latitude = 0;
          state.longitude = 0;
        }
      })
      .addCase(getEstabelecimentosByStatusAndEspecialidadeAndHorario.pending, (state) => {
        state.fetchStatus = fetchStatus.PENDING;
      })
      .addCase(getEstabelecimentosByStatusAndEspecialidadeAndHorario.rejected, (state, action) => {
        state.fetchStatus = fetchStatus.FAILURE;
        state.error = action.error.message || errorMessage;
      })
      // criarEstabelecimento
      .addCase(criarEstabelecimento.fulfilled, (state, action) => {
        state.fetchStatus = fetchStatus.SUCCESS;
        state.estabelecimento = action.payload;
        toast.success('Usuário cadastrado com sucesso! Redirecionando...');
      })
      .addCase(criarEstabelecimento.pending, (state) => {
        state.fetchStatus = fetchStatus.PENDING;
      })
      .addCase(criarEstabelecimento.rejected, (state, action) => {
        state.fetchStatus = fetchStatus.FAILURE;
        state.error = action.error.message || errorMessage;
        toast.error(state.error);
      })
      // atualizarEstabelecimento
      .addCase(atualizarEstabelecimento.fulfilled, (state, action) => {
        state.fetchStatus = fetchStatus.SUCCESS;
        state.cliente = action.payload;
        toast.success('Dados atualizados com sucesso!');
      })
      .addCase(atualizarEstabelecimento.pending, (state) => {
        state.fetchStatus = fetchStatus.PENDING;
      })
      .addCase(atualizarEstabelecimento.rejected, (state, action) => {
        state.fetchStatus = fetchStatus.FAILURE;
        state.error = action.error.message || errorMessage;
        toast.error(state.error);
      });
  }
});

export const { setEstabelecimentoCoords } = estabelecimentosSlice.actions;

export const estabelecimentosReducer = estabelecimentosSlice.reducer;
