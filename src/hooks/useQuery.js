import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

/**
 * Hook para obter os params passados na URL
 */
export default function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}
