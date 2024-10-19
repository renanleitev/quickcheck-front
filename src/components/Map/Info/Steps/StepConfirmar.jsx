import { CardContent, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import * as colors from '../../../../config/colors';

StepConfirmar.propTypes = {
  funcionarioNome: PropTypes.string.isRequired,
  horarioAtendimento: PropTypes.string.isRequired,
  descricao: PropTypes.string
};

export default function StepConfirmar({ funcionarioNome, horarioAtendimento, descricao }) {
  return (
    <CardContent>
      <Typography variant="h4" sx={{ color: colors.primaryWhiteColor, mb: '2rem' }}>
        Deseja confirmar a consulta?
      </Typography>
      <Typography variant="h4" sx={{ color: colors.primaryWhiteColor }}>
        {funcionarioNome}
      </Typography>
      <Typography variant="h4" sx={{ color: colors.primaryWhiteColor, mb: '2rem' }}>
        {horarioAtendimento}
      </Typography>
      <Typography variant="h6" sx={{ color: colors.primaryWhiteColor }}>
        {descricao}
      </Typography>
    </CardContent>
  );
}
