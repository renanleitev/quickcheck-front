import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

import colors from '../../../config/colors';
import { formatBirthDate } from '../../../hooks/formatDate';
import PerfilCard from '../../../components/Card/PerfilCard';

Cliente.propTypes = {
  entidade: PropTypes.object.isRequired
};

export default function Cliente({ entidade }) {
  const color = colors.primaryWhiteColor;
  const textSize = 'subtitle1';

  return (
    <PerfilCard entidade={entidade} hasSubtitle={false}>
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
        Idade: {dayjs(new Date()).diff(entidade?.nascimento, 'year')}
      </Typography>
      <Typography variant={textSize} color={color}>
        Data de Nascimento: {formatBirthDate(entidade?.nascimento)}
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
        Comorbidades: {entidade?.comorbidades}
      </Typography>
    </PerfilCard>
  );
}
