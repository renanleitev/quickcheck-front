import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Typography, Button } from '@mui/material';
import { loginUsuario } from '../../store/modules/usuarios/reducer';
import Input, { InputType } from '../../components/Input/Input';
import { VerticalContainer } from '../../config/GlobalStyle';
import colors from '../../config/colors';
import { roleOptions } from '../../config/enums';

export default function Login() {
  const initialUser = {
    email: '',
    senha: '',
    role: roleOptions[0].value // CLIENTE
  };

  const [data, setData] = useState(initialUser);

  const dispatch = useDispatch();

  const handleLogin = useCallback(() => {
    dispatch(loginUsuario(data));
  }, [dispatch, data]);

  return (
    <VerticalContainer style={{ backgroundColor: colors.primaryColor, height: '90%' }}>
      <VerticalContainer style={{ width: '15rem' }}>
        <Typography variant="h3">Login</Typography>
        <Input data={data} setData={setData} keyName="email" placeholder="Email" />
        <Input
          data={data}
          setData={setData}
          keyName="senha"
          placeholder="Senha"
          inputType={InputType.PASSWORD}
        />
        <Input data={data} setData={setData} keyName="role" select selectList={roleOptions} />
        <Button
          variant="contained"
          sx={{ width: '15rem', padding: '1rem' }}
          onClick={() => handleLogin()}
        >
          Entrar
        </Button>
        <Typography>
          Primeiro acesso? <Link to="/cadastro">Cadastre-se!</Link>
        </Typography>
      </VerticalContainer>
    </VerticalContainer>
  );
}
