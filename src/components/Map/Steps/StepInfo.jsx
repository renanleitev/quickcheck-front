import { CardMedia, CardContent, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import * as colors from '../../../config/colors';

StepInfo.propTypes = {
  imagem: PropTypes.string.isRequired,
  horarioFuncionamento: PropTypes.string.isRequired
};

export default function StepInfo({ imagem, horarioFuncionamento }) {
  return (
    <>
      <CardMedia component="img" height="194" image={imagem} alt="Imagem" />
      <CardContent>
        <Typography variant="body2" sx={{ color: colors.primaryWhiteColor }}>
          {horarioFuncionamento}
        </Typography>
      </CardContent>
    </>
  );
}
