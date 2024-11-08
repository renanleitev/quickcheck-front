import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
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
import { atualizarUsuario } from '../../../store/modules/usuarios/reducer';
import { atualizarCliente } from '../../../store/modules/clientes/reducer';
import { atualizarEstabelecimento } from '../../../store/modules/estabelecimentos/reducer';
import { atualizarFuncionario } from '../../../store/modules/funcionarios/reducer';

export default function EditarPerfil() {
  const navigate = useNavigate();

  const entidade = useSelector((state) => state?.usuarios?.entidade) || undefined;

  const usuarioRole = entidade?.usuario?.role;

  // Dados alterados pelo formulário
  const [data, setData] = useState({
    ...entidade,
    role: entidade?.usuario?.role,
    crm: usuarioRole === UserRoles.FUNCIONARIO ? entidade?.crm?.split('-')[0] : '',
    estadoCrm: usuarioRole === UserRoles.FUNCIONARIO ? entidade?.crm?.split('-')[1] : '',
    nome: entidade?.usuario?.nome ?? '',
    telefone: entidade?.usuario?.telefone ?? '',
    endereco: entidade?.usuario?.endereco ?? '',
    nascimento: formatCalendarDate(entidade?.nascimento) ?? '',
    imagem: entidade?.usuario?.imagem ?? ''
  });

  // Dados enviados para a API
  const usuarioFinal = {
    ...data,
    id: data?.id,
    usuario: {
      id: data?.usuario?.id,
      nome: data?.nome,
      telefone: data?.telefone,
      endereco: data?.endereco,
      role: data?.usuario?.role, // Padrão, usuário não edita essa informação
      senha: data?.usuario?.senha, // Padrão, usuário não edita essa informação
      email: data?.usuario?.email, // Padrão, usuário não edita essa informação
      imagem: data?.imagem
    }
  };

  const color = colors.primaryDarkColor;

  const buttonWidth = '100%';
  const buttonHeight = '3rem';

  const dispatch = useDispatch();

  const handleEdit = () => {
    switch (data?.role) {
      case UserRoles.ESTABELECIMENTO:
        dispatch(atualizarUsuario(usuarioFinal.usuario));
        dispatch(atualizarEstabelecimento(usuarioFinal));
        break;
      case UserRoles.FUNCIONARIO:
        dispatch(atualizarUsuario(usuarioFinal.usuario));
        dispatch(atualizarFuncionario(usuarioFinal));
        break;
      case UserRoles.CLIENTE:
      default:
        dispatch(atualizarUsuario(usuarioFinal.usuario));
        dispatch(atualizarCliente(usuarioFinal));
        break;
    }
  };

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
          onClick={() => handleEdit()}
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
