import { useState } from 'react';
import { Typography, Button } from '@mui/material';
import { VerticalContainer } from '../../config/GlobalStyle';
import * as colors from '../../config/colors';
import { styled } from '@mui/material/styles';
import CadastroRender from './CadastroRender';
import CadastroOptions from './CadastroOptions';
import { UserRoles } from '../../config/enums';

const StyledButton = styled(Button)(() => ({
  width: '15rem',
  padding: '1rem'
}));

export default function Cadastro() {
  const [option, setOption] = useState(UserRoles.CLIENTE);
  const [role, setRole] = useState('');

  const handleChange = (event) => {
    setOption(event.target.value);
  };

  const handleRole = () => {
    if (role === '') {
      setRole(option);
    } else {
      setRole('');
    }
  };

  return (
    <VerticalContainer style={{ backgroundColor: colors.primaryColor, height: '90%' }}>
      <VerticalContainer style={{ width: '15rem' }}>
        <Typography variant="h3">Cadastro</Typography>
        {role === '' ? (
          <>
            <CadastroOptions handleChange={handleChange} />
            <StyledButton variant="contained" onClick={handleRole}>
              Continuar
            </StyledButton>
          </>
        ) : (
          <CadastroRender userRole={role} setUserRole={setRole} />
        )}
      </VerticalContainer>
    </VerticalContainer>
  );
}
