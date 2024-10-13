import { useState } from 'react';
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet';
import MapButtons from './MapButtons';
import MapSearch from './MapSearch';

export default function MapDisplay() {
  const [open, setOpen] = useState(false);

  return (
    <MapContainer
      style={{ width: '100%', height: '100vh' }}
      center={[51.505, -0.09]}
      zoom={13}
      zoomControl={false}>
      <TileLayer
        attribution="Google Maps"
        url="https://www.google.us/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <MapButtons setOpen={setOpen} />
      <MapSearch open={open} setOpen={setOpen} />
    </MapContainer>
  );
}
