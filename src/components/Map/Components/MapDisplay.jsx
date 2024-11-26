import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import dayjs from 'dayjs';

import MapButtons from './MapButtons';
import MapSearch from './MapSearch';
import MapInfo from './MapInfo/MapInfo';
import HomeMarker from '../Markers/HomeMarker';
import EstabelecimentoMarker from '../Markers/EstabelecimentoMarker';
import {
  AgendamentoStatus,
  defaultCoords,
  zoomLevel,
  especialidadesOptions
} from '../../../config/enums';
import { formatCalendarDate } from '../../../hooks/formatDate';
import { resetHorarios } from '../../../store/modules/horarios/reducer';
import {
  getEstabelecimentos,
  setEstabelecimentoCoords
} from '../../../store/modules/estabelecimentos/reducer';

export default function MapDisplay() {
  const estabelecimentos = useSelector((state) => state?.estabelecimentos?.estabelecimentos) ?? [];

  const dispatch = useDispatch();

  // Para abrir o drawer de pesquisa (MapSearch)
  const [openSearch, setOpenSearch] = useState(false);
  // Para abrir o drawer de informação (MapInfo)
  const [openInfo, setOpenInfo] = useState(false);

  // Estabelecimento escolhido pelo usuário (quando clica no ícone e abre o drawer = MapInfo)
  const [estabelecimento, setEstabelecimento] = useState(undefined);

  // Coordenadas que desenham o trajeto do cliente ao estabelecimento
  const [waypoints, setWaypoints] = useState([]);

  // Redefinindo a rota desenhada, as coordenadas do estabelecimento e os horários
  const handleResetSearch = () => {
    setWaypoints([]);
    dispatch(getEstabelecimentos());
    dispatch(setEstabelecimentoCoords({ latitude: 0, longitude: 0 }));
    dispatch(resetHorarios());
  };

  // Agendamento inicial (antes de confirmar a consulta)
  const initialAgendamento = useMemo(() => {
    return {
      status: AgendamentoStatus.DISPONÍVEL,
      nomeFuncionario: '',
      nomeEstabelecimento: '',
      horarioHora: dayjs(),
      horarioAtendimento: formatCalendarDate(new Date().toISOString()), // Convertendo para o formato yyyy-MM-dd
      especialidade: especialidadesOptions[0].value,
      horario: undefined // O horário que o usuário seleciona para agendar a consulta
    };
  }, []);

  const [agendamento, setAgendamento] = useState(initialAgendamento);

  return (
    <MapContainer
      style={{ width: '100%', height: '100vh' }}
      center={defaultCoords}
      zoom={zoomLevel}
      zoomControl={false}
    >
      <TileLayer
        attribution="Google Maps"
        url="https://www.google.us/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
      />
      {/* Localização do Cliente */}
      <HomeMarker />
      {/* Localização dos Estabelecimentos */}
      {estabelecimentos.map((estabelecimento) => {
        return (
          <EstabelecimentoMarker
            key={estabelecimento.id}
            latitude={estabelecimento?.latitude}
            longitude={estabelecimento?.longitude}
            onClick={() => {
              setEstabelecimento(estabelecimento);
              setOpenInfo(true);
              // Limpando os horários, caso o usuário tenha pesquisado antes
              dispatch(resetHorarios());
            }}
          />
        );
      })}
      <MapButtons setOpen={setOpenSearch} onReset={handleResetSearch} />
      <MapSearch
        open={openSearch}
        setOpen={setOpenSearch}
        setWaypoints={setWaypoints}
        agendamento={agendamento}
        setAgendamento={setAgendamento}
      />
      <MapInfo
        estabelecimento={estabelecimento}
        open={openInfo}
        setOpen={setOpenInfo}
        agendamento={agendamento}
        setAgendamento={setAgendamento}
        initialAgendamento={initialAgendamento}
      />
      {waypoints?.length > 0 && <Polyline positions={waypoints} />}
    </MapContainer>
  );
}
