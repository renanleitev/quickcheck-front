import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMap } from 'react-leaflet';
import dayjs from 'dayjs';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

import {
  getEstabelecimentos,
  userHasSearched,
  getEstabelecimentosByStatusAndEspecialidadeAndHorario
} from '../../../store/modules/estabelecimentos/reducer';
import colors from '../../../config/colors';
import { VerticalContainer, HorizontalContainer } from '../../../config/GlobalStyle';
import Input, { InputType } from '../../Input/Input';
import InputHora from '../../Input/InputHora';
import { especialidadesOptions, zoomOutLevel } from '../../../config/enums';
import { getRoute } from '../../../hooks/getRoute';

const buttonWidth = '20rem';
const inputWidth = '20rem';

MapSearch.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  setWaypoints: PropTypes.func.isRequired,
  agendamento: PropTypes.object.isRequired,
  setAgendamento: PropTypes.func.isRequired
};

function MapSearch({ open, setOpen, setWaypoints, agendamento, setAgendamento }) {
  const estabelecimentos = useSelector((state) => state?.estabelecimentos?.estabelecimentos) || [];

  const hasEstabelecimentos = estabelecimentos?.length > 0 || false;

  const latitudeEstabelecimento = Number.parseFloat(
    useSelector((state) => state?.estabelecimentos?.latitude) ?? 0
  );
  const longitudeEstabelecimento = Number.parseFloat(
    useSelector((state) => state?.estabelecimentos?.longitude) ?? 0
  );

  const hasEstabelecimentoCoords = latitudeEstabelecimento !== 0 && longitudeEstabelecimento !== 0;

  const latitudeCliente = Number.parseFloat(useSelector((state) => state?.usuarios?.latitude));
  const longitudeCliente = Number.parseFloat(useSelector((state) => state?.usuarios?.longitude));

  const dispatch = useDispatch();

  const map = useMap();

  const handleSearch = () => {
    // Horário que será salvo no banco de dados
    const hora = dayjs(agendamento.horarioHora).format('HH:mm:ss');
    dispatch(
      getEstabelecimentosByStatusAndEspecialidadeAndHorario({
        ...agendamento,
        horarioAtendimento: `${agendamento.horarioAtendimento}T${hora}` // Pesquisando horários a partir dessa data
      })
    );
  };

  // Calculando a rota do cliente até o estabelecimento
  useEffect(() => {
    if (hasEstabelecimentos && hasEstabelecimentoCoords) {
      // Convertendo as coordenadas para o formato de pesquisa
      const coords = [
        { latitude: latitudeCliente, longitude: longitudeCliente },
        {
          latitude: latitudeEstabelecimento,
          longitude: longitudeEstabelecimento
        }
      ];
      // Função para obter as rotas
      async function getCoords() {
        const waypoints = await getRoute(coords);
        setWaypoints(waypoints);
      }
      // TODO: Navegar até o primeiro estabelecimento assinante (propaganda?)
      map.flyTo([latitudeEstabelecimento, longitudeEstabelecimento], zoomOutLevel);
      // Fechando o modal
      setOpen(false);
      // Definindo a rota do cliente até o estabelecimento
      getCoords();
    }
  }, [
    hasEstabelecimentoCoords,
    hasEstabelecimentos,
    latitudeCliente,
    latitudeEstabelecimento,
    longitudeCliente,
    longitudeEstabelecimento,
    map,
    setOpen,
    setWaypoints
  ]);

  const handleClose = () => {
    // Fecha o drawer
    setOpen(false);
    // Se não tiver estabelecimentos, realiza a busca novamente e redefine o status de pesquisa
    if (!hasEstabelecimentos) {
      dispatch(getEstabelecimentos());
      dispatch(userHasSearched({ hasSearched: false }));
    }
  };

  return (
    <Drawer
      open={open}
      onClose={handleClose}
      anchor="bottom"
      PaperProps={{
        sx: {
          backgroundColor: colors.primaryColor
        }
      }}
    >
      <VerticalContainer style={{ padding: '2rem' }}>
        <Input
          data={agendamento}
          setData={setAgendamento}
          placeholder="Hospital ou Clínica"
          keyName="nomeEstabelecimento"
          inputWidth={inputWidth}
        />
        <Input
          data={agendamento}
          setData={setAgendamento}
          placeholder="Médico"
          keyName="nomeFuncionario"
          inputWidth={inputWidth}
        />
        <Input
          data={agendamento}
          setData={setAgendamento}
          placeholder="Especialidade"
          keyName="especialidade"
          inputWidth={inputWidth}
          select
          selectList={especialidadesOptions}
        />
        <HorizontalContainer style={{ width: inputWidth, flexWrap: 'nowrap' }}>
          <Input
            data={agendamento}
            setData={setAgendamento}
            placeholder="Data"
            keyName="horarioAtendimento"
            inputType={InputType.DATE}
          />
          <InputHora
            data={agendamento}
            setData={setAgendamento}
            hora={dayjs(agendamento.horarioHora)}
            keyName="horarioHora"
          />
        </HorizontalContainer>
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
