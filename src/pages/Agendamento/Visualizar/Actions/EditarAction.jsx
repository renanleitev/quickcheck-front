import { useState } from 'react';
import { Button } from '@mui/material';
import AgendamentoEditar from '../../Gerenciar/Editar/AgendamentoEditar';
import EditModal from '../../../../components/Modal/EditModal';
import PropTypes from 'prop-types';

EditarAction.propTypes = {
  horario: PropTypes.object.isRequired
};

export default function EditarAction({ horario }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="contained"
        color="success"
        sx={{ marginRight: '0.5rem' }}
        onClick={() => setOpen(true)}
      >
        Editar
      </Button>
      <EditModal open={open} onClose={() => setOpen(false)}>
        <AgendamentoEditar horario={horario} setOpen={setOpen} />
      </EditModal>
    </>
  );
}
