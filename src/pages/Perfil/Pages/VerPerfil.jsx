import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { VerticalContainer } from '../../../config/GlobalStyle';
import Cliente from '../Entidades/Cliente';
import Estabelecimento from '../Entidades/Estabelecimento';
import Funcionario from '../Entidades/Funcionario';
import { UserRoles } from '../../../config/enums';

export default function VerPerfil() {
  const navigate = useNavigate();

  const entidade = useSelector((state) => state?.usuarios?.entidade) || undefined;

  const buttonWidth = '100%';
  const buttonHeight = '3rem';

  function renderPerfil() {
    switch (entidade?.usuario?.role) {
      case UserRoles.ESTABELECIMENTO:
        return <Estabelecimento entidade={entidade} />;
      case UserRoles.FUNCIONARIO:
        return <Funcionario entidade={entidade} />;
      case UserRoles.CLIENTE:
      default:
        return <Cliente entidade={entidade} />;
    }
  }

  return (
    <VerticalContainer style={{ padding: '2rem' }}>
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
