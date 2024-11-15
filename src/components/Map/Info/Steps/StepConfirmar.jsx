import { CardContent, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import colors from '../../../../config/colors';

StepConfirmar.propTypes = {
  title: PropTypes.string.isRequired,
  funcionarioNome: PropTypes.string,
  horarioAtendimento: PropTypes.string.isRequired,
  descricao: PropTypes.string,
  hasComprovante: PropTypes.bool
};

export default function StepConfirmar({ title, funcionarioNome, horarioAtendimento, descricao }) {
  return (
    <CardContent>
      <Typography variant="h4" sx={{ color: colors.primaryWhiteColor, mb: '2rem' }}>
        {title}
      </Typography>
      <Typography variant="h4" sx={{ color: colors.primaryWhiteColor, marginBottom: '1rem' }}>
        {funcionarioNome}
      </Typography>
      <Typography variant="h4" sx={{ color: colors.primaryWhiteColor, mb: '1rem' }}>
        {horarioAtendimento}
      </Typography>
      <Typography variant="h6" sx={{ color: colors.primaryWhiteColor }}>
        {descricao}
      </Typography>
    </CardContent>
  );
}
