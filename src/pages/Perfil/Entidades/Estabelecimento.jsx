import { Typography } from '@mui/material';
import colors from '../../../config/colors';
import PropTypes from 'prop-types';

Estabelecimento.propTypes = {
  entidade: PropTypes.object.isRequired
};

export default function Estabelecimento({ entidade }) {
  const color = colors.primaryDarkColor;

  return (
    <>
      <Typography variant="h6" color={color}>
        Nome: {entidade?.usuario?.nome}
      </Typography>
      <Typography variant="h6" color={color}>
        CNPJ: {entidade?.cnpj}
      </Typography>
      <Typography variant="h6" color={color}>
        Email: {entidade?.usuario?.email}
      </Typography>
      <Typography variant="h6" color={color}>
        Telefone: {entidade?.usuario?.telefone}
      </Typography>
      <Typography variant="h6" color={color}>
        Endereço: {entidade?.usuario?.endereco}
      </Typography>
      <Typography variant="h6" color={color}>
        Horário de Funcionamento: {entidade?.horarioFuncionamento}
      </Typography>
      <Typography variant="h6" color={color}>
        Descrição: {entidade?.descricao}
      </Typography>
    </>
  );
}
