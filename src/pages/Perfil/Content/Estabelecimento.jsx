import { Typography } from '@mui/material';
import colors from '../../../config/colors';
import PropTypes from 'prop-types';

Estabelecimento.propTypes = {
  entity: PropTypes.object.isRequired
};

export default function Estabelecimento({ entity }) {
  const color = colors.primaryDarkColor;

  return (
    <>
      <Typography variant="h6" color={color}>
        Nome: {entity?.usuario?.nome}
      </Typography>
      <Typography variant="h6" color={color}>
        CNPJ: {entity?.cnpj}
      </Typography>
      <Typography variant="h6" color={color}>
        Email: {entity?.usuario?.email}
      </Typography>
      <Typography variant="h6" color={color}>
        Telefone: {entity?.usuario?.telefone}
      </Typography>
      <Typography variant="h6" color={color}>
        Endereço: {entity?.usuario?.endereco}
      </Typography>
      <Typography variant="h6" color={color}>
        Horário de Funcionamento: {entity?.horarioFuncionamento}
      </Typography>
      <Typography variant="h6" color={color}>
        Descrição: {entity?.descricao}
      </Typography>
    </>
  );
}
