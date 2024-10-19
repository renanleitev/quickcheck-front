import { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import MapButtons from './Components/MapButtons';
import MapSearch from './Components/MapSearch';
import MapInfo from './Info/MapInfo';
import HomeMarker from './Markers/HomeMarker';
import HospitalMarker from './Markers/HospitalMarker';
import { defaultCoords, zoomLevel } from '../../config/enums';
import { hospitais } from '../../mocks/estabelecimentos';

export default function MapDisplay() {
  const [openSearch, setOpenSearch] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [data, setData] = useState(hospitais[0]);

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
      <HomeMarker />
      {hospitais.map((hospital) => {
        return (
          <HospitalMarker
            key={hospital.id}
            latitude={hospital.latitude}
            longitude={hospital.longitude}
            onClick={() => {
              setData(hospital);
              setOpenInfo(true);
            }}
          />
        );
      })}
      <MapButtons setOpen={setOpenSearch} />
      <MapSearch open={openSearch} setOpen={setOpenSearch} />
      <MapInfo data={data} open={openInfo} setOpen={setOpenInfo} />
    </MapContainer>
  );
}
