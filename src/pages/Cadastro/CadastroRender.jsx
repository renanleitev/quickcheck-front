import PropTypes from 'prop-types';
import CadastroCliente from './Cliente/CadastroCliente';
import CadastroFuncionario from './Funcionario/CadastroFuncionario';
import CadastroEstabelecimento from './Estabelecimento/CadastroEstabelecimento';
import { UserRoles } from '../../config/enums';

CadastroRender.propTypes = {
  userRole: PropTypes.string.isRequired,
  setStartCadastro: PropTypes.func.isRequired
};

export default function CadastroRender({ userRole, setStartCadastro }) {
  switch (userRole) {
    case UserRoles.ESTABELECIMENTO:
      return <CadastroEstabelecimento setStartCadastro={setStartCadastro} />;
    case UserRoles.FUNCIONARIO:
      return <CadastroFuncionario setStartCadastro={setStartCadastro} />;
    case UserRoles.CLIENTE:
    default:
      return <CadastroCliente setStartCadastro={setStartCadastro} />;
  }
}
