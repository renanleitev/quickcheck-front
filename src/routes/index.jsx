import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Cadastro from '../pages/Cadastro/Cadastro';
import Page404 from '../pages/Page404/Page404';
import Perfil from '../pages/Perfil/Perfil';
import VerPerfil from '../pages/Perfil/Pages/VerPerfil';
import EditarPerfil from '../pages/Perfil/Pages/EditarPerfil';

export default function RoutesController() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/ver-perfil" element={<VerPerfil />} />
      <Route path="/editar-perfil" element={<EditarPerfil />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
