import { Typography } from '@mui/material';
import AgendamentoLista from './AgendamentoLista';
import { VerticalContainer } from '../../config/GlobalStyle';
import BackButton from '../../components/Button/BackButton';
import colors from '../../config/colors';

export default function Agendamento() {
  const color = colors.primaryDarkColor;

  return (
    <VerticalContainer style={{ padding: '2rem' }}>
      <Typography variant="h4" color={color}>
        Minhas consultas
      </Typography>
      <AgendamentoLista />
      <BackButton />
    </VerticalContainer>
  );
}
