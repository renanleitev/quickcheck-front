import { Box, CardMedia, CardContent, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import colors from '../../../../config/colors';

StepInfo.propTypes = {
  imagem: PropTypes.string,
  info: PropTypes.string,
  subInfo: PropTypes.string,
  descricao: PropTypes.string,
  alignItems: PropTypes.string
};

export default function StepInfo({ imagem, info, subInfo, descricao, alignItems = 'center' }) {
  const noImage =
    'https://www.shutterstock.com/image-vector/image-icon-trendy-flat-style-600nw-643080895.jpg';

  return (
    <>
      <CardMedia component="img" height="294" image={imagem ?? noImage} alt="Imagem" />
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: alignItems }}>
          {info && (
            <Typography variant="body2" sx={{ color: colors.primaryWhiteColor }}>
              {info}
            </Typography>
          )}
          {subInfo && (
            <Typography variant="subtitle2" sx={{ color: colors.primaryWhiteColor }}>
              {subInfo}
            </Typography>
          )}
          {descricao && (
            <Typography variant="subtitle2" sx={{ color: colors.primaryWhiteColor }}>
              {descricao}
            </Typography>
          )}
        </Box>
      </CardContent>
    </>
  );
}
