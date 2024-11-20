import UpdateModal, { UpdateActionCommonType } from '../../../../components/Modal/UpdateModal';
import { AgendamentoStatus } from '../../../../config/enums';
import { updateHorario } from '../../../../store/modules/horarios/reducer';

ProntuarioAction.propTypes = UpdateActionCommonType;

export default function ProntuarioAction({
  horario,
  setHorario,
  status,
  readOnly = false,
  hasConfirmButton
}) {
  return (
    <UpdateModal
      horario={horario}
      setHorario={setHorario}
      title="Prontuário"
      onUpdate={updateHorario({
        horario: { ...horario, mensagemSucesso: 'Prontuário atualizado com sucesso!' }
      })}
      buttonLabel="Prontuário"
      confirmLabel="Editar"
      readOnly={readOnly}
      disabled={status !== AgendamentoStatus.AGENDADO}
      keyName="prontuario"
      hasConfirmButton={hasConfirmButton}
      readOnlyText={horario["prontuario"]}
    />
  );
}
