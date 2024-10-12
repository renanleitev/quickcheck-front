import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet';

function Map() {
  return (
    <MapContainer
      style={{ width: '100%', height: '100vh' }}
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={false}>
      <TileLayer
        attribution="Google Maps"
        url="https://www.google.us/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map;
