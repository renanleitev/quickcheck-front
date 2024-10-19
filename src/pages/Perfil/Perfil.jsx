import { Typography, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import KeyIcon from '@mui/icons-material/Key';
import BackButton from '../../components/Button/BackButton';
import { VerticalContainer } from '../../config/GlobalStyle';
import colors from '../../config/colors';
import { useNavigate } from 'react-router-dom';

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
        onClick={() => navigate('/ver-perfil')}
      >
        Ver Perfil
      </Button>
      <Button
        variant="contained"
        sx={{ width: buttonWidth, height: buttonHeight }}
        startIcon={<KeyIcon />}
        onClick={() => navigate('/alterar-senha')}
      >
        Alterar Senha
      </Button>
      <Button
        variant="contained"
        sx={{ width: buttonWidth, height: buttonHeight }}
        startIcon={<EditIcon />}
        onClick={() => navigate('/editar-perfil')}
      >
        Editar Perfil
      </Button>
      <BackButton />
    </VerticalContainer>
  );
}
