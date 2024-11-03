import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import { VerticalContainer } from '../../config/GlobalStyle';
import colors from '../../config/colors';
import { styled } from '@mui/material/styles';
import CadastroOptions from './CadastroOptions';
import CadastroCliente from './Cliente/CadastroCliente';
import CadastroFuncionario from './Funcionario/CadastroFuncionario';
import CadastroEstabelecimento from './Estabelecimento/CadastroEstabelecimento';
import { UserRoles } from '../../config/enums';
import { RoutesList } from '../../routes/enums';

const StyledButton = styled(Button)(() => ({
  width: '15rem',
  padding: '1rem'
}));

export default function Cadastro() {
  const [role, setRole] = useState('');
  const [startCadastro, setStartCadastro] = useState(false);

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  // Sempre seleciona Cliente quando volta para a tela inicial
  useEffect(() => {
    if (!startCadastro) {
      setRole(UserRoles.CLIENTE);
    }
  }, [startCadastro]);

  function cadastroRender() {
    switch (role) {
      case UserRoles.ESTABELECIMENTO:
        return <CadastroEstabelecimento setStartCadastro={setStartCadastro} />;
      case UserRoles.FUNCIONARIO:
        return <CadastroFuncionario setStartCadastro={setStartCadastro} />;
      case UserRoles.CLIENTE:
      default:
        return <CadastroCliente setStartCadastro={setStartCadastro} />;
    }
  }

  return (
    <VerticalContainer style={{ backgroundColor: colors.primaryColor, height: '90%' }}>
      <VerticalContainer style={{ width: '15rem' }}>
        <Typography variant="h3">Cadastro</Typography>
        {startCadastro ? (
          cadastroRender()
        ) : (
          <>
            <CadastroOptions handleChange={handleChange} />
            <StyledButton variant="contained" onClick={() => setStartCadastro(true)}>
              Continuar
            </StyledButton>
          </>
        )}
      </VerticalContainer>
      {!startCadastro && (
        <Typography>
          Já possui uma conta? <Link to={RoutesList.Login}>Entrar</Link>
        </Typography>
      )}
    </VerticalContainer>
  );
}
