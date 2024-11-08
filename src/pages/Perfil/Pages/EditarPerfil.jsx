import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Typography } from '@mui/material';
import { VerticalContainer, HorizontalContainer } from '../../../config/GlobalStyle';
import StepPessoal from '../../../components/Step/StepContent/StepPessoal';
import StepContato from '../../../components/Step/StepContent/StepContato';
import StepSaude from '../../../components/Step/StepContent/StepSaude';
import StepProfissao from '../../../components/Step/StepContent/StepProfissao';
import StepDescricao from '../../../components/Step/StepContent/StepDescricao';
import colors from '../../../config/colors';
import { formatCalendarDate } from '../../../hooks/formatDate';
import { UserRoles } from '../../../config/enums';
import { RoutesList } from '../../../routes/enums';

export default function EditarPerfil() {
  const navigate = useNavigate();

  const entidade = useSelector((state) => state?.usuarios?.entidade) || undefined;

  const usuarioRole = entidade?.usuario?.role;

  const [data, setData] = useState({
    ...entidade,
    crm: usuarioRole === UserRoles.FUNCIONARIO ? entidade?.crm?.split('-')[0] : '',
    estadoCrm: usuarioRole === UserRoles.FUNCIONARIO ? entidade?.crm?.split('-')[1] : '',
    nome: entidade?.usuario?.nome,
    telefone: entidade?.usuario?.telefone,
    endereco: entidade?.usuario?.endereco,
    role: entidade?.usuario?.role,
    nascimento: formatCalendarDate(entidade?.nascimento),
    imagem: entidade?.usuario?.imagem
  });

  const color = colors.primaryDarkColor;

  const buttonWidth = '100%';
  const buttonHeight = '3rem';

  function renderPerfil() {
    switch (data?.role) {
      case UserRoles.ESTABELECIMENTO:
        return (
          <HorizontalContainer>
            <StepPessoal data={data} setData={setData} role={UserRoles.ESTABELECIMENTO} />
            <StepContato data={data} setData={setData} />
            <StepDescricao data={data} setData={setData} />
          </HorizontalContainer>
        );
      case UserRoles.FUNCIONARIO:
        return (
          <HorizontalContainer>
            <StepPessoal data={data} setData={setData} />
            <StepContato data={data} setData={setData} />
            <StepProfissao data={data} setData={setData} />
          </HorizontalContainer>
        );
      case UserRoles.CLIENTE:
      default:
        return (
          <HorizontalContainer>
            <StepPessoal data={data} setData={setData} />
            <StepContato data={data} setData={setData} />
            <StepSaude data={data} setData={setData} />
          </HorizontalContainer>
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
          onClick={() => navigate(RoutesList.Perfil)}
          sx={{ width: buttonWidth, height: buttonHeight }}
        >
          Voltar
        </Button>
      </VerticalContainer>
    </VerticalContainer>
  );
}
