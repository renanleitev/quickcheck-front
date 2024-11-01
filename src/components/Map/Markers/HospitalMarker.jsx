import { Marker } from 'react-leaflet';
import PropTypes from 'prop-types';
import { hospitalIcon } from './MarkerIcons';

HospitalMarker.propTypes = {
  latitude: PropTypes.string.isRequired,
  longitude: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default function HospitalMarker({ latitude, longitude, onClick }) {
  return (
    <Marker
      position={[latitude, longitude]}
      icon={hospitalIcon}
      eventHandlers={{
        click: () => {
          onClick();
        }
      }}
    />
  );
}
