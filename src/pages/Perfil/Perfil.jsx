import { useNavigate } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import KeyIcon from '@mui/icons-material/Key';
import BackButton from '../../components/Button/BackButton';
import { VerticalContainer } from '../../config/GlobalStyle';
import colors from '../../config/colors';
import { RoutesList } from '../../routes/enums';

export default function Perfil() {
  const navigate = useNavigate();

  const buttonWidth = '15rem';
  const buttonHeight = '4rem';

  return (
    <VerticalContainer style={{ marginTop: '2rem' }}>
      <Typography variant="h4" color={colors.primaryDarkColor}>
        Meu Perfil
      </Typography>
      <Button
        variant="contained"
        sx={{ width: buttonWidth, height: buttonHeight }}
        startIcon={<SearchIcon />}
        onClick={() => navigate(RoutesList.VerPerfil)}
      >
        Ver Perfil
      </Button>
      <Button
        variant="contained"
        sx={{ width: buttonWidth, height: buttonHeight }}
        startIcon={<KeyIcon />}
        onClick={() => navigate(RoutesList.AlterarSenha)}
      >
        Alterar Senha
      </Button>
      <Button
        variant="contained"
        sx={{ width: buttonWidth, height: buttonHeight }}
        startIcon={<EditIcon />}
        onClick={() => navigate(RoutesList.EditarPerfil)}
      >
        Editar Perfil
      </Button>
      <BackButton />
    </VerticalContainer>
  );
}
