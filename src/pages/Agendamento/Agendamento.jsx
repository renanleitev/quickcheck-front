import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import AgendamentoLista from './AgendamentoLista';
import { VerticalContainer } from '../../config/GlobalStyle';
import BackButton from '../../components/Button/BackButton';
import colors from '../../config/colors';
import { UserRoles } from '../../config/enums';

export default function Agendamento() {
  const usuario = useSelector((state) => state?.usuarios?.entidade?.usuario) || undefined;

  return (
    <VerticalContainer style={{ padding: '2rem' }}>
      <Typography variant="h4" color={colors.primaryDarkColor}>
        Minhas consultas
      </Typography>
      <AgendamentoLista />
      {usuario?.role === UserRoles.CLIENTE && <BackButton />}
    </VerticalContainer>
  );
}
