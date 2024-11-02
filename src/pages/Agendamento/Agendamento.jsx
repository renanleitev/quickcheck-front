import { Typography } from '@mui/material';
import AgendamentoLista from './AgendamentoLista';
import { VerticalContainer } from '../../config/GlobalStyle';
import BackButton from '../../components/Button/BackButton';
import colors from '../../config/colors';

export default function Agendamento() {
  return (
    <VerticalContainer style={{ padding: '2rem' }}>
      <Typography variant="h4" color={colors.primaryDarkColor}>
        Minhas consultas
      </Typography>
      <AgendamentoLista />
      <BackButton />
    </VerticalContainer>
  );
}
