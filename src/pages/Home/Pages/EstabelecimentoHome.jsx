import { Button, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import { VerticalContainer } from '../../../config/GlobalStyle';
import { RoutesList } from '../../../routes/enums';
import colors from '../../../config/colors';

export default function EstabelecimentoHome() {
  const navigate = useNavigate();

  const buttonWidth = '15rem';
  const buttonHeight = '4rem';

  return (
    <VerticalContainer style={{ padding: '2rem' }}>
      <Typography variant="h4" color={colors.primaryDarkColor}>
        Página Principal
      </Typography>
      <Button
        variant="contained"
        sx={{ width: buttonWidth, height: buttonHeight }}
        startIcon={<SearchIcon />}
        onClick={() => navigate(RoutesList.AgendamentosLista)}
      >
        Visualizar Horários
      </Button>
      <Button
        variant="contained"
        sx={{ width: buttonWidth, height: buttonHeight }}
        startIcon={<EditIcon />}
        // onClick={() => navigate('/apagar-perfil')}
      >
        Gerenciar Horários
      </Button>
      <Button
        variant="contained"
        sx={{ width: buttonWidth, height: buttonHeight }}
        startIcon={<PersonIcon />}
        onClick={() => navigate(RoutesList.Perfil)}
      >
        Visualizar Perfil
      </Button>
    </VerticalContainer>
  );
}
