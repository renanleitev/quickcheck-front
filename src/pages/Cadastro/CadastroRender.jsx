import PropTypes from 'prop-types';
import CadastroCliente from './Cliente/CadastroCliente';
import CadastroFuncionario from './Funcionario/CadastroFuncionario';
import CadastroEstabelecimento from './Estabelecimento/CadastroEstabelecimento';
import { UserRoles } from '../../config/enums';

CadastroRender.propTypes = {
  userRole: PropTypes.string.isRequired,
  setUserRole: PropTypes.func.isRequired
};

export default function CadastroRender({ userRole, setUserRole }) {
  switch (userRole) {
    case UserRoles.ESTABELECIMENTO:
      return <CadastroEstabelecimento setUserRole={setUserRole} />;
    case UserRoles.FUNCIONARIO:
      return <CadastroFuncionario setUserRole={setUserRole} />;
    case UserRoles.CLIENTE:
    default:
      return <CadastroCliente setUserRole={setUserRole} />;
  }
}
