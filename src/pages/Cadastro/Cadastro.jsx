import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import { VerticalContainer } from '../../config/GlobalStyle';
import colors from '../../config/colors';
import { styled } from '@mui/material/styles';
import CadastroRender from './CadastroRender';
import CadastroOptions from './CadastroOptions';
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

  return (
    <VerticalContainer style={{ backgroundColor: colors.primaryColor, height: '90%' }}>
      <VerticalContainer style={{ width: '15rem' }}>
        <Typography variant="h3">Cadastro</Typography>
        {startCadastro ? (
          <CadastroRender userRole={role} setStartCadastro={setStartCadastro} />
        ) : (
          <>
            <CadastroOptions handleChange={handleChange} />
            <StyledButton variant="contained" onClick={() => setStartCadastro(true)}>
              Continuar
            </StyledButton>
          </>
        )}
      </VerticalContainer>
      <Typography>
        Já possui uma conta? <Link to={RoutesList.Login}>Entrar</Link>
      </Typography>
    </VerticalContainer>
  );
}
