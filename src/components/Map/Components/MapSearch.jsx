import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMap } from 'react-leaflet';

import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';

import { getEstabelecimentosByStatusAndEspecialidadeAndHorario } from '../../../store/modules/estabelecimentos/reducer';
import colors from '../../../config/colors';
import { VerticalContainer } from '../../../config/GlobalStyle';
import Input, { InputType } from '../../Input/Input';
import { AgendamentoStatus, especialidadesOptions, zoomLevel } from '../../../config/enums';
import { formatCalendarDate } from '../../../hooks/formatDate';
import fetchStatus from '../../../config/fetchStatus';
import PropTypes from 'prop-types';

const buttonWidth = '20rem';
const inputWidth = '20rem';

MapSearch.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired
};

function MapSearch({ open, setOpen }) {
  const estabelecimentos = useSelector((state) => state?.estabelecimentos?.estabelecimentos) ?? [];

  const fetchStatusInfo = useSelector((state) => state?.estabelecimentos?.fetchStatus) ?? false;

  const dispatch = useDispatch();

  const map = useMap();

  const initialData = {
    status: AgendamentoStatus.DISPONÍVEL,
    nomeFuncionario: '',
    nomeEstabelecimento: '',
    horarioAtendimento: formatCalendarDate(new Date().toISOString()), // Convertendo para o formato yyyy-MM-dd
    especialidade: especialidadesOptions[0].value
  };

  const [data, setData] = useState(initialData);

  const handleSearch = () => {
    dispatch(
      getEstabelecimentosByStatusAndEspecialidadeAndHorario({
        ...data,
        horarioAtendimento: `${data.horarioAtendimento}T00:00:00` // Pesquisando horários a partir dessa data
      })
    );
    if (fetchStatusInfo === fetchStatus.SUCCESS) {
      // Navega até o primeiro resultado disponível (em destaque)
      // TODO: Navegar até o primeiro estabelecimento pagante (propaganda?)
      map.flyTo([estabelecimentos[0]?.latitude, estabelecimentos[0]?.longitude], zoomLevel);
      // Redefinindo o estado de pesquisa
      setOpen(false);
      setData(initialData);
    }
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
        <Input
          data={data}
          setData={setData}
          placeholder="Hospital ou Clínica"
          keyName="nomeEstabelecimento"
          inputWidth={inputWidth}
        />
        <Input
          data={data}
          setData={setData}
          placeholder="Médico"
          keyName="nomeFuncionario"
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
        <Input
          data={data}
          setData={setData}
          placeholder="Data"
          keyName="horarioAtendimento"
          inputType={InputType.DATE}
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
