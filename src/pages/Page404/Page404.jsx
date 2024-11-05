import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { VerticalContainer } from '../../config/GlobalStyle';
import colors from '../../config/colors';
import { RoutesList } from '../../routes/enums';

export default function Page404() {
  const navigate = useNavigate();

  return (
    <VerticalContainer style={{ height: '50%', padding: '2rem' }}>
      <Typography variant="h4" color={colors.primaryDarkColor}>
        Erro. Página não encontrada.
      </Typography>
      <Button
        variant="contained"
        sx={{ height: '4rem', width: '15rem' }}
        onClick={() => navigate(RoutesList.Home)}
      >
        Página Inicial
      </Button>
    </VerticalContainer>
  );
}
