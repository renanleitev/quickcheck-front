import { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import MapButtons from './MapButtons';
import MapSearch from './MapSearch';
import MapInfo from './MapInfo';
import HomeMarker from './Markers/HomeMarker';
import HospitalMarker from './Markers/HospitalMarker';
import { defaultCoords, zoomLevel } from '../../config/enums';
import { hospitais } from '../../mocks/estabelecimentos';

export default function MapDisplay() {
  const [openSearch, setOpenSearch] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);

  return (
    <MapContainer
      style={{ width: '100%', height: '100vh' }}
      center={defaultCoords}
      zoom={zoomLevel}
      zoomControl={false}>
      <TileLayer
        attribution="Google Maps"
        url="https://www.google.us/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
      />
      <HomeMarker />
      <HospitalMarker setOpen={setOpenInfo} />
      <MapButtons setOpen={setOpenSearch} />
      <MapSearch open={openSearch} setOpen={setOpenSearch} />
      <MapInfo data={hospitais[0]} open={openInfo} setOpen={setOpenInfo} />
    </MapContainer>
  );
}
