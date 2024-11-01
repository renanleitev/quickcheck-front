import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Popup, Marker, useMap } from 'react-leaflet';
import { defaultCoords, UserRoles, zoomLevel } from '../../../config/enums';
import { homeIcon, hospitalIcon } from './MarkerIcons';

export default function HomeMarker() {
  const entidade = useSelector((state) => state?.usuarios?.entidade) || undefined;

  const [coords, setCoords] = useState({ latitude: 0, longitude: 0 });

  const map = useMap();

  useEffect(() => {
    if (entidade?.usuario?.role === UserRoles.ESTABELECIMENTO) {
      const latitude = entidade?.latitude;
      const longitude = entidade?.longitude;
      setCoords({ latitude, longitude });
      map.flyTo([latitude, longitude], zoomLevel);
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoords({ latitude, longitude });
          map.flyTo([latitude, longitude], zoomLevel);
        },
        (error) => {
          setCoords({ latitude: defaultCoords[0], longitude: defaultCoords[1] });
          console.error('Erro ao obter a localização:', error);
        }
      );
    }
  }, [entidade?.latitude, entidade?.longitude, entidade?.usuario?.role, map]);

  const icon = entidade?.usuario?.role === UserRoles.ESTABELECIMENTO ? hospitalIcon : homeIcon;

  return (
    <Marker position={[coords.latitude, coords.longitude]} icon={icon}>
      <Popup>Você está aqui</Popup>
    </Marker>
  );
}
