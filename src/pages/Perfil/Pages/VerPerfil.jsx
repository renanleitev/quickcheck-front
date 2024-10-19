import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { VerticalContainer } from '../../../config/GlobalStyle';
import { clientes } from '../../../mocks/clientes';
import colors from '../../../config/colors';
import { formatBirthDate } from '../../../hooks/formatDate';

export default function VerPerfil() {
  const navigate = useNavigate();

  const cliente = clientes[0];

  const color = colors.primaryDarkColor;

  return (
    <VerticalContainer style={{ padding: '2rem' }}>
      <Typography variant="h4" color={color}>
        Perfil
      </Typography>
      <VerticalContainer style={{ paddingBottom: '2rem' }}>
        <VerticalContainer style={{ alignItems: 'flex-start' }}>
          <Typography variant="h6" color={color}>
            Nome: {cliente.nome}
          </Typography>
          <Typography variant="h6" color={color}>
            CPF: {cliente.CPF}
          </Typography>
          <Typography variant="h6" color={color}>
            Idade: {cliente.idade}
          </Typography>
          <Typography variant="h6" color={color}>
            Data de Nascimento: {formatBirthDate(cliente.nascimento)}
          </Typography>
          <Typography variant="h6" color={color}>
            Email: {cliente.email}
          </Typography>
          <Typography variant="h6" color={color}>
            Telefone: {cliente.telefone}
          </Typography>
          <Typography variant="h6" color={color}>
            Endereço: {cliente.endereco}
          </Typography>
          <Typography variant="h6" color={color}>
            Comorbidades: {cliente.comorbidades}
          </Typography>
          <Typography variant="h6" color={color}>
            Número Cartão SUS: {cliente.numeroCartaoSUS}
          </Typography>
        </VerticalContainer>
        <Button
          variant="contained"
          onClick={() => navigate('/perfil')}
          sx={{ width: '100%', height: '4rem' }}
        >
          Voltar
        </Button>
      </VerticalContainer>
    </VerticalContainer>
  );
}
