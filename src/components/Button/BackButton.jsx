import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RoutesList } from '../../routes/enums';

export default function BackButton() {
  const navigate = useNavigate();

  const buttonWidth = '15rem';
  const buttonHeight = '4rem';

  return (
    <Button sx={{ width: buttonWidth, height: buttonHeight }} onClick={() => navigate(RoutesList.Home)}>
      Voltar
    </Button>
  );
}
