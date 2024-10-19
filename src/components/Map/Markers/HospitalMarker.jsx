import { Marker } from 'react-leaflet';
import L from 'leaflet';
import PropTypes from 'prop-types';

HospitalMarker.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

export default function HospitalMarker({ latitude, longitude, onClick }) {
  const iconSize = 40;

  const homeIcon = new L.icon({
    iconUrl: 'https://img.icons8.com/?size=100&id=rBh1fuOC6Bjx&format=png&color=000000',
    iconSize: [iconSize, iconSize]
  });

  return (
    <Marker
      position={[latitude, longitude]}
      icon={homeIcon}
      eventHandlers={{
        click: () => {
          onClick();
        }
      }}
    />
  );
}
