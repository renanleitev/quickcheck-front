import { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMap } from 'react-leaflet';
import dayjs from 'dayjs';

import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';

import {
  getEstabelecimentos,
  userHasSearched,
  getEstabelecimentosByStatusAndEspecialidadeAndHorario
} from '../../../store/modules/estabelecimentos/reducer';
import colors from '../../../config/colors';
import { VerticalContainer, HorizontalContainer } from '../../../config/GlobalStyle';
import Input, { InputType } from '../../Input/Input';
import InputHora from '../../Input/InputHora';
import { AgendamentoStatus, especialidadesOptions, zoomLevel } from '../../../config/enums';
import { formatCalendarDate } from '../../../hooks/formatDate';
import PropTypes from 'prop-types';
import { getRoute } from '../../../hooks/getRoute';

const buttonWidth = '20rem';
const inputWidth = '20rem';

MapSearch.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  setWaypoints: PropTypes.func.isRequired,
  coordenadas: PropTypes.object
};

function MapSearch({ open, setOpen, setWaypoints, coordenadas }) {
  const estabelecimentos = useSelector((state) => state?.estabelecimentos?.estabelecimentos) || [];
  const hasEstabelecimentos = estabelecimentos?.length > 0 || false;

  const hasSearched = useSelector((state) => state?.estabelecimentos?.hasSearched) || false;

  const dispatch = useDispatch();

  const map = useMap();

  const initialData = useMemo(() => {
    return {
      status: AgendamentoStatus.DISPONÍVEL,
      nomeFuncionario: '',
      nomeEstabelecimento: '',
      horarioHora: dayjs(),
      horarioAtendimento: formatCalendarDate(new Date().toISOString()), // Convertendo para o formato yyyy-MM-dd
      especialidade: especialidadesOptions[0].value
    };
  }, []);

  const [data, setData] = useState(initialData);

  const handleSearch = () => {
    // Horário que será salvo no banco de dados
    const hora = dayjs(data.horarioHora).format('HH:mm:ss');
    dispatch(
      getEstabelecimentosByStatusAndEspecialidadeAndHorario({
        ...data,
        horarioAtendimento: `${data.horarioAtendimento}T${hora}` // Pesquisando horários a partir dessa data
      })
    );
  };

  // Calculando a rota do cliente até o estabelecimento
  useEffect(() => {
    if (hasEstabelecimentos && hasSearched) {
      // Convertendo as coordenadas para o formato de pesquisa
      const coordenadasPesquisa = [
        { latitude: coordenadas.latitudeCliente, longitude: coordenadas.longitudeCliente },
        {
          latitude: coordenadas.latitudeEstabelecimento,
          longitude: coordenadas.longitudeEstabelecimento
        }
      ];
      // Função para obter as rotas
      async function getCoords() {
        const waypoints = await getRoute(coordenadasPesquisa);
        setWaypoints(waypoints);
      }
      // TODO: Navegar até o primeiro estabelecimento assinante (propaganda?)
      map.flyTo(
        [coordenadas.latitudeEstabelecimento, coordenadas.longitudeEstabelecimento],
        zoomLevel
      );
      // Redefinindo o estado de pesquisa
      setOpen(false);
      setData(initialData);
      // Definindo a rota do cliente até o estabelecimento
      getCoords();
    }
  }, [coordenadas, hasEstabelecimentos, hasSearched, initialData, map, setOpen, setWaypoints]);

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
        <HorizontalContainer style={{ width: inputWidth, flexWrap: 'nowrap' }}>
          <Input
            data={data}
            setData={setData}
            placeholder="Data"
            keyName="horarioAtendimento"
            inputType={InputType.DATE}
          />
          <InputHora
            data={data}
            setData={setData}
            hora={dayjs(data.horarioHora)}
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
