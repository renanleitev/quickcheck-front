import { useState } from 'react';
import { Typography, Button } from '@mui/material';
import Input, { InputType } from '../../components/Input/Input';
import { VerticalContainer } from '../../config/GlobalStyle';
import * as colors from '../../config/colors';

export default function Login() {
  const roleOptions = [
    { value: 'cliente', label: 'Paciente' },
    { value: 'funcionario', label: 'Médico' },
    { value: 'estabelecimento', label: 'Hospital/Clínica' }
  ];

  const initialData = {
    email: '',
    senha: '',
    tipo: roleOptions[0].value
  };

  const [data, setData] = useState(initialData);

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
        <Input data={data} setData={setData} keyName="tipo" select selectList={roleOptions} />
        <Button variant="contained" sx={{ width: '15rem', padding: '1rem' }}>
          Entrar
        </Button>
      </VerticalContainer>
    </VerticalContainer>
  );
}
