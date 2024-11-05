import { useSelector } from 'react-redux';
import ClienteHome from './Pages/ClienteHome';
import FuncionarioHome from './Pages/FuncionarioHome';
import EstabelecimentoHome from './Pages/EstabelecimentoHome';
import { UserRoles } from '../../config/enums';

export default function Home() {
  const usuario = useSelector((state) => state?.usuarios?.entidade?.usuario) || undefined;

  switch (usuario?.role) {
    case UserRoles.FUNCIONARIO:
      return <FuncionarioHome />;
    case UserRoles.ESTABELECIMENTO:
      return <EstabelecimentoHome />;
    case UserRoles.CLIENTE:
    default:
      return <ClienteHome />;
  }
}
