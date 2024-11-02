import { useSelector } from 'react-redux';
import Mapa from '../Mapa/Mapa';
import Agendamento from '../Agendamento/Agendamento';
import { UserRoles } from '../../config/enums';

export default function Home() {
  const entidade = useSelector((state) => state?.usuarios?.entidade) || undefined;

  return <>{entidade?.usuario?.role === UserRoles.FUNCIONARIO ? <Agendamento /> : <Mapa />}</>;
}
