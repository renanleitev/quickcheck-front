import { Typography } from '@mui/material';
import colors from '../../../config/colors';
import { formatBirthDate } from '../../../hooks/formatDate';
import PropTypes from 'prop-types';

Funcionario.propTypes = {
  user: PropTypes.object.isRequired
};

export default function Funcionario({ user }) {
  const color = colors.primaryDarkColor;

  return (
    <>
      <Typography variant="h6" color={color}>
        Nome: {user.nome}
      </Typography>
      <Typography variant="h6" color={color}>
        CPF: {user.cpf}
      </Typography>
      <Typography variant="h6" color={color}>
        Sexo: {user.sexo.toUpperCase() === 'M' ? 'Masculino' : 'Feminino'}
      </Typography>
      <Typography variant="h6" color={color}>
        Idade: {user.idade}
      </Typography>
      <Typography variant="h6" color={color}>
        Data de Nascimento: {formatBirthDate(user.nascimento)}
      </Typography>
      <Typography variant="h6" color={color}>
        Email: {user.email}
      </Typography>
      <Typography variant="h6" color={color}>
        Telefone: {user.telefone}
      </Typography>
      <Typography variant="h6" color={color}>
        Endereço: {user.endereco}
      </Typography>
      <Typography variant="h6" color={color}>
        CRM: {user.crm}
      </Typography>
      <Typography variant="h6" color={color}>
        Especialidade: {user.especialidade}
      </Typography>
    </>
  );
}
