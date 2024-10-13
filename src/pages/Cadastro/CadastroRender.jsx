import PropTypes from 'prop-types';
import CadastroCliente from './Cliente/CadastroCliente';
import { UserRoles } from '../../config/enums';

CadastroRender.propTypes = {
  userRole: PropTypes.string.isRequired
};

export default function CadastroRender({ userRole }) {
  switch (userRole) {
    case UserRoles.CLIENTE:
    default:
      return <CadastroCliente />;
  }
}