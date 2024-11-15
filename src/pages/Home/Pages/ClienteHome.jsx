import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getEstabelecimentos } from '../../../store/modules/estabelecimentos/reducer';
import { VerticalContainer } from '../../../config/GlobalStyle';
import MapDisplay from '../../../components/Map/Components/MapDisplay';

export default function ClienteHome() {
  // Sobe para o topo da página quando carrega o mapa
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    // Pesquisar por todos os estabelecimentos (com ou sem horário disponível)
    dispatch(getEstabelecimentos());
  }, [dispatch]);

  return (
    <VerticalContainer style={{ justifyContent: 'space-between', height: '90%' }}>
      <MapDisplay />
    </VerticalContainer>
  );
}