import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { VerticalContainer } from '../../../config/GlobalStyle';
import StepPessoal from '../../Cadastro/Cliente/Steps/StepPessoal';
import colors from '../../../config/colors';
import { clientes } from '../../../mocks/clientes';
import {formatCalendarDate} from '../../../hooks/formatDate';

export default function EditarPerfil() {
  const navigate = useNavigate();
  const [data, setData] = useState({...clientes[0], nascimento: formatCalendarDate(clientes[0].nascimento)});

  const color = colors.primaryDarkColor;

  const buttonWidth = '100%';
  const buttonHeight = '3rem';

  return (
    <VerticalContainer style={{ padding: '2rem' }}>
      <Typography variant="h4" color={color}>
        Editar Perfil
      </Typography>
      <VerticalContainer style={{ paddingBottom: '2rem' }}>
        <StepPessoal data={data} setData={setData} />
        <Button
          variant="contained"
          color="success"
          onClick={() => {}}
          sx={{ width: buttonWidth, height: buttonHeight }}
        >
          Editar
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
