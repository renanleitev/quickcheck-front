import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

/** Hook para obter as listas de menu */
export default function useList() {
  const navigate = useNavigate();

  const defaultList = useMemo(() => [
    { name: 'Login', onClick: () => navigate('/login') },
    { name: 'Cadastro', onClick: () => navigate('/cadastro') },
    { name: 'Ajuda', onClick: () => navigate('/ajuda') },
    { name: 'Sobre', onClick: () => navigate('/sobre') }
  ], [navigate]);

  const clienteList = useMemo(() => [
    { name: 'Minhas consultas', onClick: () => navigate('/agendamentos') },
    { name: 'Meu Perfil', onClick: () => navigate('/perfil') },
    { name: 'Ajuda', onClick: () => navigate('/ajuda') },
    { name: 'Sobre', onClick: () => navigate('/sobre') },
    { name: 'Logout', onClick: () => navigate('/login') }
  ], [navigate]);

  const funcionarioList = useMemo(() => [
    { name: 'Meus atendimentos', onClick: () => navigate('/agendamentos') },
    { name: 'Meu Perfil', onClick: () => navigate('/perfil') },
    { name: 'Ajuda', onClick: () => navigate('/ajuda') },
    { name: 'Sobre', onClick: () => navigate('/sobre') },
    { name: 'Logout', onClick: () => navigate('/login') }
  ], [navigate]);

  const estabelecimentoList = useMemo(() => [
    { name: 'Horários', onClick: () => navigate('/horarios') },
    { name: 'Atendimentos', onClick: () => navigate('/agendamentos') },
    { name: 'Pacientes', onClick: () => navigate('/pacientes') },
    { name: 'Médicos', onClick: () => navigate('/medicos') },
    { name: 'Meu Perfil', onClick: () => navigate('/perfil') },
    { name: 'Ajuda', onClick: () => navigate('/ajuda') },
    { name: 'Sobre', onClick: () => navigate('/sobre') },
    { name: 'Logout', onClick: () => navigate('/login') }
  ], [navigate]);

  return {
    defaultList,
    clienteList,
    funcionarioList,
    estabelecimentoList
  };
}
