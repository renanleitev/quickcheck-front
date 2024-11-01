import { Typography } from '@mui/material';
import colors from '../../../config/colors';
import { formatBirthDate } from '../../../hooks/formatDate';
import PropTypes from 'prop-types';

Funcionario.propTypes = {
  entidade: PropTypes.object.isRequired
};

export default function Funcionario({ entidade }) {
  const color = colors.primaryDarkColor;

  return (
    <>
      <Typography variant="h6" color={color}>
        Nome: {entidade?.usuario?.nome}
      </Typography>
      <Typography variant="h6" color={color}>
        CPF: {entidade?.cpf}
      </Typography>
      <Typography variant="h6" color={color}>
        Sexo: {entidade?.sexo?.toUpperCase() === 'M' ? 'Masculino' : 'Feminino'}
      </Typography>
      <Typography variant="h6" color={color}>
        Idade: {entidade?.idade}
      </Typography>
      <Typography variant="h6" color={color}>
        Data de Nascimento: {formatBirthDate(entidade.nascimento)}
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
        CRM: {entidade?.crm}
      </Typography>
      <Typography variant="h6" color={color}>
        Especialidade: {entidade?.especialidade}
      </Typography>
    </>
  );
}
