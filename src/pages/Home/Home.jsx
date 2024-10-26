import { useEffect } from 'react';
import { VerticalContainer } from '../../config/GlobalStyle';
import MapDisplay from '../../components/Map/MapDisplay';

export default function Home() {
  // Sobe para o topo da página quando carrega o mapa
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <VerticalContainer style={{ justifyContent: 'space-between', height: '90%' }}>
      <MapDisplay />
    </VerticalContainer>
  );
}
