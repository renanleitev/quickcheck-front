import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMap } from 'react-leaflet';
import { getEstabelecimentosByStatusAndEspecialidadeAndNomeAndTipo } from '../../../store/modules/estabelecimentos/reducer';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import colors from '../../../config/colors';
import { VerticalContainer } from '../../../config/GlobalStyle';
import Input from '../../Input/Input';
import { AgendamentoStatus, especialidadesOptions, zoomLevel } from '../../../config/enums';
import { estabelecimentosOptions } from '../../../mocks/estabelecimentos';
import PropTypes from 'prop-types';

const buttonWidth = '20rem';
const inputWidth = '20rem';

MapSearch.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired
};

function MapSearch({ open, setOpen }) {
  const estabelecimentos = useSelector(state => state?.estabelecimentos?.estabelecimentos) ?? [];

  const dispatch = useDispatch();

  const map = useMap();

  const initialData = {
    status: AgendamentoStatus.DISPONÍVEL,
    nome: '',
    especialidade: especialidadesOptions[0].value,
    tipo: estabelecimentosOptions[0].value
  };

  const [data, setData] = useState(initialData);

  const [errorNome, setErrorNome] = useState(false);
  const [errorNomeText, setErrorNomeText] = useState('');

  const handleValidation = () => {
    let hasError = false;

    // Validação do nome
    if (data.nome === '') {
      setErrorNome(true);
      setErrorNomeText('Nome não pode ser vazio');
      hasError = true;
    }

    // Lança erro se alguma validação falhar
    if (hasError) {
      throw new Error('Erro durante a pesquisa');
    }
  };

  const handleSearch = () => {
    handleValidation();
    if (data.nome !== '') {
      dispatch(getEstabelecimentosByStatusAndEspecialidadeAndNomeAndTipo({ ...data }));
      // Navega até o primeiro resultado disponível (em destaque)
      // TODO: Navegar até o primeiro estabelecimento pagante (propaganda?)
      map.flyTo([estabelecimentos[0]?.latitude, estabelecimentos[0]?.longitude], zoomLevel);
      // Redefinindo o estado de pesquisa
      setOpen(false);
      setData(initialData);
    }
  };

  useEffect(() => {
    // Se o usuário digitou algo ou abriu o modal de novo, redefine a mensagem de erro
    if (data.nome !== '' || open) {
      setErrorNome(false);
    }
  }, [data.nome, open]);

  return (
    <Drawer
      open={open}
      onClose={() => setOpen(false)}
      anchor="bottom"
      PaperProps={{
        sx: {
          backgroundColor: colors.primaryColor
        }
      }}
    >
      <VerticalContainer style={{ padding: '2rem' }}>
        <Input
          data={data}
          setData={setData}
          placeholder="Estabelecimento"
          keyName="tipo"
          inputWidth={inputWidth}
          select
          selectList={estabelecimentosOptions}
        />
        <Input
          data={data}
          setData={setData}
          placeholder="Nome"
          keyName="nome"
          inputWidth={inputWidth}
          error={errorNome}
          errorText={errorNomeText}
        />
        <Input
          data={data}
          setData={setData}
          placeholder="Especialidade"
          keyName="especialidade"
          inputWidth={inputWidth}
          select
          selectList={especialidadesOptions}
        />
        <Button
          variant="contained"
          sx={{ width: buttonWidth, padding: '1rem' }}
          onClick={handleSearch}
        >
          Pesquisar
        </Button>
      </VerticalContainer>
    </Drawer>
  );
}

export default MapSearch;
