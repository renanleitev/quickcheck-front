import { Chip } from '@mui/material';
import { AgendamentoStatus } from '../../config/enums';
import PropTypes from 'prop-types';

ChipStatus.propTypes = {
  status: PropTypes.string.isRequired
};

export default function ChipStatus({ status }) {
  switch (status.toUpperCase()) {
    case AgendamentoStatus.CONCLUÍDO:
      return <Chip label={status} color="success" />;
    case AgendamentoStatus.CANCELADO:
      return <Chip label={status} color="error" />;
    case AgendamentoStatus.AGENDADO:
      return <Chip label={status} color="info" />;
    case AgendamentoStatus.PENDENTE:
      return <Chip label={status} color="warning" />;
    case AgendamentoStatus.DISPONÍVEL:
    default:
      return <Chip label={status} color="secondary" />;
  }
}
