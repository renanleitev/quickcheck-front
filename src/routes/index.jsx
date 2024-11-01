import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Cadastro from '../pages/Cadastro/Cadastro';
import Page404 from '../pages/Page404/Page404';
import Perfil from '../pages/Perfil/Perfil';
import VerPerfil from '../pages/Perfil/Pages/VerPerfil';
import EditarPerfil from '../pages/Perfil/Pages/EditarPerfil';
import AlterarSenha from '../pages/Perfil/Pages/AlterarSenha';
import Agendamento from '../pages/Agendamento/Agendamento';

export default function RoutesController() {
  const isLoggedIn = useSelector((state) => state.usuarios.isLoggedIn) || false;

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <Home /> : <Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/ver-perfil" element={<VerPerfil />} />
      <Route path="/editar-perfil" element={<EditarPerfil />} />
      <Route path="/alterar-senha" element={<AlterarSenha />} />
      <Route path="/agendamentos" element={<Agendamento />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
