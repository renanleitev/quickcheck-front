import { Typography } from '@mui/material';
import colors from '../../../config/colors';
import { formatBirthDate } from '../../../hooks/formatDate';
import PropTypes from 'prop-types';

Cliente.propTypes = {
  user: PropTypes.object.isRequired
};

export default function Cliente({ user }) {
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
        Comorbidades: {user.comorbidades}
      </Typography>
      <Typography variant="h6" color={color}>
        Número Cartão SUS: {user.numeroCartaoSUS}
      </Typography>
    </>
  );
}
