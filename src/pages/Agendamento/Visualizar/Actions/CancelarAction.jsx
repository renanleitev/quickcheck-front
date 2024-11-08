import UpdateAction, { UpdateActionCommonType } from './UpdateAction';
import { AgendamentoStatus } from '../../../../config/enums';
import { updateHorarioStatus } from '../../../../store/modules/horarios/reducer';

CancelarAction.propTypes = UpdateActionCommonType;

export default function CancelarAction({ horario, setHorario, status }) {
  return (
    <UpdateAction
      horario={horario}
      setHorario={setHorario}
      title="Cancelar a consulta?"
      onUpdate={updateHorarioStatus({
        horario: { ...horario, status: AgendamentoStatus.CANCELADO }
      })}
      confirmColor="error"
      buttonLabel="Cancelar"
      confirmLabel="Cancelar"
      readOnlyText="Você deseja cancelar a consulta? Uma vez cancelada, não será possível agendar ou concluir a consulta."
      confirmActionColor="error"
      disabled={
        status === AgendamentoStatus.CANCELADO ||
        status === AgendamentoStatus.CONCLUÍDO
      }
      keyName="status"
    />
  );
}
