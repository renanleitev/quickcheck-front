import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Typography } from '@mui/material';
import { VerticalContainer, HorizontalContainer } from '../../../config/GlobalStyle';
import StepLogin from '../../../components/Step/StepContent/StepLogin';
import colors from '../../../config/colors';
import { alterarSenha } from '../../../store/modules/usuarios/reducer';
import { RoutesList } from '../../../routes/enums';

export default function AlterSenha() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const usuario = useSelector((state) => state?.usuarios?.entidade?.usuario) || undefined;

  const [data, setData] = useState({ ...usuario, repetirSenha: usuario?.senha });

  const color = colors.primaryDarkColor;

  const buttonWidth = '100%';
  const buttonHeight = '3rem';

  return (
    <VerticalContainer style={{ padding: '2rem' }}>
      <Typography variant="h4" color={color}>
        Alterar Senha
      </Typography>
      <VerticalContainer style={{ paddingBottom: '2rem' }}>
        <HorizontalContainer>
          <StepLogin data={data} setData={setData} isEmailDisabled />
          <Button
            variant="contained"
            color="success"
            onClick={() => dispatch(alterarSenha(data))}
            sx={{ width: buttonWidth, height: buttonHeight }}
          >
            Confirmar
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate(RoutesList.Perfil)}
            sx={{ width: buttonWidth, height: buttonHeight }}
          >
            Voltar
          </Button>
        </HorizontalContainer>
      </VerticalContainer>
    </VerticalContainer>
  );
}
