import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import { Tab, Tabs } from '@mui/material';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import * as colors from '../../../config/colors';
import { VerticalContainer } from '../../../config/GlobalStyle';
import Input from '../../Input/Input';
import { especialidadesOptions } from '../../../config/enums';
import PropTypes from 'prop-types';

const tabWidth = '10rem';
const buttonWidth = '20rem';
const inputWidth = '20rem';

const StyledTabs = styled(Tabs)({
  borderBottom: `2px solid ${colors.primaryWhiteColor}`,
  '& .MuiTabs-indicator': {
    backgroundColor: colors.primaryWhiteColor
  }
});

const StyledTab = styled(Tab)({
  width: tabWidth,
  '&.Mui-selected': {
    backgroundColor: colors.primaryWhiteColor
  },
  '&.MuiTab-textColorPrimary': {
    color: colors.primaryWhiteColor
  }
});

MapSearch.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired
};

function MapSearch({ open, setOpen }) {
  const initalData = {
    nome: '',
    especialidade: especialidadesOptions[0].value
  };

  const [data, setData] = useState(initalData);

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
