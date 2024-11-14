import UpdateModal, { UpdateActionCommonType } from '../../../../components/Modal/UpdateModal';
import { AgendamentoStatus } from '../../../../config/enums';
import { updateHorarioProntuario } from '../../../../store/modules/horarios/reducer';

ProntuarioAction.propTypes = UpdateActionCommonType;

export default function ProntuarioAction({ horario, setHorario, status }) {
  return (
    <UpdateModal
      horario={horario}
      setHorario={setHorario}
      title="Prontuário"
      onUpdate={updateHorarioProntuario({
        ...horario,
        mensagemSucesso: 'Prontuário atualizado com sucesso!'
      })}
      buttonLabel="Prontuário"
      confirmLabel="Editar"
      readOnly={false}
      disabled={status !== AgendamentoStatus.AGENDADO}
      keyName="prontuario"
    />
  );
}
