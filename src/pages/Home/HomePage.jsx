import { VerticalContainer } from '../../config/GlobalStyle';
import MapDisplay from '../../components/Map/MapDisplay';

export default function HomePage() {
  return (
    <VerticalContainer style={{ justifyContent: 'space-between', height: '90%' }}>
      <MapDisplay />
    </VerticalContainer>
  );
}
