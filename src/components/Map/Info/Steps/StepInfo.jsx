import { CardMedia, CardContent, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import colors from '../../../../config/colors';

StepInfo.propTypes = {
  imagem: PropTypes.string,
  horarioFuncionamento: PropTypes.string
};

export default function StepInfo({ imagem, horarioFuncionamento }) {
  const noImage = "https://www.shutterstock.com/image-vector/image-icon-trendy-flat-style-600nw-643080895.jpg";

  return (
    <>
      <CardMedia component="img" height="294" image={imagem ?? noImage} alt="Imagem" />
      <CardContent>
        <Typography variant="body2" sx={{ color: colors.primaryWhiteColor }}>
          {horarioFuncionamento}
        </Typography>
      </CardContent>
    </>
  );
}
