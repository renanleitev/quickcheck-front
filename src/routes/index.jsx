import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/HomePage';
import Page404 from '../pages/Page404/Page404';

export default function RoutesController() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}