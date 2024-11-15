import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';

import ClienteTable from './Visualizar/Tables/ClienteTable';
import EstabelecimentoTable from './Visualizar/Tables/EstabelecimentoTable';
import FuncionarioTable from './Visualizar/Tables/FuncionarioTable';
import { UserRoles } from '../../config/enums';
import { VerticalContainer } from '../../config/GlobalStyle';
import BackButton from '../../components/Button/BackButton';
import colors from '../../config/colors';

export default function Agendamento() {
  const entidade = useSelector((state) => state?.usuarios?.entidade) || [];

  function renderAgendamentoVisualizar() {
    switch (entidade?.usuario?.role) {
      case UserRoles.FUNCIONARIO:
        return <FuncionarioTable />;
      case UserRoles.ESTABELECIMENTO:
        return <EstabelecimentoTable />;
      case UserRoles.CLIENTE:
      default:
        return <ClienteTable />;
    }
  }

  return (
    <VerticalContainer style={{ padding: '2rem' }}>
      <Typography variant="h4" color={colors.primaryDarkColor}>
        Minhas consultas
      </Typography>
      {renderAgendamentoVisualizar()}
      <BackButton />
    </VerticalContainer>
  );
}
