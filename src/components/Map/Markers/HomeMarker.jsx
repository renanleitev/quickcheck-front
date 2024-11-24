import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Popup, Marker, useMap } from 'react-leaflet';

import { defaultCoords, zoomLevel } from '../../../config/enums';
import { homeIcon } from './MarkerIcons';
import { updateCoords } from '../../../store/modules/usuarios/reducer';

export default function HomeMarker() {
  const [coords, setCoords] = useState({ latitude: 0, longitude: 0 });

  const map = useMap();

  const dispatch = useDispatch();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoords({ latitude, longitude });
          map.flyTo([latitude, longitude], zoomLevel);
          dispatch(updateCoords({ latitude, longitude }));
        },
        (error) => {
          setCoords({ latitude: defaultCoords[0], longitude: defaultCoords[1] });
          dispatch(updateCoords({ latitude: defaultCoords[0], longitude: defaultCoords[1] }));
          console.error('Erro ao obter a localização:', error);
        }
      );
    }
  }, [dispatch, map]);

  return (
    <Marker position={[coords.latitude, coords.longitude]} icon={homeIcon}>
      <Popup>Você está aqui</Popup>
    </Marker>
  );
}
