import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Typography, Button, CircularProgress } from '@mui/material';

import { loginUsuario } from '../../store/modules/usuarios/reducer';
import Input from '../../components/Input/Input';
import { VerticalContainer } from '../../config/GlobalStyle';
import colors from '../../config/colors';
import { roleOptions } from '../../config/enums';
import useValidateLogin from '../../components/Input/Validation/useValidateLogin';
import InputLogin from '../../components/Input/Content/InputLogin';
import { RoutesList } from '../../routes/enums';

export default function Login() {
  const initialUser = {
    email: '',
    senha: '',
    role: roleOptions[0].value // CLIENTE
  };

  const [data, setData] = useState(initialUser);

  const [isLoading, setIsLoading] = useState(false);

  const { validateLogin, ...errorsLogin } = useValidateLogin({
    email: data.email,
    senha: data.senha
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogin = useCallback(() => {
    setIsLoading(true);
    validateLogin();
    dispatch(loginUsuario(data));
    setIsLoading(false);
    navigate(RoutesList.Home);
  }, [validateLogin, dispatch, data, navigate]);

  return (
    <VerticalContainer style={{ backgroundColor: colors.primaryColor, height: '90%' }}>
      <VerticalContainer style={{ width: '15rem' }}>
        <Typography variant="h3">Login</Typography>
        <InputLogin data={data} setData={setData} errors={errorsLogin} hasRepetirSenha={false} />
        <Input data={data} setData={setData} keyName="role" select selectList={roleOptions} />
        <Button
          variant="contained"
          sx={{ width: '15rem', padding: '1rem' }}
          onClick={() => handleLogin()}
        >
          {isLoading ? (
            <CircularProgress size="1rem" sx={{ color: colors.primaryWhiteColor }} />
          ) : (
            <Typography color={colors.primaryWhiteColor}>Entrar</Typography>
          )}
        </Button>
        <Typography>
          Primeiro acesso? <Link to={RoutesList.Cadastro}>Cadastre-se!</Link>
        </Typography>
      </VerticalContainer>
    </VerticalContainer>
  );
}
