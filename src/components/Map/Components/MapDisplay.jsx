import { useState } from 'react';
import { useSelector } from 'react-redux';
import { MapContainer, TileLayer } from 'react-leaflet';
import MapButtons from './MapButtons';
import MapSearch from './MapSearch';
import MapInfo from '../Info/MapInfo';
import HomeMarker from '../Markers/HomeMarker';
import HospitalMarker from '../Markers/HospitalMarker';
import { defaultCoords, zoomLevel } from '../../../config/enums';

export default function MapDisplay() {
  const estabelecimentos = useSelector((state) => state?.estabelecimentos?.estabelecimentos) ?? [];

  const [openSearch, setOpenSearch] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [entidade, setEntidade] = useState(undefined);

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
      {estabelecimentos.map((hospital) => {
        return (
          <HospitalMarker
            key={hospital.id}
            latitude={hospital?.latitude}
            longitude={hospital?.longitude}
            onClick={() => {
              setEntidade(hospital);
              setOpenInfo(true);
            }}
          />
        );
      })}
      <MapButtons setOpen={setOpenSearch} />
      <MapSearch open={openSearch} setOpen={setOpenSearch} />
      <MapInfo entidade={entidade} open={openInfo} setOpen={setOpenInfo} />
    </MapContainer>
  );
}
