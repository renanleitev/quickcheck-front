import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { VerticalContainer } from '../../../config/GlobalStyle';
import { clientes } from '../../../mocks/clientes';
import Cliente from '../Content/Cliente';
import Estabelecimento from '../Content/Estabelecimento';
import Funcionario from '../Content/Funcionario';
import colors from '../../../config/colors';
import { UserRoles } from '../../../config/enums';

export default function VerPerfil() {
  const navigate = useNavigate();

  // TODO: Substituir dado mockado por dados reais da API
  const cliente = clientes[0];

  const color = colors.primaryDarkColor;

  const buttonWidth = '100%';
  const buttonHeight = '3rem';

  function renderPerfil() {
    switch (cliente.role) {
      case UserRoles.ESTABELECIMENTO:
        return <Estabelecimento user={cliente} />;
      case UserRoles.FUNCIONARIO:
        return <Funcionario user={cliente} />;
      case UserRoles.CLIENTE:
      default:
        return <Cliente user={cliente} />;
    }
  }

  return (
    <VerticalContainer style={{ padding: '2rem' }}>
      <Typography variant="h4" color={color}>
        Perfil
      </Typography>
      <VerticalContainer style={{ paddingBottom: '2rem' }}>
        <VerticalContainer style={{ alignItems: 'flex-start' }}>{renderPerfil()}</VerticalContainer>
        <Button
          variant="contained"
          sx={{ width: buttonWidth, height: buttonHeight }}
          color="success"
          startIcon={<EditIcon />}
          onClick={() => navigate('/editar-perfil')}
        >
          Editar Perfil
        </Button>
        <Button
          variant="contained"
          sx={{ width: buttonWidth, height: buttonHeight }}
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => navigate('/apagar-perfil')}
        >
          Apagar Perfil
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
