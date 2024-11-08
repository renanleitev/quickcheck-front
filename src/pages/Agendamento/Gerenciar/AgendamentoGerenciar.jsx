import { useNavigate } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventNoteIcon from '@mui/icons-material/EventNote';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import BackButton from '../../../components/Button/BackButton';
import { VerticalContainer } from '../../../config/GlobalStyle';
import colors from '../../../config/colors';
import { RoutesList } from '../../../routes/enums';

export default function AgendamentoGerenciar() {
  const navigate = useNavigate();

  const buttonWidth = '15rem';
  const buttonHeight = '4rem';

  return (
    <VerticalContainer style={{ marginTop: '2rem' }}>
      <Typography variant="h4" color={colors.primaryDarkColor}>
        Gerenciar Consultas
      </Typography>
      <Button
        variant="contained"
        sx={{ width: buttonWidth, height: buttonHeight }}
        startIcon={<EventAvailableIcon />}
        onClick={() => navigate(RoutesList.AgendamentosCriar)}
      >
        Criar Horário
      </Button>
      <Button
        variant="contained"
        sx={{ width: buttonWidth, height: buttonHeight }}
        startIcon={<EventNoteIcon />}
        onClick={() => navigate(RoutesList.AgendamentosEditar)}
      >
        Editar Horário
      </Button>
      <Button
        variant="contained"
        sx={{ width: buttonWidth, height: buttonHeight }}
        startIcon={<EventBusyIcon />}
        onClick={() => navigate(RoutesList.AgendamentosApagar)}
      >
        Apagar Horário
      </Button>
      <BackButton />
    </VerticalContainer>
  );
}
