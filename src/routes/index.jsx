import { Routes, Route, useLocation } from 'react-router-dom';
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
import history from '../services/history';

export default function RoutesController() {
  const isLoggedIn = useSelector((state) => state?.usuarios?.isLoggedIn) || false;

  // Obtendo a URL anterior que o usuário tentou acessar (caso não esteja autenticado)
  const location = useLocation();

  // Protegendo as rotas, caso o usuário não esteja logado
  function handleAuth(children){
    if (isLoggedIn) {
      history.push(location);
      return children;
    } else {
      history.push('/login');
      return <Login />;
    }
  }

  return (
    <Routes>
      <Route path="/" element={handleAuth(<Home />)} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/perfil" element={handleAuth(<Perfil />)} />
      <Route path="/ver-perfil" element={handleAuth(<VerPerfil />)} />
      <Route path="/editar-perfil" element={handleAuth(<EditarPerfil />)} />
      <Route path="/alterar-senha" element={handleAuth(<AlterarSenha />)} />
      <Route path="/agendamentos" element={handleAuth(<Agendamento />)} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
