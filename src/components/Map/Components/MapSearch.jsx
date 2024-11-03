import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getEstabelecimentosByEspecialidadeAndNomeAndTipo } from '../../../store/modules/estabelecimentos/reducer';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import colors from '../../../config/colors';
import { VerticalContainer } from '../../../config/GlobalStyle';
import Input from '../../Input/Input';
import { especialidadesOptions } from '../../../config/enums';
import { estabelecimentosOptions } from '../../../mocks/estabelecimentos';
import PropTypes from 'prop-types';

const buttonWidth = '20rem';
const inputWidth = '20rem';

MapSearch.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired
};

function MapSearch({ open, setOpen }) {
  const dispatch = useDispatch();

  const initialData = {
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
      dispatch(getEstabelecimentosByEspecialidadeAndNomeAndTipo({ ...data }));
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
