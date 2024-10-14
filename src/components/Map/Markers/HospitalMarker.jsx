import { Marker } from 'react-leaflet';
import L from 'leaflet';
import { coordsHospitais } from '../../../mocks/estabelecimentos';
import PropTypes from 'prop-types';

HospitalMarker.propTypes = {
  setOpen: PropTypes.func.isRequired
};

export default function HospitalMarker({ setOpen }) {
  // Usando dados mockados por enquanto
  const { latitude, longitude } = coordsHospitais.HospitalPortugues;

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
          setOpen(true);
        }
      }}
    />
  );
}
