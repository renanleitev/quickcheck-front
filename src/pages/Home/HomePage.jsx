import { VerticalContainer } from '../../config/GlobalStyle';
import Map from '../../components/Map/Map';

export default function HomePage() {
  return (
    <VerticalContainer
      style={{ justifyContent: 'space-between', height: '90%' }}>
      <Map />
    </VerticalContainer>
  );
}
