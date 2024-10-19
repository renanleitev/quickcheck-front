import { useNavigate } from 'react-router-dom';

/** Hook para obter as listas de menu */ 
export default function useList() {
  const navigate = useNavigate();

  const defaultList = [
    { name: 'Login', onClick: () => navigate('/login') },
    { name: 'Cadastro', onClick: () => navigate('/cadastro') },
    { name: 'Ajuda', onClick: () => navigate('/ajuda') },
    { name: 'Sobre', onClick: () => navigate('/sobre') }
  ];

  const clienteList = [
    { name: 'Minhas consultas', onClick: () => navigate('/agendamentos') },
    { name: 'Meu Perfil', onClick: () => navigate('/perfil') },
    { name: 'Ajuda', onClick: () => navigate('/ajuda') },
    { name: 'Sobre', onClick: () => navigate('/sobre') },
    { name: 'Logout', onClick: () => navigate('/login') }
  ];

  const funcionarioList = [
    { name: 'Meus atendimentos', onClick: () => navigate('/agendamentos') },
    { name: 'Meu Perfil', onClick: () => navigate('/perfil') },
    { name: 'Ajuda', onClick: () => navigate('/ajuda') },
    { name: 'Sobre', onClick: () => navigate('/sobre') },
    { name: 'Logout', onClick: () => navigate('/login') }
  ];

  const estabelecimentoList = [
    { name: 'Horários', onClick: () => navigate('/horarios') },
    { name: 'Atendimentos', onClick: () => navigate('/agendamentos') },
    { name: 'Pacientes', onClick: () => navigate('/pacientes') },
    { name: 'Médicos', onClick: () => navigate('/medicos') },
    { name: 'Meu Perfil', onClick: () => navigate('/perfil') },
    { name: 'Ajuda', onClick: () => navigate('/ajuda') },
    { name: 'Sobre', onClick: () => navigate('/sobre') },
    { name: 'Logout', onClick: () => navigate('/login') }
  ];

  return {
    defaultList,
    clienteList,
    funcionarioList,
    estabelecimentoList
  };
}
