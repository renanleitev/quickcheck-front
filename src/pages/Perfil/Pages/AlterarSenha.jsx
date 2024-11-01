import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Typography } from '@mui/material';
import { VerticalContainer } from '../../../config/GlobalStyle';
import StepLogin from '../../../components/Step/StepContent/StepLogin';
import colors from '../../../config/colors';

export default function AlterSenha() {
  const navigate = useNavigate();

  const entidade = useSelector((state) => state?.usuarios?.entidade) || undefined;

  const [data, setData] = useState({
    senha: entidade?.usuario?.senha,
    email: entidade?.usuario?.email
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
