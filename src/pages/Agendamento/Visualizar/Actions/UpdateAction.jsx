import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import ActionModal from '../../../../components/Modal/ActionModal';
import PropTypes from 'prop-types';

UpdateAction.propTypes = {
  horario: PropTypes.object.isRequired,
  setHorario: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  keyName: PropTypes.string.isRequired,
  confirmLabel: PropTypes.string,
  readOnly: PropTypes.bool,
  readOnlyText: PropTypes.string,
  confirmColor: PropTypes.string,
  confirmActionColor: PropTypes.string
};

export default function UpdateAction({
  horario,
  setHorario,
  disabled,
  title,
  buttonLabel,
  keyName,
  confirmLabel,
  readOnly = true,
  readOnlyText,
  confirmColor = 'info',
  confirmActionColor = 'success',
  onUpdate
}) {
  // Abrir o modal oculto
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  return (
    <>
      <Button
        variant="contained"
        color={confirmColor}
        sx={{ marginRight: '0.5rem' }}
        onClick={() => setOpen(true)}
        disabled={disabled}
      >
        {buttonLabel}
      </Button>
      {/* Modal */}
      <ActionModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {
          setOpen(false);
          dispatch(onUpdate);
        }}
        title={title}
        data={horario}
        setData={setHorario}
        keyName={keyName}
        confirmLabel={confirmLabel}
        readOnlyText={readOnlyText}
        confirmColor={confirmActionColor}
        readOnly={readOnly}
      />
    </>
  );
}
