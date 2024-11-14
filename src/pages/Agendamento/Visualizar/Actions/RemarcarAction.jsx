import UpdateModal, { UpdateActionCommonType } from '../../../../components/Modal/UpdateModal';
import { AgendamentoStatus } from '../../../../config/enums';
import { updateHorario } from '../../../../store/modules/horarios/reducer';

RemarcarAction.propTypes = UpdateActionCommonType;

export default function RemarcarAction({ horario, setHorario, status }) {
  return (
    <UpdateModal
      horario={horario}
      setHorario={setHorario}
      title="Remarcar a consulta?"
      onUpdate={updateHorario({
        horario: { ...horario, status: AgendamentoStatus.PENDENTE }
      })}
      confirmColor="warning"
      buttonLabel="Remarcar"
      confirmLabel="Remarcar"
      readOnlyText="Você deseja remarcar a consulta? O médico precisará confirmar o novo horário."
      disabled={status !== AgendamentoStatus.AGENDADO}
      keyName="status"
    />
  );
}
