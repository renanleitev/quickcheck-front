import { CircularProgress } from '@mui/material';
import { VerticalContainer } from '../../config/GlobalStyle';
import colors from '../../config/colors';

export default function LoadingProgress() {
  return (
    <VerticalContainer style={{ padding: '2rem' }}>
      <CircularProgress sx={{ color: colors.primaryWhiteColor }} />
    </VerticalContainer>
  );
}
