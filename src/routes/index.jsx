import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/HomePage';
import Login from '../pages/Login/Login';
import Cadastro from '../pages/Cadastro/Cadastro';
import Page404 from '../pages/Page404/Page404';

export default function RoutesController() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
