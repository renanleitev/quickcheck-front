import { useState, useEffect } from 'react';
import { Popup, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { defaultCoords, zoomLevel } from '../../../config/enums';

export default function HomeMarker() {
  const [coords, setCoords] = useState({ latitude: 0, longitude: 0 });

  const map = useMap();

  const iconSize = 40;

  const homeIcon = new L.icon({
    iconUrl: 'https://img.icons8.com/?size=100&id=wFfu6zXx15Yk&format=png&color=000000',
    iconSize: [iconSize, iconSize]
  });

  useEffect(() => {
    if (navigator.geolocation) {
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
  }, [map]);

  return (
    <Marker position={[coords.latitude, coords.longitude]} icon={homeIcon}>
      <Popup>Você está aqui</Popup>
    </Marker>
  );
}
