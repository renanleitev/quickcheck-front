import { Typography } from '@mui/material';
import colors from '../../../config/colors';
import { formatBirthDate } from '../../../hooks/formatDate';
import PropTypes from 'prop-types';

Funcionario.propTypes = {
  entity: PropTypes.object.isRequired
};

export default function Funcionario({ entity }) {
  const color = colors.primaryDarkColor;

  return (
    <>
      <Typography variant="h6" color={color}>
        Nome: {entity?.usuario?.nome}
      </Typography>
      <Typography variant="h6" color={color}>
        CPF: {entity?.cpf}
      </Typography>
      <Typography variant="h6" color={color}>
        Sexo: {entity?.sexo?.toUpperCase() === 'M' ? 'Masculino' : 'Feminino'}
      </Typography>
      <Typography variant="h6" color={color}>
        Idade: {entity?.idade}
      </Typography>
      <Typography variant="h6" color={color}>
        Data de Nascimento: {formatBirthDate(entity.nascimento)}
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
        CRM: {entity?.crm}
      </Typography>
      <Typography variant="h6" color={color}>
        Especialidade: {entity?.especialidade}
      </Typography>
    </>
  );
}
