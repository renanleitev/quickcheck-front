import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

import colors from '../../../config/colors';
import PerfilCard from '../../../components/Card/PerfilCard';

Estabelecimento.propTypes = {
  entidade: PropTypes.object.isRequired
};

export default function Estabelecimento({ entidade }) {
  const color = colors.primaryWhiteColor;
  const textSize = 'subtitle1';

  return (
    <PerfilCard entidade={entidade} hasSubtitle={false}>
      <Typography variant={textSize} color={color}>
        Nome: {entidade?.usuario?.nome}
      </Typography>
      <Typography variant={textSize} color={color}>
        CNPJ: {entidade?.cnpj}
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
        Horário de Funcionamento: {entidade?.horarioFuncionamento}
      </Typography>
      <Typography variant={textSize} color={color}>
        Descrição: {entidade?.descricao}
      </Typography>
    </PerfilCard>
  );
}
