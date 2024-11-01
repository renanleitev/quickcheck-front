import { useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutCliente } from '../../store/modules/clientes/reducer';
import { logoutUsuario } from '../../store/modules/usuarios/reducer';
import { logoutFuncionario } from '../../store/modules/funcionarios/reducer';
import { logoutEstabelecimento } from '../../store/modules/estabelecimentos/reducer';
import { UserRoles } from '../../config/enums';

/** Hook para obter as listas de menu */
export default function useList() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const usuarioRole = useSelector((state) => state?.usuarios?.usuario?.role) || UserRoles.CLIENTE;

  const handleLogout = useCallback(() => {
    // Primeiro, faz logout de cada entidade
    switch (usuarioRole) {
      case UserRoles.FUNCIONARIO:
        dispatch(logoutFuncionario());
        break;
      case UserRoles.ESTABELECIMENTO:
        dispatch(logoutEstabelecimento());
        break;
      case UserRoles.CLIENTE:
      default:
        dispatch(logoutCliente());
        break;
    }
    // Depois, faz logout do usuário
    dispatch(logoutUsuario());
  }, [dispatch, usuarioRole]);

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
      { name: 'Meu Perfil', onClick: () => navigate('/perfil') },
      { name: 'Ajuda', onClick: () => navigate('/ajuda') },
      { name: 'Sobre', onClick: () => navigate('/sobre') },
      { name: 'Logout', onClick: () => handleLogout() }
    ],
    [navigate, handleLogout]
  );

  const funcionarioList = useMemo(
    () => [
      { name: 'Meus atendimentos', onClick: () => navigate('/agendamentos') },
      { name: 'Meu Perfil', onClick: () => navigate('/perfil') },
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
      { name: 'Meu Perfil', onClick: () => navigate('/perfil') },
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
