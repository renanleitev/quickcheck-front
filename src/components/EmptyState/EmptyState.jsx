import { Typography } from '@mui/material';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import PropTypes from 'prop-types';

import { VerticalContainer, HorizontalContainer } from '../../config/GlobalStyle';
import colors from '../../config/colors';

EmptyState.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
};

export default function EmptyState({ title, subtitle }) {
  return (
    <HorizontalContainer>
      <VerticalContainer>
        <ContentPasteSearchIcon sx={{ color: colors.primaryWhiteColor, fontSize: 80 }} />
        {title && (
          <Typography variant="h5" sx={{ color: colors.primaryWhiteColor, textAlign: 'center' }}>
            {title}
          </Typography>
        )}
        {subtitle && (
          <Typography sx={{ color: colors.primaryWhiteColor, textAlign: 'center' }}>
            {subtitle}
          </Typography>
        )}
      </VerticalContainer>
    </HorizontalContainer>
  );
}
