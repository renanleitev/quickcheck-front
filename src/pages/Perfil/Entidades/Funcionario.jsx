import { Typography } from '@mui/material';
import colors from '../../../config/colors';
import { formatBirthDate } from '../../../hooks/formatDate';
import PerfilCard from '../../../components/Card/PerfilCard';
import PropTypes from 'prop-types';

Funcionario.propTypes = {
  entidade: PropTypes.object.isRequired
};

export default function Funcionario({ entidade }) {
  const color = colors.primaryDarkColor;
  const textSize = 'subtitle1';

  return (
    <PerfilCard entidade={entidade}>
      <Typography variant={textSize} color={color}>
        Nome: {entidade?.usuario?.nome}
      </Typography>
      <Typography variant={textSize} color={color}>
        CPF: {entidade?.cpf}
      </Typography>
      <Typography variant={textSize} color={color}>
        Sexo: {entidade?.sexo?.toUpperCase() === 'M' ? 'Masculino' : 'Feminino'}
      </Typography>
      <Typography variant={textSize} color={color}>
        Idade: {entidade?.idade}
      </Typography>
      <Typography variant={textSize} color={color}>
        Data de Nascimento: {formatBirthDate(entidade.nascimento)}
      </Typography>
      <Typography variant={textSize} color={color}>
        Email: {entidade?.usuario?.email}
      </Typography>
      <Typography variant={textSize} color={color}>
        Telefone: {entidade?.usuario?.telefone}
      </Typography>
      <Typography variant={textSize} color={color}>
        Endereço: {entidade?.usuario?.endereco}
      </Typography>
      <Typography variant={textSize} color={color}>
        CRM: {entidade?.crm}
      </Typography>
      <Typography variant={textSize} color={color}>
        Especialidade: {entidade?.especialidade}
      </Typography>
    </PerfilCard>
  );
}
