import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axiosInstance, {
  baseEstabelecimentosURL,
  baseFuncionariosURL
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
  hasSearched: false,
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

export const getEstabelecimentosByEspecialidadeAndNomeAndTipo = createAsyncThunk(
  'estabelecimentos/getEstabelecimentosByEspecialidadeAndNomeAndTipo',
  async ({ especialidade, nome, tipo }) => {
    try {
      // Estamos usando a URL de funcionários pois a pesquisa irá retornar os médicos (especialidade) e os respectivos hospitais/clínicas (nome e tipo)
      const url = `${baseFuncionariosURL}/search?especialidade=${especialidade}&estabelecimentoNome=${nome}&estabelecimentoTipo=${tipo}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Não foi possível obter os dados');
    }
  }
);

export const estabelecimentosSlice = createSlice({
  name: 'estabelecimentos',
  initialState,
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
        state.hasSearched = false;
      })
      .addCase(getEstabelecimentos.pending, (state) => {
        state.fetchStatus = fetchStatus.PENDING;
      })
      .addCase(getEstabelecimentos.rejected, (state, action) => {
        state.fetchStatus = fetchStatus.FAILURE;
        state.error = action.error.message || errorMessage;
      })
      // getEstabelecimentosByEspecialidadeAndNomeAndTipo
      .addCase(getEstabelecimentosByEspecialidadeAndNomeAndTipo.fulfilled, (state, action) => {
        const estabelecimentos = action.payload?.map(item => item?.estabelecimento) || [];
        toast.success(`Encontrado(s) ${estabelecimentos.length} resultado(s)`);
        state.fetchStatus = fetchStatus.SUCCESS;
        state.estabelecimentos = estabelecimentos;
        state.hasSearched = true;
      })
      .addCase(getEstabelecimentosByEspecialidadeAndNomeAndTipo.pending, (state) => {
        state.fetchStatus = fetchStatus.PENDING;
      })
      .addCase(getEstabelecimentosByEspecialidadeAndNomeAndTipo.rejected, (state, action) => {
        state.fetchStatus = fetchStatus.FAILURE;
        state.error = action.error.message || errorMessage;
      });
  }
});

export const estabelecimentosReducer = estabelecimentosSlice.reducer;
