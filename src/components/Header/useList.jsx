import { useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUsuario } from '../../store/modules/usuarios/reducer';

/** Hook para obter as listas de menu */
export default function useList() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = useCallback(() => {
    dispatch(logoutUsuario());
  }, [dispatch]);

  const defaultList = useMemo(
    () => [
      { name: 'Login', onClick: () => navigate('/') },
      { name: 'Cadastro', onClick: () => navigate('/cadastro') },
      { name: 'Ajuda', onClick: () => navigate('/ajuda') },
      { name: 'Sobre', onClick: () => navigate('/sobre') }
    ],
    [navigate]
  );

  const clienteList = useMemo(
    () => [
      { name: 'Minhas consultas', onClick: () => navigate('/agendamentos') },
      { name: 'Meu perfil', onClick: () => navigate('/perfil') },
      { name: 'Ajuda', onClick: () => navigate('/ajuda') },
      { name: 'Sobre', onClick: () => navigate('/sobre') },
      { name: 'Logout', onClick: () => handleLogout() }
    ],
    [navigate, handleLogout]
  );

  const funcionarioList = useMemo(
    () => [
      { name: 'Minhas consultas', onClick: () => navigate('/agendamentos') },
      { name: 'Meu perfil', onClick: () => navigate('/perfil') },
      { name: 'Ajuda', onClick: () => navigate('/ajuda') },
      { name: 'Sobre', onClick: () => navigate('/sobre') },
      { name: 'Logout', onClick: () => handleLogout() }
    ],
    [navigate, handleLogout]
  );

  const estabelecimentoList = useMemo(
    () => [
      { name: 'Horários', onClick: () => navigate('/horarios') },
      { name: 'Atendimentos', onClick: () => navigate('/agendamentos') },
      { name: 'Pacientes', onClick: () => navigate('/pacientes') },
      { name: 'Médicos', onClick: () => navigate('/medicos') },
      { name: 'Meu perfil', onClick: () => navigate('/perfil') },
      { name: 'Ajuda', onClick: () => navigate('/ajuda') },
      { name: 'Sobre', onClick: () => navigate('/sobre') },
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
