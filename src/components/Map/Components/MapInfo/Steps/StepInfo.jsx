import { Box, CardMedia, CardContent, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import colors from '../../../../../config/colors';

StepInfo.propTypes = {
  imagem: PropTypes.string,
  info: PropTypes.string,
  subInfo: PropTypes.string,
  descricao: PropTypes.string,
  alignItems: PropTypes.string,
  objectFit: PropTypes.string
};

export default function StepInfo({
  imagem,
  info,
  subInfo,
  descricao,
  alignItems = 'center',
  objectFit = 'cover'
}) {
  return (
    <>
      <CardMedia
        component="img"
        height="260"
        sx={{ objectFit: objectFit }}
        image={imagem}
        alt="Imagem"
      />
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
