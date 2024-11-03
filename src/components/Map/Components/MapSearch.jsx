import { useState } from 'react';
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
  const initialData = {
    nome: '',
    especialidade: especialidadesOptions[0].value,
    tipo: estabelecimentosOptions[0].value
  };

  const [data, setData] = useState(initialData);

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
          placeholder="Tipo"
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
        <Button variant="contained" sx={{ width: buttonWidth, padding: '1rem' }}>
          Pesquisar
        </Button>
      </VerticalContainer>
    </Drawer>
  );
}

export default MapSearch;
