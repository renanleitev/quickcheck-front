import { useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logoutUsuario } from '../../store/modules/usuarios/reducer';
import { RoutesList } from '../../routes/enums';
import { setEstabelecimentoCoords } from '../../store/modules/estabelecimentos/reducer';
import { resetHorarios } from '../../store/modules/horarios/reducer';

/** Hook para obter as listas de menu */
export default function useList() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = useCallback(() => {
    dispatch(logoutUsuario());
    dispatch(resetHorarios());
    dispatch(setEstabelecimentoCoords({ latitude: 0, longitude: 0 }));
  }, [dispatch]);

  const defaultList = useMemo(
    () => [
      { name: 'Login', onClick: () => navigate(RoutesList.Login) },
      { name: 'Cadastro', onClick: () => navigate(RoutesList.Cadastro) },
      { name: 'Ajuda', onClick: () => navigate(RoutesList.Ajuda) },
      { name: 'Sobre', onClick: () => navigate(RoutesList.Sobre) }
    ],
    [navigate]
  );

  const clienteList = useMemo(
    () => [
      { name: 'Página principal', onClick: () => navigate(RoutesList.Home) },
      { name: 'Minhas consultas', onClick: () => navigate(RoutesList.AgendamentosLista) },
      { name: 'Meu perfil', onClick: () => navigate(RoutesList.Perfil) },
      { name: 'Ajuda', onClick: () => navigate(RoutesList.Ajuda) },
      { name: 'Sobre', onClick: () => navigate(RoutesList.Sobre) },
      { name: 'Logout', onClick: () => handleLogout() }
    ],
    [navigate, handleLogout]
  );

  const funcionarioList = useMemo(
    () => [
      { name: 'Página principal', onClick: () => navigate(RoutesList.Home) },
      { name: 'Minhas consultas', onClick: () => navigate(RoutesList.AgendamentosLista) },
      { name: 'Meu perfil', onClick: () => navigate(RoutesList.Perfil) },
      { name: 'Ajuda', onClick: () => navigate(RoutesList.Ajuda) },
      { name: 'Sobre', onClick: () => navigate(RoutesList.Sobre) },
      { name: 'Logout', onClick: () => handleLogout() }
    ],
    [navigate, handleLogout]
  );

  const estabelecimentoList = useMemo(
    () => [
      { name: 'Página principal', onClick: () => navigate(RoutesList.Home) },
      { name: 'Consultas', onClick: () => navigate(RoutesList.AgendamentosLista) },
      { name: 'Pacientes', onClick: () => navigate(RoutesList.Clientes) },
      { name: 'Médicos', onClick: () => navigate(RoutesList.Funcionarios) },
      { name: 'Meu perfil', onClick: () => navigate(RoutesList.Perfil) },
      { name: 'Ajuda', onClick: () => navigate(RoutesList.Ajuda) },
      { name: 'Sobre', onClick: () => navigate(RoutesList.Sobre) },
      { name: 'Logout', onClick: () => handleLogout() }
    ],
    [navigate, handleLogout]
  );

  return {
    defaultList,
    clienteList,
    funcionarioList,
    estabelecimentoList
  };
}
