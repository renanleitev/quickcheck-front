import { useSelector } from 'react-redux';
import ClienteTable from './Tabelas/ClienteTable';
import FuncionarioTable from './Tabelas/FuncionarioTable';
import { UserRoles } from '../../config/enums';

export default function AgendamentoLista() {
  const entidade = useSelector((state) => state?.usuarios?.entidade) || [];

  switch (entidade?.usuario?.role) {
    case UserRoles.FUNCIONARIO:
      return <FuncionarioTable />;
    case UserRoles.ESTABELECIMENTO:
    case UserRoles.CLIENTE:
    default:
      return <ClienteTable />;
  }
}
