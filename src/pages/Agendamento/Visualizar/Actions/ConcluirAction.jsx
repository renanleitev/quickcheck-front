import UpdateAction, { UpdateActionCommonType } from './UpdateAction';
import { AgendamentoStatus } from '../../../../config/enums';
import { updateHorarioStatus } from '../../../../store/modules/horarios/reducer';

ConcluirAction.propTypes = UpdateActionCommonType;

export default function ConcluirAction({ horario, setHorario, status }) {
  return (
    <UpdateAction
      horario={horario}
      setHorario={setHorario}
      title="Concluir a consulta?"
      onUpdate={updateHorarioStatus({
        horario: { ...horario, status: AgendamentoStatus.CONCLUÍDO }
      })}
      confirmColor="success"
      buttonLabel="Concluir"
      confirmLabel="Concluir"
      readOnlyText="Você deseja concluir a consulta? Uma vez concluída, não será possível editar o prontuário."
      disabled={status !== AgendamentoStatus.AGENDADO}
      keyName="status"
    />
  );
}
