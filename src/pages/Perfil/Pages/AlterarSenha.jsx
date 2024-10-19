import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { VerticalContainer } from '../../../config/GlobalStyle';
import StepLogin from '../../../components/StepContent/StepLogin';
import colors from '../../../config/colors';
import { clientes } from '../../../mocks/clientes';
import { formatCalendarDate } from '../../../hooks/formatDate';

export default function AlterSenha() {
  const navigate = useNavigate();

  // TODO: Substituir dado mockado por dados reais da API
  const [data, setData] = useState({
    ...clientes[0],
    nascimento: formatCalendarDate(clientes[0].nascimento)
  });

  const color = colors.primaryDarkColor;

  const buttonWidth = '100%';
  const buttonHeight = '3rem';

  return (
    <VerticalContainer style={{ padding: '2rem' }}>
      <Typography variant="h4" color={color}>
        Alterar Senha
      </Typography>
      <VerticalContainer style={{ paddingBottom: '2rem' }}>
        <StepLogin data={data} setData={setData} />
        <Button
          variant="contained"
          color="success"
          onClick={() => {}}
          sx={{ width: buttonWidth, height: buttonHeight }}
        >
          Confirmar
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate('/perfil')}
          sx={{ width: buttonWidth, height: buttonHeight }}
        >
          Voltar
        </Button>
      </VerticalContainer>
    </VerticalContainer>
  );
}
