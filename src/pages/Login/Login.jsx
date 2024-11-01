import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Button } from '@mui/material';
import { loginUsuario } from '../../store/modules/usuarios/reducer';
import Input, { InputType } from '../../components/Input/Input';
import { VerticalContainer } from '../../config/GlobalStyle';
import colors from '../../config/colors';
import { roleOptions, UserRoles } from '../../config/enums';
import { loginCliente } from '../../store/modules/clientes/reducer';
import { loginEstabelecimento } from '../../store/modules/estabelecimentos/reducer';
import { loginFuncionario } from '../../store/modules/funcionarios/reducer';

export default function Login() {
  const initialUser = {
    email: '',
    senha: '',
    role: roleOptions[0].value // CLIENTE
  };

  const usuario = useSelector((state) => state.usuarios.usuario) || false;

  const [data, setData] = useState(initialUser);

  const dispatch = useDispatch();

  const handleLogin = useCallback(() => {
    // Primeiro, faz login dos dados do usuário
    dispatch(loginUsuario(data));
    // Depois, salva os dados de cada entidade
    switch (data.role) {
      case UserRoles.FUNCIONARIO:
        dispatch(loginFuncionario(usuario));
        break;
      case UserRoles.ESTABELECIMENTO:
        dispatch(loginEstabelecimento(usuario));
        break;
      case UserRoles.CLIENTE:
      default:
        dispatch(loginCliente(usuario));
        break;
    }
  }, [dispatch, data, usuario]);

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
