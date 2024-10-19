import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function BackButton() {
  const navigate = useNavigate();

  const buttonWidth = '15rem';
  const buttonHeight = '4rem';

  return (
    <Button sx={{ width: buttonWidth, height: buttonHeight }} onClick={() => navigate('/')}>
      Voltar
    </Button>
  );
}
