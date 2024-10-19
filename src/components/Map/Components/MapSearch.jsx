import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import colors from '../../../config/colors';
import { VerticalContainer } from '../../../config/GlobalStyle';
import Input from '../../Input/Input';
import { especialidadesOptions } from '../../../config/enums';
import PropTypes from 'prop-types';
import { StyledTabs, StyledTab } from '../../Tab/Tab';

const buttonWidth = '20rem';
const inputWidth = '20rem';

MapSearch.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired
};

function MapSearch({ open, setOpen }) {
  const initialData = {
    nome: '',
    especialidade: especialidadesOptions[0].value
  };

  const [data, setData] = useState(initialData);

  const [tab, setTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

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
        <StyledTabs value={tab} onChange={handleTabChange} aria-label="quickcheck-search-tabs">
          <StyledTab label="Hospitais" value={0} />
          <StyledTab label="Clínicas" value={1} />
        </StyledTabs>
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
