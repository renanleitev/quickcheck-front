import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { VerticalContainer } from '../../../config/GlobalStyle';
import StepPessoal from '../../../components/Step/StepContent/StepPessoal';
import StepContato from '../../../components/Step/StepContent/StepContato';
import StepSaude from '../../../components/Step/StepContent/StepSaude';
import StepProfissao from '../../../components/Step/StepContent/StepProfissao';
import StepDescricao from '../../../components/Step/StepContent/StepDescricao';
import colors from '../../../config/colors';
import { clientes } from '../../../mocks/clientes';
import { formatCalendarDate } from '../../../hooks/formatDate';
import { UserRoles } from '../../../config/enums';

export default function EditarPerfil() {
  const navigate = useNavigate();

  // TODO: Substituir dado mockado por dados reais da API
  const [data, setData] = useState({
    ...clientes[0],
    nascimento: formatCalendarDate(clientes[0].nascimento)
  });

  const color = colors.primaryDarkColor;

  const buttonWidth = '100%';
  const buttonHeight = '3rem';

  function renderPerfil() {
    switch (data.role) {
      case UserRoles.ESTABELECIMENTO:
        return (
          <>
            <StepPessoal data={data} setData={setData} role={UserRoles.ESTABELECIMENTO} />
            <StepContato data={data} setData={setData} />
            <StepDescricao data={data} setData={setData} />
          </>
        );
      case UserRoles.FUNCIONARIO:
        return (
          <>
            <StepPessoal data={data} setData={setData} />
            <StepContato data={data} setData={setData} />
            <StepProfissao data={data} setData={setData} />
          </>
        );
      case UserRoles.CLIENTE:
      default:
        return (
          <>
            <StepPessoal data={data} setData={setData} />
            <StepContato data={data} setData={setData} />
            <StepSaude data={data} setData={setData} />
          </>
        );
    }
  }

  return (
    <VerticalContainer style={{ padding: '2rem' }}>
      <Typography variant="h4" color={color}>
        Editar Perfil
      </Typography>
      <VerticalContainer style={{ paddingBottom: '2rem' }}>
        {renderPerfil()}
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
