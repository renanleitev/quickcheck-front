import { useState } from 'react';
import { useSelector } from 'react-redux';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';

import MapButtons from './MapButtons';
import MapSearch from './MapSearch';
import MapInfo from './MapInfo/MapInfo';
import HomeMarker from '../Markers/HomeMarker';
import EstabelecimentoMarker from '../Markers/EstabelecimentoMarker';
import { defaultCoords, zoomLevel } from '../../../config/enums';

export default function MapDisplay() {
  const estabelecimentos = useSelector((state) => state?.estabelecimentos?.estabelecimentos) ?? [];

  const latitudeCliente = useSelector((state) => state?.usuarios?.latitude);
  const longitudeCliente = useSelector((state) => state?.usuarios?.longitude);

  const hasEstabelecimentos = estabelecimentos?.length > 0;

  const latitudeEstabelecimento = hasEstabelecimentos ? estabelecimentos[0]?.latitude : 0;
  const longitudeEstabelecimento = hasEstabelecimentos ? estabelecimentos[0]?.longitude : 0;

  // Para abrir o drawer de pesquisa (MapSearch)
  const [openSearch, setOpenSearch] = useState(false);
  // Para abrir o drawer de informação (MapInfo)
  const [openInfo, setOpenInfo] = useState(false);

  // Estabelecimento escolhido pelo usuário (quando clica no ícone e abre o drawer = MapInfo)
  const [estabelecimento, setEstabelecimento] = useState(undefined);

  // Coordenadas utilizadas para calcular o trajeto do cliente ao estabelecimento
  const initialCoordenadas = {
    latitudeCliente: Number.parseFloat(latitudeCliente),
    longitudeCliente: Number.parseFloat(longitudeCliente),
    latitudeEstabelecimento: Number.parseFloat(latitudeEstabelecimento),
    longitudeEstabelecimento: Number.parseFloat(longitudeEstabelecimento)
  };
  const [coordenadas, setCoordenadas] = useState(initialCoordenadas);

  // Coordenadas que desenham o trajeto do cliente ao estabelecimento
  const [waypoints, setWaypoints] = useState([]);

  // Redefinindo a rota desenhada
  const handleResetSearch = () => {
    setWaypoints([]);
    setCoordenadas(initialCoordenadas);
  };

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
            }}
          />
        );
      })}
      <MapButtons setOpen={setOpenSearch} onReset={handleResetSearch} />
      <MapSearch
        open={openSearch}
        setOpen={setOpenSearch}
        setWaypoints={setWaypoints}
        coordenadas={coordenadas}
      />
      <MapInfo
        estabelecimento={estabelecimento}
        open={openInfo}
        setOpen={setOpenInfo}
        setCoordenadas={setCoordenadas}
      />
      {waypoints.length > 0 && <Polyline positions={waypoints} />}
    </MapContainer>
  );
}
