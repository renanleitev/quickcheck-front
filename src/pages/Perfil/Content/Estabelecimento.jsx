import { Typography } from '@mui/material';
import colors from '../../../config/colors';
import PropTypes from 'prop-types';

Estabelecimento.propTypes = {
  user: PropTypes.object.isRequired
};

export default function Estabelecimento({ user }) {
  const color = colors.primaryDarkColor;

  return (
    <>
      <Typography variant="h6" color={color}>
        Nome: {user.nome}
      </Typography>
      <Typography variant="h6" color={color}>
        CNPJ: {user.cnpj}
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
        Horário de Funcionamento: {user.horarioFuncionamento}
      </Typography>
      <Typography variant="h6" color={color}>
        Descrição: {user.descricao}
      </Typography>
    </>
  );
}
